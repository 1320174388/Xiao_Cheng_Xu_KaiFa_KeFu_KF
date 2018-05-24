<?php
defined('BASEPATH') OR exit('No direct script access allowed');

function token() {
    $number = mt_rand(10000,99999);
    $date = date(time());
    $newStr = token_string_name();
    return md5($number.$newStr.$date);
}

function token_string_name(){
    $str = "abcdefghizklmnopqrstuvwxyz123456789ABCDEFGHIZKLMNOPQRSTUVWXYZ";
    $newStr = '';
    $num = strlen($str) - 1;
    for($n=0;$n<$num;$n++){
        $newStr .= $str[rand(0,$num)];
    }
    return $newStr;
}