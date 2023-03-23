<?php

include_once("./db.php");
class Account {
    public $conn;
    public function __construct() {
        $this->conn = (new DBConnection())->getConn();
    }

    public function addAccount(string $username,string $password, string $email, string $name, string $birthday, string $phone, int $type) {
        $stmt = $this->conn->prepare("insert into account (username, password, email, name, birthday, phone, type) values (?,?,?,?,?,?,?)");
        $stmt->bind_param("ssssssi", $username, $password, $email, $name, $birthday, $phone, $type);
        try {
            $stmt->execute();
            $res = ['result' => "success"];
        }
        catch(Exception $e) {
            $res = ["result" => "fail", "message" => $this->conn->error];
        }
        return $res;
    }

    public function login(string $username, string $password) {
        try {
            $stmt = $this->conn->prepare("select * from account where username = ? and password = ?");
            $stmt->bind_param("ss", $username, $password);
            $stmt->execute();
            $row = $stmt->get_result()->fetch_array(MYSQLI_ASSOC);
            if ($row['type'] == 1) {
                $type = "user";
            }
            elseif ($row['type'] == 2) {
                $type = "staff";
            }
            else {
                $type = "admin";
            }
            $res = ["result" => "success", "message" => $type];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $this->conn->error];
        }
        return $res;
    }

    public function getListStaff() {
        try {
            $query = "select * from account where type = 2";
            $res = $this->conn->query($query);
            $temp = $res->fetch_all(MYSQLI_ASSOC);
            $res = ["result" => "success", "message" => $temp];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $this->conn->error];
        }
        return $res;
    }
}

?>