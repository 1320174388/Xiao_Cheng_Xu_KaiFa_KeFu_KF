/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
// var host = 'https://950804099.xiaochengxukehu1.xyz';
var host = 'https://xiaochengxukehu1.dlaotianhuang.com';
var wss = 'wss://zi8bp0gy.ws.qcloud.la';
var imgUrl ='https://lg-gvr0nl54-1256844085.cos.ap-shanghai.myqcloud.com/';
var config = {
    imgUrl,
    // 下面的地址配合云端 Demo 工作
    service: {
      host,
      wss,
      // 登录接口,获取令牌
      cheshiUrl: `${host}/api/home/Login`,
      // 获取是不是管理员
      IsAdmin: `${host}/api/admin/Modular/getUserIsAdmin`,
      // 客服发送信息接口
      Customer_Service_Request: `${host}/api/Customer_Service/Information_push/Customer_Service_Request`,
      // 客服请求历史信息接口
      Customer_Service_Response: `${host}/api/Customer_Service/Information_push/Customer_Service_Response`,
      // 客服请求最新信息接口
      Customer_Service_newResponse: `${host}/api/Customer_Service/Information_push/Customer_Service_newResponse`,
      // 客服请求用户列表信息
      Customer_Service_UserResponse: `${host}/api/Customer_Service/Information_push/Customer_Service_UserResponse`,
      // 修改用户接入状态
      Customer_Service_UserUpdate: `${host}/api/Customer_Service/Information_push/Customer_Service_UserUpdate`,
      // 删除用户信息
      Customer_Service_UserDelete: `${host}/api/Customer_Service/Information_push/Customer_Service_UserDelete`,
      // 获取最新消息数量
      Service_Session_Number: `${host}/api/Customer_Service/Information_push/Service_Session_Number`,
    }

};

module.exports = config;