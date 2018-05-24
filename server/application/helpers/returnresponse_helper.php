<?php
defined('BASEPATH') OR exit('No direct script access allowed');

function return_response( $code, $msg, $data = []) {
    $CI =& get_instance();
    $CI->json( [ "errNum" => $code, "retMsg"  => $msg, "retData" => $data ] );
}