<?php

include_once("./db.php");
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
class User {
    public $conn;
    public function __construct() {
        $this->conn = (new DBConnection())->getConn();
    }

    public function addUser(string $username,string $password, string $email, string $name, string $birthday, string $phone) {
        $stmt = $this->conn->prepare("insert into user (username, password, email, name, birthday, phone) values (?,?,?,?,?,?)");
        $stmt->bind_param("ssssss", $username, $password, $email, $name, $birthday, $phone);
        try {
            $stmt->execute();
            $res = ['result' => "success"];
        }
        catch(Exception $e) {
            if ($e->getCode() === 1062) {
                $res = ["result" => "fail", "message" => "username is alreay exist"];
            }
            else {
                $res = ["result" => "fail", "message" => $this->conn->error];
            }
        }
        return $res;
    }
}

?>