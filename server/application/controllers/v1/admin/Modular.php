<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/18 0018
 * Time: 13:35
 */
class Modular extends LoginController {

    public function __construct(){
        parent::__construct();
        $this->load->library('configclass');
        $this->load->model('admin/Role');
    }
    /**
     * 判断用户是不是管理员
     *
     * @access public
     * @param string $token 用户身份令牌
     */
    public function getUserIsAdmin()
    {
        if(is_admin_user() || is_system_admin()){
            return return_response( 0, true);
        }else{
            return return_response( 1, false);
        }
    }
    /**
     * 获取后台管理员管理模块信息
     *
     * @access public
     * @param string $token 用户身份令牌
     */
    public function getAdminModular()
    {
        // 判断是不是最高管理员
        if(is_system_admin()){
            $Modular_Route = $this->configclass->Modular_Route;
            $Modular_Right = $this->Role->get_right();
            $ModularRoute = array_merge($Modular_Route,$Modular_Right);
            return return_response( 0, true, $ModularRoute);
        }
        // 获取管理员openid
        $openid = get_token_values('openid');
        if(!$openid){
            return return_response( 1, '用户令牌已过期');
        }
        // 获取管理员权限
        if(is_admin_user()){
            $ModularRoute = $this->Role->getAdminUserRight($openid);
            return return_response( 0, true, $ModularRoute);
        }else{
            return return_response( 2, '对不起,您不是管理员身份');
        }
    }
}