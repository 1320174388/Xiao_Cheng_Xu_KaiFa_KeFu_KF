<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/20 0020
 * Time: 23:57
 */
function upload_create($dir,$file_name){
    // 引入CI类库
    $CI =& get_instance();
    $CI->load->helper('token');
    // 定义文件上传配置
    $number = mt_rand(100000,999999);
    $date = date(time());
    $string = token_string_name();
    $fileName = md5($number.$date.$string);
    $config = [
        'upload_path'   => './uploads/'.$dir.'/', // 文件保存路径
        'allowed_types' => 'gif|jpg|png|jpeg',         // 准许文件上穿格式
        'file_name'     => $fileName.'.png',      // 准许文件上穿格式
        'max_size'      => '2048',                // 准许上传文件大小
        'max_width'     => '1366',                // 上传图片宽度
        'max_height'    => '768'                  // 上传图片高度
    ];
    // 加载文件上传类
    $CI->load->library('upload',$config);
    $CI->upload->initialize($config);
    // 将图片保存在本地
    $CI->upload->do_upload($file_name);
    // 如果上传成功，获取上传文件的信息
    $CI->upload->data();
    if ($CI->upload->data()['orig_name'] != null){
        return '/uploads/'.$dir.'/'.$CI->upload->data()['orig_name'];
    }else{
        return false;
    }
}

function upload_delete($dir){
    return unlink('.'.$dir);
}