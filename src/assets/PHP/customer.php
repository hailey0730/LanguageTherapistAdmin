<?php

header("Content-Type:text/html;charset=utf-8");
header('Access-Control-Allow-Origin: http://localhost:4200', false);
// header('Access-Control-Allow-Origin: http://192.168.0.106:4200', false);

$url = 'http://testingtesttest.000webhostapp.com/customer.json';

$json = file_get_contents($url);

$results = json_decode($json, true);

$customerID = $_GET['CustomerID'];
$customerID = $customerID - 201;

if($customerID >-1){
    echo json_encode($results[$customerID]);
}else{
    echo json_encode($results);    
}


?>