<?php

include_once("db.php");
class Account {
    private $conn;
    public function __construct() {
        $this->conn = (new DBConnection())->getConn();
    }

    public function addAccount(string $username,string $password, string $email, string $name, string $birthday, string $phone, int $type, string $address) {
        $stmt = $this->conn->prepare("insert into account (username, password, email, name, birthday, phone, type, address, startDate) values (?,?,?,?,?,?,?,?,?)");
        $today = date('Y-m-d');
        $stmt->bind_param("ssssssiss", $username, $password, $email, $name, $birthday, $phone, $type, $address, $today);
        try {
            $stmt->execute();
            $res = ['result' => "success"];
        }
        catch(Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function login(string $username, string $password) {
        try {
            $image = new Image();
            $stmt = $this->conn->prepare("select * from account where username = ? and password = ?");
            $stmt->bind_param("ss", $username, $password);
            $stmt->execute();
            $temp = $stmt->get_result();
            if ($temp->num_rows == 0) {
                $res = ["result" => "fail", "message" => "username, password do not match"];
            }
            else {
                $row = $temp->fetch_assoc();
                if ($row['type'] == 1) {
                    $row['type'] = "user";
                }
                elseif ($row['type'] == 2) {
                    $row['type'] = "staff";
                }
                else {
                    $row['type'] = "admin";
                }
                unset($row['password']);
                $row['avt'] = $image->getlink($row['avt']);
                $res = ["result" => "success", "message" => $row];
            }
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }
    
    public function getListStaff() {
        try {
            $image = new Image();
            $query = "select * from account where type = 2";
            $res = $this->conn->query($query);
            $data = [];
            while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
                unset($row['password']);
                $row['avt'] = $image->getlink($row['avt']);
                array_push($data, $row);
            }
            ////
            $res = ["result" => "success", "message" => $data];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function ban_account(string $username) {
        try {
            $temp = $this->conn->query("select username from account where username = '$username'");
            if ($temp->num_rows == 0) {
                $res = ["result" => "fail", "message" => "no account found"];
            }
            else {
                $query = "DELETE FROM `account` WHERE username='$username';";
                $res = $this->conn->query($query);
                if ($res) {
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

    public function upload_avt(string $username, string $base64) {
        try {
            $image = new Image();
            $filename = "";
            if (!empty($base64)) {
                $filename = $image->decodeBase64($base64);
                if ($filename == "") {
                    $res = ["result" => "fail", "message" => "type of image must be png or jpg"];
                    return $res;
                }
            }
            else {
                $filename = "default.png";
            }
            $query = "UPDATE `account` SET avt='$filename' WHERE username='$username'";
            $res = $this->conn->query($query);
            $res = ["result" => "success", "message" => $image->getlink($filename)];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function changepass (string $username, string $old, string $new) {
        try {
            $stmt = $this->conn->prepare("update account set password = ? where username = ? and password = ?");
            $stmt->bind_param('sss', $new, $username, $old);
            $stmt->execute();
            $num = $stmt->affected_rows ;
            if ($num == 0) {
                $res = ["result" => "fail", "message" => "username and password do not match"];
            }
            else {
                $res = ["result" => "success"];
            }
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }
    public function update_account(string $username, string $name, string $email, string $birthday) {
        try {
            $stmt = $this->conn->prepare("update account set name = ?, email = ?, birthday = ? where username = ?");
            $stmt->bind_param('ssss', $name, $email, $birthday, $username);
            $stmt->execute();
            $num = $stmt->affected_rows ;
            if ($num == 0) {
                $res = ["result" => "fail", "message" => "do not change"];
            }
            else {
                $res = ["result" => "success"];
            }
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function getDetail(string $username) {
        try {
            $image = new Image();
            $temp = $this->conn->query("select * from account where username = '$username'");
            if ($temp->num_rows == 0) {
                $res = ["result" => "fail", "message" => "no account found"];
            }
            else {
                $arr = $temp->fetch_assoc();
                if ($arr['type'] == 1) {
                    $arr['type'] = "user";
                }   
                elseif ($arr['type'] == 2) {
                    $arr['type'] = "staff";
                }
                else {
                    $arr['type'] = "admin";
                }
                unset($arr['password']);
                $arr['avt'] = $image->getlink($arr['avt']);
                $res = ["result" => "success", "message" => $arr];
            }
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }
}

?>