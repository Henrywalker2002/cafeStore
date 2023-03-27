<?php

include_once("db.php");
class Voucher {
    private $conn;
    public function __construct() {
        $this->conn = (new DBConnection())->getConn();
    }

    public function addVoucher(int $percent, string $code = "") {
        try {
            if ($code == "") {
                $code = uniqid();
            }
            $stmt = $this->conn->prepare("insert into voucher (code, percent, phoneNumberUsed ) values (?, ?, ?)");
            $phone = "";
            $stmt->bind_param("sis", $code, $percent, $phone);
            $stmt->execute();
            $res = ["result" => "success"];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function getAllVoucher(){
        try {
            $temp = $this->conn->query("select * from voucher where phoneNumberUsed = ''");
            $array = $temp->fetch_all(MYSQLI_ASSOC);
            $res = ["result" => "success", "message" => $array];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function getVoucherByCode(string $code) {
        try {
            $query = ("select * from voucher where phoneNumberUsed = '' and code = '" .$code. "'");
            $temp = $this->conn->query($query);
            $array = $temp->fetch_assoc();
            $res = ["result" => "success", "message" => $array];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }
}

?>