<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/22 0022
 * Time: 18:41
 */
class Information_push extends CI_Controller
{
    private $Config_Token = '32ac0e0f409a679da4af7fc26b50c960';
    private $ToUserName = 'LampServer';
    private $Config_AppID = 'wxccc5a444059f1b68';
    private $Config_openId = '';
    private $Config_EncodingAESKey = 'KuavM93OoSVLnE6Ga74AWK1Q0QBB78cTTAYK3SxjCGo';
    private $Config_access_token = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxccc5a444059f1b68&secret=10ea8042bb37f632aee713775f77587f';
    private $Config_PushUrl = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=';

    public function __construct()
    {
        parent::__construct();
        $this->load->driver('cache');
        $this->load->model('home/user');
        $this->load->model('admin/role');
        $this->Config_openId =  $this->role->isSystemAdmin()->open_id;
    }

    private function valid()
    {
        $echoStr = $_GET["echostr"];

        if($this->checkSignature()){
            echo $echoStr;
            exit;
        }
    }

    private function openId($openId)
    {
        $this->file_put_text_data($openId);
        exit;
    }

    /**
     * 消息推送接口
     */
    public function Customer_Service_Interface()
    {

        $postStr = file_get_contents("php://input");

        if (!empty($postStr)){

            $postObj = $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);

            $openId = $postObj->FromUserName;

            $openId_info =  $this->user->get_user_openid($openId);

            if($openId_info){
                $ToUserName = $openId_info->user_name;
            }else{
                $ToUserName = '未授权用户';
            }

            if($this->cache->file->get('wx_userInfo')[$openId]){
                $user_number = $this->cache->file->get('wx:userInfo')[$openId];
                $this->cache->file->save('wx_userInfo',[
                    $openId => $user_number,
                    '@'.$user_number => $openId,
                ],172800);
            }else{
                $user_number = $this->add_user_number();
                $this->cache->file->save('wx_userInfo',[
                    $openId => $user_number,
                    '@'.$user_number => $openId,
                ],172800);
            }

            if( ($postObj->MsgType=="text") && (!empty(trim($postObj->Content))) )
            {
                $res = $this->Information_pushs($user_number,$this->Config_openId,$ToUserName,$postObj->MsgType,$postObj->Content);
                $this->file_put_text_data($res);
            }

            if( ($postObj->MsgType=="image") && (!empty($postObj->MediaId)) )
            {
                $this->Information_pushs($user_number,$this->Config_openId,$ToUserName,"text","【图片】");
                $this->Information_pushs($user_number,$this->Config_openId,$ToUserName,$postObj->MsgType,$postObj->MediaId);
            }

            if( ($postObj->MsgType=="file") && (!empty($postObj->FileKey)) )
            {
                $this->Information_pushs($user_number,$this->Config_openId,$ToUserName,"text","【文件】");
                $this->Information_pushs($user_number,$this->Config_openId,$ToUserName,"file","【File:{$postObj->Title},Size:{$postObj->Description}】");
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
     * 用户编号
     */
    private function add_user_number()
    {
        $mt_rand = mt_rand(100,999);
        if($this->cache->file->get($mt_rand)){
            return $this->add_user_number();
        }
        return $mt_rand;
    }

    /**
     * 信息推送接口
     */
    private function Information_pushs($user_number,$openId,$ToUserName,$MsgType,$Content)
    {
        $push_url = $this->Config_PushUrl;

        if($MsgType=="text")
        {
            $post_data = [
                "touser"  => "{$openId}",
                "msgtype" => "{$MsgType}",
                "text"    => [
                    "content" => urlencode("@{$user_number},【{$ToUserName}】发送信息: {$Content}")
                ]
            ];

            $post_data = urldecode(json_encode($post_data));
        }

        if($MsgType=="file")
        {
            $post_data = [
                "touser"  => "{$openId}",
                "msgtype" => "text",
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
        curl_close();

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