<?php

include_once("./user.php");
error_reporting(0);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

if ($uri[1] === 'user') {
    $method = $_SERVER['REQUEST_METHOD']; 
    header($response['status_code_header']);
    if ($method == "POST") {
        $user = new User();
        $input = (array) json_decode(file_get_contents('php://input'), true);
        try {
            $res = $user->addUser($input['username'], $input["password"], $input["email"], $input["name"], 
                                    $input["birthday"], $input["phone"]);
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



?>