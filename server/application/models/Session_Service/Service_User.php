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

    public function set_Service_User($openid,$Content)
    {
        $user = $this->db->get_where($this->tableName,['session_id'=>$openid]);
        if(!$user->result()){
            $res = $this->db->insert($this->tableName,[
                'session_id'     => $openid,
                'session_keys'   => $this->token(),
                'session_status' => 0,
                'session_sort'   => 1,
                'session_times'  => date('Y-m-d H:i',time()),
                'session_newcont'=> $Content
            ]);
            if($res){
                $user = $this->db->get_where($this->tableName,['session_id'=>$openid]);
                return $user->result()[0];
            }
        }else{
            $this->db->where('session_id', $openid);
            $res = $this->db->update($this->tableName, [
                'session_sort'   => 1,
                'session_times'  => date('Y-m-d H:i',time()),
                'session_newcont'=> $Content
            ]);
            if($res){
                $user = $this->db->get_where($this->tableName,['session_id'=>$openid]);
                return $user->result()[0];
            }
        }

    }

    public function get_Service_User($openid)
    {
        $res = $this->db->get_where($this->tableName,['open_id'=>$openid]);
        return $res->result()[0];
    }

    public function get_Service_User_openid($session_keys)
    {
        $res = $this->db->get_where($this->tableName,['session_keys'=>$session_keys]);
        return $res->result()[0]->session_id;
    }

    public function get_Service_UserList()
    {
        $quesr_sql = "select session_keys,session_status,session_sort,user_name,user_avatar,session_newcont,session_times from {$this->tableName} left join data_home_users on session_id = open_id order by session_sort asc";
        $res = $this->db->query($quesr_sql);
        return $res->result();
    }

    public function get_Service_UserUpdate($session_keys)
    {
        $this->db->where('session_keys', $session_keys);
        $res = $this->db->update($this->tableName, [
            'session_sort'   => 2,
            'session_status' => 1,
        ]);
        return $res;
    }

    public function get_Service_UserDelete($session_keys)
    {
        $this->db->where('session_keys', $session_keys);
        return $this->db->delete($this->tableName);
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