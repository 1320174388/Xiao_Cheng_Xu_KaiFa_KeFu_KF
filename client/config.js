/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
// var host = 'https://950804099.xiaochengxukehu1.xyz';
var host = 'https://langxue2nanfengmeilin.dlaotianhuang.com';
var imgUrl ='https://lg-gvr0nl54-1256844085.cos.ap-shanghai.myqcloud.com/';
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