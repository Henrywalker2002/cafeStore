<?php

include_once("db.php");
class Drink {
    private $conn;
    public function __construct() {
        $this->conn = (new DBConnection())->getConn();
    }

    public function addDrink(string $name, int $price, string $des, string $base64) {
        try {
            $filename = "";
            if (!empty($base64)) {
                $image = new Image();
                $filename = $image->decodeBase64($base64);
                if ($filename == "") {
                    $res = ["result" => "fail", "message" => "type of image must be png or jpg"];
                    return $res;
                }
            }
            if ("imagelink" === "") {
                $filename = "default.png";
            }
            // store file name into mysql
            $stmt = $this->conn->prepare("insert into drink (name, price, description, image) values (?,?,?,?)");
            $stmt->bind_param("siss", $name, $price, $des, $filename);
            $temp = $stmt->execute();
            if ($temp) {
                $res = ["result"=> "success", "message" => $this->conn->insert_id];
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
    
    public function getDrinkById(int $id) {
        try {
            $stmt = $this->conn->prepare("select * from drink where id = ?");
            $stmt->bind_param("i", $id);
            $temp = $stmt->execute();
            $array = $stmt->get_result();
            if ($array->num_rows == 0) {
                return ["result" => "fail", "message" => "something went wrong"];
            }
            $array = $array->fetch_assoc();
            $image = new Image();
            
            $array['image'] = $image->getlink($array['image']);
            if ($temp) {
                $res = ["result"=> "success", "message" => $array];
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

    public function editDrinkById(int $id, string $name, int $price, string $des, string $base64) {
        try {
            $query = "select image from drink where id = " .$id;
            $imagelink = "";
            $oldLink = $this->conn->query($query)->fetch_assoc()['image'];
            if ($base64 === "") {
                $imagelink = $oldLink;
            }
            else {
                $image = new Image();
                $imagelink = $image->decodeBase64($base64);
                if ($imagelink == "") {
                    $res = ["result" => "fail", "message" => "type of image must be png or jpg"];
                    return $res;
                }
            }
            $stmt = $this->conn->prepare("update drink set name = ?, price = ?, description = ?, image = ? where id = ?");
            $stmt->bind_param("sissi", $name, $price, $des, $imagelink, $id);
            $stmt->execute();
            if ($imagelink !== $oldLink) {
                $file_pointer =  "./img/" .$oldLink;
                unlink($file_pointer);
            }
            $res = ["result" => "success"];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }

    public function deleteDrinkById(int $id) {
        try {
            $query = "select * from drink where id = " . $id;
            $temp =  $this->conn->query($query);
            if ($temp->num_rows === 0) {
                $res = ["result" => "fail", "message" => "no drink found"];
            }
            else {
                $array = $temp->fetch_assoc();
                $query = "delete from drink where id = " . $id;
                $temp =  $this->conn->query($query);
                $imagelink = $array["image"];
                if ($imagelink !== "default.png") {
                    $file_pointer =  "./img/" .$imagelink;
                    unlink($file_pointer);
                }
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

    public function getAllDrink() {
        try {
            $temp = $this->conn->query("select * from drink");
            $array = $temp->fetch_all(MYSQLI_ASSOC);
            for ($i = 0; $i < count($array); $i++) {
                $image = new Image();
                $array[$i]['image'] = $image->getlink($array[$i]['image']);
            }
            $res = ["result" => "success", "message" => $array];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        return $res;
    }
}