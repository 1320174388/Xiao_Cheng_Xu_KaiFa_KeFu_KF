<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Configclass {

    // AppID(小程序ID)
    public $wxAppID = 'wxccc5a444059f1b68';

    // AppSecret(小程序密钥) 
    public $wxAPPSecret = '10ea8042bb37f632aee713775f77587f';

    // 微信客服配置信息
    public $wssUrl = 'wss://juvr1ujg.ws.qcloud.la';
    public $wxServiceToken = '32ac0e0f409a679da4af7fc26b50c960';
    public $EncodingAESKey = 'KuavM93OoSVLnE6Ga74AWK1Q0QBB78cTTAYK3SxjCGo';

    // 微信支付商户号
    public $mch_id = 'XXXXXXXX';

    // 微信支付秘钥
    public $wxZhiFuMiYao = 'XXXXXXXXXX';

    // 用户登录接口地址
    public $wxLoginUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code';

    // 系统最高管理员管理模块路由
    public $Modular_Route = [
        [
            'id'          => 'X',
            'right_name'  => '职位管理',
            'right_route' => '/pages/Admin/...'
        ],
        [
            'id'          => 'A',
            'right_name'  => '管理列表',
            'right_route' => '/pages/Admin/...'
        ]
    ];

}