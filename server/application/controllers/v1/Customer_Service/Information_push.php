<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/22 0022
 * Time: 18:41
 */
class Information_push extends CI_Controller
{
    private $Config_Token;
    private $ToUserName;
    private $Config_openId;
    private $Config_access_token;
    private $Config_PushUrl;

    public function __construct()
    {
        parent::__construct();

        $this->load->driver('cache');
        $this->load->model('home/user');
        $this->load->model('admin/role');
        $this->load->model('Session_Service/Service_User');
        $this->load->model('Session_Service/Service_Service');
        $this->load->library('configclass');

        $this->Config_Token = $this->configclass->wxServiceToken;
        $this->Config_openId =  $this->role->isSystemAdmin()->open_id;
        $this->Config_access_token = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$this->configclass->wxAppID}&secret={$this->configclass->wxAPPSecret}";
        $this->Config_PushUrl = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=';
        $this->ToUserName = 'LampServer:Uesr';
    }

    private function valid()
    {
        $echoStr = $_GET["echostr"];

        if($this->checkSignature()){
            echo $echoStr;
            exit;
        }
    }

    /**
     * 消息推送接口
     */
    public function Customer_Service_Interface()
    {

        $postStr = file_get_contents("php://input");

        if (!empty($postStr)){

            $postObj = $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
            $this->file_put_obj_data($postObj);

            $openId = $postObj->FromUserName;

            $Service_User = $this->Service_User->set_Service_User($openId);

            if($Service_User){
                $session_keys = $Service_User->session_keys;
            }

            $postObj->session_diff = 1;

            $this->Service_Service->set_Service_Service($session_keys,$postObj);

            if( ($postObj->MsgType=="text") && (!empty(trim($postObj->Content))) )
            {
                $this->Information_pushs($this->Config_openId,$postObj->MsgType,$postObj->Content);
            }

            if( ($postObj->MsgType=="image") && (!empty($postObj->MediaId)) )
            {
                $this->Information_pushs($this->Config_openId,$postObj->MsgType,$postObj->MediaId);
            }

            if( ($postObj->MsgType=="file") && (!empty($postObj->FileKey)) )
            {
                $this->Information_pushs($this->Config_openId,"text","【File:{$postObj->Title},Size:{$postObj->Description}】");
            }

            $XmlTpl = "<xml><ToUserName><![CDATA[".$postObj->FromUserName."]]></ToUserName><FromUserName><![CDATA[".$postObj->ToUserName."]]></FromUserName><CreateTime>".time()."</CreateTime><MsgType><![CDATA[transfer_customer_service]]></MsgType></xml>";

            echo $XmlTpl;
            exit;
        }else {
            echo "success";
            exit;
        }
    }

    /**
     * 发送聊天数据
     */
    public function Customer_Service_Request()
    {
        if(!is_system_admin()){
            return return_response( 1, '你没有权限进行此操作', false );
        }

        $session_keys = $this->input->post('session_keys');
        $content      = $this->input->post('content');

        if($content == ''){
            return return_response( 2, '发送失败', false );
        }

        if(!$session_keys){
            return return_response( 3, '没有发送用户标识', false );
        }

        $postObj = new postObj();

        $postObj->MsgType      = 'text';
        $postObj->CreateTime   = time();
        $postObj->session_diff = 0;
        $postObj->Content      = $content;

        $this->Service_Service->set_Service_Service($session_keys,$postObj);

        $this->Information_pushs($this->Config_openId,$postObj->MsgType,$postObj->Content);

        return return_response( 0, '发送成功', true );
    }

    /**
     * 获取历史聊天数据
     */
    public function Customer_Service_Response()
    {
        if(!is_system_admin()){
            return return_response( 1, '你没有权限进行此操作', false );
        }

        $session_keys = $this->input->post('session_keys');

        if(!$session_keys){
            return return_response( 2, '没有发送用户标识', false );
        }

        $res = $this->Service_Service->get_History_Service($session_keys);

        if($res){
            return return_response( 0, '请求成功', $res );
        }else{
            return return_response( 0, '请求成功', false );
        }
    }

    /**
     * 信息推送接口
     */
    private function Information_pushs($openId,$MsgType,$Content)
    {
        $push_url = $this->Config_PushUrl;

        if($MsgType=="text")
        {
            $post_data = [
                "touser"  => "{$openId}",
                "msgtype" => "{$MsgType}",
                "text"    => [
                    "content" => urlencode("{$Content}")
                ]
            ];

            $post_data = urldecode(json_encode($post_data));
        }

        if($MsgType=="image")
        {
            $post_data = [
                "touser"  => "{$openId}",
                "msgtype" => "{$MsgType}",
                "image"    => [
                    "media_id" => "{$Content}"
                ]
            ];

            $post_data = json_encode($post_data);
        }

        $access_token = $this->access_token();

        return $this->Information_curl_post($push_url.$access_token,$post_data);
    }

    private function access_token()
    {
        if($this->cache->file->get('access_token')){
            $access_token = $this->cache->file->get('access_token');
        }else{
            $res = $this->Information_curl_post($this->Config_access_token,[]);
            $resArr = json_decode($res,true);
            $this->cache->file->save('access_token',$resArr['access_token'],6666);
            $access_token = $resArr['access_token'];
        }
        return $access_token;
    }

    private function Information_curl_post($push_url,$post_data = [])
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $push_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);

        $output = curl_exec($ch);
        curl_close($ch);

        return $output;
    }

    private function checkSignature()
    {
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];

        $this->file_put_obj_data($_GET);

        $token = $this->Config_Token;
        $tmpArr = array($token, $timestamp, $nonce);
        sort($tmpArr, SORT_STRING);

        $tmpStr = implode( $tmpArr );
        $tmpStr = sha1( $tmpStr );

        if( $tmpStr == $signature ){
            return true;
        }else{
            return false;
        }
    }

    private function file_put_obj_data($data,$strnbsp = '&nbsp;&nbsp;&nbsp;&nbsp;')
    {
        $str = '';
        foreach($data as $k => $v){
            $str .= $strnbsp.$k.'===='.$v.'<br>';
            if(is_array($v)){
                $str .= $this->file_put_obj_data($v,$strnbsp.'&nbsp;&nbsp;&nbsp;&nbsp;');
            }
        }
        file_put_contents('./text/123.html',"<br>".$str);
        return $str;
    }

    private function file_put_text_data($data)
    {
        file_put_contents('./text/123.html',"<br>".$data);
    }
}

class postObj
{

}

