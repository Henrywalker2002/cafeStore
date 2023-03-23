<?php
    class DBConnection {
        public $conn = null;

        public function __construct() {
            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "cafestore";
            $this->conn = new mysqli($servername, $username, $password, $dbname);
            if ($this->conn->connect_error) {
                die("Connection failed: " . $this->conn->connect_error);
            }
        }

        public function getConn() {
            return $this->conn;
        }
    }

?>