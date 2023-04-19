<?php

include_once("db.php");
include_once('image.php');
class Cart {
    private $conn;
    public function __construct() {
        $this->conn = (new DBConnection())->getConn();
    }

    public function addToCart(string $username, int $drinkId) {
        try {
            $temp = $this->conn->prepare("select * from cart where username = ? and drinkId = ?");
            $temp->bind_param('si', $username, $drinkId);
            $temp->execute();
            $temp = $temp->get_result()->num_rows;
            if ($temp != 0) {
                $res = ["result" => 'fail', "message" => "this drink have already been in cart"];
            }
            else {
                $stmt = $this->conn->prepare("insert into cart (username, drinkId) values (? , ?)");
                $stmt->bind_param('si', $username, $drinkId);
                $stmt->execute();
                $res = ["result" => "success"];
            }
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function getCart(string $username) {
        try {
            
            $stmt = $this->conn->prepare("select drinkId from cart where username = ?");
            $stmt->bind_param('s', $username);
            $stmt->execute();
            $temp = $stmt->get_result();
            $temp = $temp->fetch_all(MYSQLI_NUM);
            if ($temp == null) {
                $temp = [];
            }
            $flatten = array_map(function ($array) {
                return $array[0];
            }, $temp);

            $array = array_map(function ($id) {
                $image = new Image();
                $stmt = $this->conn->prepare("select * from drink where id = ?");
                $stmt->bind_param('i', $id);
                $stmt->execute();
                $drink = $stmt->get_result()->fetch_assoc();
                $drink['image'] = $image->getlink($drink['image']);
                return $drink;
            }, $flatten);
            $res = ["result" => "success", "message" => $array];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function delDrinkCart(string $username, int $id) {
        try {
            $stmt = $this->conn->prepare("delete from `cart` where drinkId = ? and username = ?");
            $stmt->bind_param('is', $id, $username);
            $stmt->execute();
            $res = ["result" => "ok", "message" => "success"];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }
}
