<?php

class Login extends CI_Controller {

    public function index() {
        // 获取临时生成Code
        $code = $this->input->post();
        // 请求腾讯云服务器 获取用户信息
        $this->load->library('loginclass',$code);
        // 生成 token 令牌
        $token = $this->loginclass->get();
        // 将 ken:令牌 返回到客户端
        $this->json($token);
    }

}