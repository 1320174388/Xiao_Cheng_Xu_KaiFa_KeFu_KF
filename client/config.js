/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://langxue2nanfengmeilin.dlaotianhuang.com';
var imgUrl ='https://langxue2nanfengmeilin.dlaotianhuang.com/uploads/images/';
var config = {
    imgUrl,
    // 下面的地址配合云端 Demo 工作
    service: {
      host,
      
      // 登录接口,获取令牌
      cheshiUrl: `${host}/v1/login_module/login_init/`,
      
    }

};

module.exports = config;