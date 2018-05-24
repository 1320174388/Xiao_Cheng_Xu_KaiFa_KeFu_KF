<?php
defined('BASEPATH') OR exit('No direct script access allowed');

function get_token_values($request='') {
    $CI =& get_instance();
    // 获取Token:令牌
    $token = $CI ->input->post('token');
    // 通过令牌获取缓存数据
    $CI ->load->driver('cache');
    $values = $CI ->cache->file->get($token);
    if(empty($values)){
        return false;
    }
    // 返回缓存数据
    if(empty($request)){
        return $values;
    }else{
        return $values[$request];
    }

}