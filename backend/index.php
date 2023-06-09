<?php

include_once("./src/user.php");
include_once("./src/order.php");
include_once("./src/image.php");
include_once("./src/drink.php");
include_once("./src/voucher.php");
include_once("./src/cart.php");
include_once("./src/infor.php");

error_reporting(0);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
$method = $_SERVER['REQUEST_METHOD']; 

// user
if ($uri[2] === 'user') {
    if ($method == "POST") { // add user 
        $user = new Account();
        $input = (array) json_decode(file_get_contents('php://input'), true);
        try {
            $res = $user->addAccount($input['username'], $input["password"], $input["email"], $input["name"], 
                                    $input["birthday"], $input["phone"], 1, $input['address']);
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

elseif ($uri[2] === "account") {
    $acc = new Account();
    if ($method === 'PUT') {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $acc->update_account($input['username'], $input['name'], $input['email'], $input['birthday']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
    elseif ($method == 'DELETE') {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $username = $input['username'];
            $res = $acc->ban_account($username);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
    elseif ($method === 'GET') {
        try {
            $res  = $acc->getDetail($_GET['username']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}

elseif ($uri[2] === 'staff') {
    $staff = new Account();
    if ($method == "POST") {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $staff->addAccount($input['username'], $input["password"], $input["email"], $input["name"], 
                                    $input["birthday"], $input["phone"], 2, $input['address']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
    elseif ($method == "GET") {
        try {
            $res = $staff->getListStaff();
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}

elseif ($uri[2] === 'updateAvt') {
    $staff = new Account();
    if ($method === 'PUT') {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $staff->upload_avt($input['username'], $input['image']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}

elseif ($uri[2] === "changePassword") {
    $acc = new Account();
    if ($method === 'POST') {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $acc->changepass($input['username'], $input['oldPassword'], $input['newPassword']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}

elseif ($uri[2] === 'login') {
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


// handle drink 
elseif ($uri[2] === "drink") {
    $drink = new Drink();
    if ($method === 'POST') {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            if (!array_key_exists("image",$input)) {
                $input["image"] = "";
            }
            $res = $drink->addDrink($input["name"], $input["price"], $input["description"], $input["image"]);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
    elseif ($method === "GET") {
        try {
            if ($_GET["id"]) {
                $id = (int) $_GET["id"];
                $res = $drink->getDrinkById($id);
            }
            else {
                $res = $drink->getAllDrink();
            }
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
    elseif ($method === "PUT") {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            if (!array_key_exists("image",$input)) {
                $input["image"] = "";
            }
            $res = $drink->editDrinkById($input['id'], $input["name"], $input["price"], $input["description"], $input["image"]);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
    elseif ($method === "DELETE") {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $drink->deleteDrinkById($input['id']);
        }   
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}

// handle order
elseif ($uri[2] === 'order') {

    $order = new Order();
    if ($method === "POST") { // request order from client
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            if (!array_key_exists("voucher",$input)) {
                $input["voucher"] = "";
            }
            if (!array_key_exists("isUsePoint",$input)) {
                $input["voucher"] = false;
            }
            $res = $order->addOrder($input['username'], $input['drink'],  $input["address"], $input['voucher'], $input['isUsePoint']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
    elseif ($method === 'PUT') {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $order->changeAddress($input['id'], $input['address']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
    elseif ($method === "DELETE")  {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $order->cancelOrder($input['id']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
    elseif ($method === "GET") {
        try {
            if ($_GET['id']) {
                $res = $order->getOrderById($_GET['id']);
            }
            elseif ($_GET['username']) {
                $res = $order->getOrderByUsername($_GET['username']);
            }
            elseif ($_GET['staffUsername']) {
                $res = $order->getOrderByStaffUsername($_GET['staffUsername']);
            }
            else {
                $res = $order->getAllOrder();
            }
            
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}

elseif ($uri[2] === "acceptOrder") {
    $order = new Order();
    if ($method === "PUT") {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $order->acceptOrder($input['id'], $input['staffUsername']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}
elseif ($uri[2] === "completeOrder") {
    $order = new Order();
    if ($method === "PUT") {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $order->completeOrder($input['id']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}
elseif ($uri[2] === "cart") {
    $cart = new Cart();
    if ($method === "POST") {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $cart->addToCart($input['username'], $input['drinkId']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
    elseif ($method === 'GET') {
        try {
            $username = $_GET['username'];
            $res = $cart->getCart($username);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
    elseif ($method === "DELETE") {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $cart->delDrinkCart($input['username'], $input['drinkId']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}


// voucher handle 
elseif ($uri[2] === 'voucher') {
    $voucher = new Voucher();
    if ($method == "POST") {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res =  $voucher->addVoucher($input['percent'], $input['code']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
    elseif ($method === "GET") {
        try {
            if ($_GET["code"]) {
                $res = $voucher->getVoucherByCode($_GET["code"]);
            }
            else {
                $res = $voucher->getAllVoucher();
            }
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}
elseif ($uri[2] == 'infor'){
    $infor = new Infor();
    if ($method == 'GET') {
        try {
            $res = $infor->getInfor();
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
    elseif ($method == 'PUT') {
        try {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $infor->editInfor($input['phone'], $input['email'], $input['timeOpen'], $input['timeClose'], $input['banner'], $input['address']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}

elseif ($uri[2] == 'feedback') {
    $order = new Order();
    if ($method == 'PUT') {
        $input = (array) json_decode(file_get_contents('php://input'), true);
        try {
            $res = $order->addFeedBack($input['feedback'], $input['star'], $input['id']);
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}

elseif ($uri[2] == "income") {
    $order = new Order();
    if ($method == "GET") {
        try {
            $res = $order->getIncome();
        }
        catch (Exception $e) {
            $res = ["result" => "fail", "message" => $e->getMessage()];
        }
        echo json_encode($res);
    }
}

?>