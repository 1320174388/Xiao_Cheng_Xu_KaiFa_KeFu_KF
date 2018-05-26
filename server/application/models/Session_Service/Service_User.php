<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/25 0025
 * Time: 22:01
 */
class Service_User extends CI_Model
{

    protected $tableName = 'data_session_users';

    public function set_Service_User($openid)
    {
        $user = $this->db->get_where($this->tableName,['session_id'=>$openid]);
        if(!$user->result()){
            $res = $this->db->insert($this->tableName,[
                'session_id'     => $openid,
                'session_keys'   => $this->token(),
                'session_status' => 0,
                'session_sort'   => 2
            ]);
            if($res){
                $user = $this->db->get_where($this->tableName,['session_id'=>$openid]);
                return $user->result()[0];
            }
        }else{
            return $user->result()[0];
        }

    }

    public function get_Service_User($openid)
    {
        $res = $this->CI->db->get_where($this->tableName,['open_id'=>$openid]);
        return $res->result()[0];
    }

    protected function token() {
        $number = mt_rand(10000,99999);
        $date = date(time());
        $newStr = $this->token_string_name();
        return md5($number.$newStr.$date);
    }

    protected function token_string_name(){
        $str = "abcdefghizklmnopqrstuvwxyz123456789ABCDEFGHIZKLMNOPQRSTUVWXYZ";
        $newStr = '';
        $num = strlen($str) - 1;
        for($n=0;$n<$num;$n++){
            $newStr .= $str[rand(0,$num)];
        }
        return $newStr;
    }


}