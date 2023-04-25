<?php

include_once("db.php");
class Infor {
    private $conn;
    public function __construct() {
        $this->conn = (new DBConnection())->getConn();
    }

    public function getInfor(){
        try {
            $res = $this->conn->query("select * from information");
            $res = $res->fetch_assoc();
            $res = ["result" => "success", "message" => $res];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function editInfor(string $phone, string $email, string $timeOpen, string $timeClose, string $slogan, string $address) {
        try {
            $stmt = $this->conn->prepare("update information set phone = ?, email = ?, timeOpen = ?, timeCLose = ?, banner = ?, address = ? where id = 1");
            $stmt->bind_param('ssssss', $phone, $email, $timeOpen, $timeClose, $slogan, $address);
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
}

?>