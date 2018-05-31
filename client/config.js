/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://juvr1ujg.qcloud.la';
var wss  = 'wss://juvr1ujg.ws.qcloud.la';
var imgUrl ='https://lg-0kbpp9os-1256415751.cos.ap-shanghai.myqcloud.com/';
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
    }

};

module.exports = config;