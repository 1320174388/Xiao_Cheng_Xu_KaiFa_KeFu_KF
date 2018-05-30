<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/25 0025
 * Time: 22:18
 */
class Service_Service extends CI_Model
{

    protected $tableName = 'data_session_services';

    public function set_Service_Service($session_keys,$postObj)
    {
        $Service_Service = [
            'session_index'  => $this->token(),
            'session_keys'   => $session_keys,
            'session_type'   => $postObj->MsgType,
            'session_time'   => $postObj->CreateTime,
            'session_diff'   => $postObj->session_diff,
            'session_sorts'  => $this->get_Service_Count($session_keys) + 1
        ];
        if( $postObj->MsgType=="text" )
        {
            $Service_Service['session_value'] = $postObj->Content;
        }
        if( $postObj->MsgType=="image" )
        {
            $Service_Service['session_value'] = $postObj->PicUrl;
            $Service_Service['session_infos'] = $postObj->MediaId;
        }
        if( $postObj->MsgType=="file" )
        {
            $Service_Service['session_value'] = "【File:{$postObj->Title},Size:{$postObj->Description}】";
        }
        $this->db->insert($this->tableName,$Service_Service);
    }

    public function get_Service_Count($session_keys)
    {
        $res = $this->db->query("SELECT count(*) FROM {$this->tableName} WHERE session_keys = '{$session_keys}'");
        $count = 'count(*)';
        return $res->result()[0]->$count;
    }

    public function get_Service_Service($openid)
    {
        $res = $this->db->get_where($this->tableName,['open_id'=>$openid]);
        return $res->result()[0];
    }

    public function get_History_Service($session_keys)
    {
        $time = time() - 172800;

        $this->db->where('session_time <', $time);

        $this->db->delete($this->tableName);

        $quesr_sql = "select * from {$this->tableName} where session_keys = '{$session_keys}' order by session_sorts asc";

        return $this->db->query($quesr_sql)->result();
    }

    public function get_History_newService($session_keys,$session_nums)
    {
        $quesr_sql = "select * from {$this->tableName} where session_keys = '{$session_keys}' and session_sorts > {$session_nums}";
        return $this->db->query($quesr_sql)->result();
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