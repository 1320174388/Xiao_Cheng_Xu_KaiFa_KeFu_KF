<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/13 0013
 * Time: 14:55
 */
class User extends CI_Model {

    private $CI;

    public function __construct()
    {
        $this->CI =& get_instance();
        parent::__construct();
    }

    public function set_user_exist($openid,$userName,$avatarUrl)
    {
        $user = $this->db->get_where('data_home_users',['open_id'=>$openid]);
        if(!$user->result()){
            $res = $this->db->insert('data_home_users',[
                'open_id'     => $openid,
                'create_time' => date('Y-m-d H:i:s',time()),
                'user_name'   => $userName,
                'user_avatar' => $avatarUrl
            ]);
            if($res){
                $user = $this->db->get_where('data_home_users',['open_id'=>$openid]);
                return $user->result()[0]->id;
            }
        }else{
            return $user->result()[0]->id;
        }

    }

    public function get_user_openid($openid){
        // 获取管理员信息信息
        $res = $this->CI->db->get_where('data_home_users',['open_id'=>$openid]);
        return $res->result()[0];
    }
}