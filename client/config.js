/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://juvr1ujg.qcloud.la';
var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
      host,
      // 测试登录接口,获取令牌
      cheshiUrl: `${host}/api/home/Login`,
    }

};

module.exports = config;