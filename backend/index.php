<?php

include_once("./user.php");
error_reporting(0);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

// user
if ($uri[1] === 'user') {
    $method = $_SERVER['REQUEST_METHOD']; 
    if ($method == "POST") { // add user 
        $user = new Account();
        $input = (array) json_decode(file_get_contents('php://input'), true);
        try {
            $res = $user->addAccount($input['username'], $input["password"], $input["email"], $input["name"], 
                                    $input["birthday"], $input["phone"], 1);
            $response['status_code_header'] = 'HTTP/1.1 200 OK';
            $response['body'] = json_encode($res);
            echo $response['body'];
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
            $response['status_code_header'] = 'HTTP/1.1 200 OK';
            $response['body'] = json_encode($res);
            echo $response['body'];
        }
    } 
}

if ($uri[1] === 'staff') {
    $method = $_SERVER['REQUEST_METHOD']; 
    $staff = new Account();
    if ($method == "POST") {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $staff->addAccount($input['username'], $input["password"], $input["email"], $input["name"], 
                                    $input["birthday"], $input["phone"], 2);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
    if ($method == "GET") {
        try {
            $res = $staff->getListStaff();
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}

if ($uri[1] === 'login') {
    $method = $_SERVER['REQUEST_METHOD']; 
    if ($method === "POST") { // check login
        try {
            $user = new Account();
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $user->login($input['username'], $input['password']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}



?>