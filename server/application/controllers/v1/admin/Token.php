<?php

class Token extends CI_Controller {

    public function no_token(){
        return $this->json([
            "errNum" => 1,
            "retMsg" => '权限不足',
            "retData"=> []
        ]);
    }
}