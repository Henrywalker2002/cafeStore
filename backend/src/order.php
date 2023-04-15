<?php

include_once("db.php");
include_once("voucher.php");

function helper($array) {
    switch ($array['statement']) {
        case 1:
            $array['statement'] = "created";
            break;
        case 2:
            $array['statement'] = "accepted";
            break;
        case 3:
            $array['statement'] = "completed";
            break;
        case 4:
            $array['statement'] = "cancel";
            break;
        default:
            break;
    }
    return $array;
}
class Order {
    private $conn;
    private $voucherclass;
    public function __construct() {
        $this->conn = (new DBConnection())->getConn();
        $this->voucherclass = new Voucher();
    }

    public function addOrder(string $username, array $id, string $address, string $voucher = "", bool $isUsePoint = false){
        try {
            $statement = 1;
            // default value for time start and transport fee
            $timeStart = new DateTime("now", new DateTimeZone("Asia/Ho_Chi_Minh"));
            $timeStart = $timeStart->format("Y-m-d");
            $transportFee = 10000;
            // handle drink list
            $fee = 0; // total drink fee
            $query = "select price from drink where id = ";
            foreach($id as $value) {
                $temp = $this->conn->query($query . (string) $value['id']);
                $price = $temp->fetch_array(MYSQLI_ASSOC);
                $fee += $price['price']*$value['number'];
            }
            // if user use point then subtract point
            $point = 0;
            if ($isUsePoint) {
                $temp = $this->conn->query("select point from account where username = '" .$username. "'");
                $temp = $temp->fetch_assoc();
                $point = (int) $temp['point'];
                $temp = $this->conn->query('update account set point = 0 where username = "' .$username. '"');
            }
            $totalFee = $transportFee + $fee - $point;
            // handle voucher
            $voucherInvalid = 0;
            if ($voucher != '') {
                $massage = $this->voucherclass->getVoucherByCode($voucher)['message'];
                if ($massage != null) {
                    $percent = $massage['percent'];
                    $totalFee = $totalFee - $totalFee*$percent/100;
                }
                else {
                    $voucherInvalid = "invalid voucher";
                }
            }
            // insert into order
            $stmt = $this->conn->prepare("insert into `order` (username, statement, fee, totalFee, timeStart, transportFee, voucher, address) values(?,?,?,?,?,?,?,?)");
            $stmt->bind_param("siiisiss", $username, $statement,$fee, $totalFee, $timeStart, $transportFee, $voucher, $address);
            $stmt->execute();
            $orderid = $this->conn->insert_id;
            // insert into drinkids 
            $stmt = $this->conn->prepare("insert into drinkids (orderId, drinkId, number) values (?,?, ?)");
            $stmt->bind_param( 'iii', $orderid, $drinkId, $number);
            foreach($id as $value) {
                $drinkId = $value['id'];
                $number = $value['number'];
                $stmt->execute();
            }
            if ($voucherInvalid != 0 ) {
                $res = ["result" => "success", "message" => ["orderId" => $orderid, "totalfee" => $totalFee, "voucher" => $voucherInvalid]];
            }
            else {
                $res = ["result" => "success", "message" => ["orderId" => $orderid, "totalfee" => $totalFee]];
            }
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function acceptOrder(int $id, string $staffUsername) {
        try {
            // check status of order
            $query = "select statement from `order` where id = " . (string) $id;
            $temp = $this->conn->query($query);
            $temp = $temp->fetch_assoc();
            if ($temp['statement'] != 1) {
                $res = ["result" => "fail", "message" => "statement is invalid"];
            } 
            else {
                // if everything do right then insert
                $stmt = $this->conn->prepare("update `order` set statement = 2, staffUsername = ? where id = ? ");
                $stmt->bind_param("si", $staffUsername, $id);
                $stmt->execute();
                $res = ["result" =>"success"];
            }
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function completeOrder(int $id) {
        try {
            $timeEnd = new DateTime("now", new DateTimeZone("Asia/Ho_Chi_Minh"));
            $timeEnd = $timeEnd->format("Y-m-d");
            // check status of order
            $query = "select username, fee, statement from `order` where id = " . (string) $id;
            $temp = $this->conn->query($query);
            $temp = $temp->fetch_assoc();
            if ($temp['statement'] != 2) {
                $res = ["result" => "fail", "message" => "statement is invalid"];
            } 
            else {
                $stmt = $this->conn->prepare("update `order` set statement = 3, timeComplete = ? where id = ? ");
                $stmt->bind_param("si", $timeEnd, $id);
                $stmt->execute();
                // add point to user
                $stmt = $this->conn->prepare("update account set point = point + ? where username = ?");
                $point = $temp['fee']/10;
                $username = $temp['username'];
                $stmt->bind_param("is", $point, $username);
                $stmt->execute();
                $res = ["result" =>"success"];
            }
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function changeAddress(int $id, string $address) {
        try {
            $temp = $this->conn->query("select statement from `order` where id = " . (string) $id);
            $temp = $temp->fetch_assoc();
            if ($temp['statement'] != 1) {
                return ["result" => "fail", "message" => "you can only change address when staff have not accecpted"];
            }

            $stmt = $this->conn->prepare("update `order` set address = ? where id = ?");
            $stmt->bind_param('si', $address, $id);
            $temp = $stmt->execute();
            if ($temp) {
                $res = ["result" => "success"];
            }
            else {
                $res = ["result" => "fail", "message" => "something went wrong"];
            }
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function cancelOrder(int $id) {
        try {
            $query = "select username, fee, statement from `order` where id = " . (string) $id;
            $temp = $this->conn->query($query);
            $temp = $temp->fetch_assoc();
            if ($temp['statement'] == 3) {
                $res = ["result" => "fail", "message" => "order have already completed"];
            } 
            else {
                $stmt = $this->conn->prepare("update `order` set statement = 4 where id = ?");
                $stmt->bind_param('i', $id);
                $temp = $stmt->execute();
                if ($temp) {
                    $res = ["result" => "success"];
                }
                else {
                    $res = ["result" => "fail", "message" => "something went wrong"];
                }
            }
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function getOrderById(int $id) {
        try {
            $query = "select * from `order` where id = " . $id;
            $temp =  $this->conn->query($query);
            $array = $temp->fetch_assoc();
            // convert statement from int to string
            $array = helper($array);
            $orderId = $array['id'];
            $stmt = $this->conn->prepare("select * from drinkIds where orderId = ?");
            $stmt->bind_param('i', $orderId);
            $stmt->execute();
            $temp = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $lst = [];
            foreach($temp as $e) {
                $name =  $this->conn->query("select name from drink where id = " .$e['drinkId']);
                $name = $name->fetch_assoc()['name'];
                array_push($lst, ['name' => $name,  'number' => $e['number']]);
            }
            $array += ['drink' => $lst];
            $res = ["result" => "success", "message" => $array];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function getOrderByUsername(string $username) {
        try {
            $stmt = $this->conn->prepare("select * from drinkIds where orderId = ?");
            $stmt->bind_param('i', $orderId);
            $query = "select * from `order` where username = '" . $username ."'";
            $temp =  $this->conn->query($query);
            $array = $temp->fetch_all(MYSQLI_ASSOC);

            // convert statement from int to string
            for ($i = 0; $i < count($array); $i++) {
                $array[$i] = helper($array[$i]);
                $orderId = $array[$i]['id'];
                $stmt->execute();
                $temp = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
                $lst = [];
                foreach($temp as $e) {
                    $name =  $this->conn->query("select name from drink where id = " .$e['drinkId']);
                    $name = $name->fetch_assoc()['name'];
                    array_push($lst, ['name' => $name,  'number' => $e['number']]);
                }
                $array[$i] += ['drink' => $lst];
            }

            $res = ["result" => "success", "message" => $array];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function getOrderByStaffUsername(string $username) {
        try {
            $query = "select * from `order` where staffUsername = '" . $username ."'";
            $temp =  $this->conn->query($query);
            $array = $temp->fetch_all(MYSQLI_ASSOC);
            $stmt = $this->conn->prepare("select * from drinkIds where orderId = ?");
            $stmt->bind_param('i', $orderId);
            // convert statement from int to string
            for ($i = 0; $i < count($array); $i++) {
                $array[$i] = helper($array[$i]);
                $orderId = $array[$i]['id'];
                $stmt->execute();
                $temp = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
                $lst = [];
                foreach($temp as $e) {
                    $name =  $this->conn->query("select name from drink where id = " .$e['drinkId']);
                    $name = $name->fetch_assoc()['name'];
                    array_push($lst, ['name' => $name,  'number' => $e['number']]);
                }
                $array[$i] += ['drink' => $lst];
            }
            $res = ["result" => "success", "message" => $array];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function getAllOrder() {
        try {
            $stmt = $this->conn->prepare("select * from drinkIds where orderId = ?");
            $stmt->bind_param('i', $orderId);
            $query = "select * from `order` ORDER BY statement" ;
            $temp =  $this->conn->query($query);
            $array = $temp->fetch_all(MYSQLI_ASSOC);
            // convert statement from int to string
            for ($i = 0; $i < count($array); $i++) {
                $array[$i] = helper($array[$i]);
                $orderId = $array[$i]['id'];
                $stmt->execute();
                $temp = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
                $lst = [];
                foreach($temp as $e) {
                    $name =  $this->conn->query("select name from drink where id = " .$e['drinkId']);
                    $name = $name->fetch_assoc()['name'];
                    array_push($lst, ['name' => $name,  'number' => $e['number']]);
                }
                $array[$i] += ['drink' => $lst];
            }
            $res = ["result" => "success", "message" => $array];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

}