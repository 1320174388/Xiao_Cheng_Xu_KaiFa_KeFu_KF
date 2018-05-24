<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/21 0021
 * Time: 03:17
 */
class Validateclass {

    public function validator($data,$type){

        switch ($type) {
            case 'empty': if(   empty($data)  ) return true;  break;
            case 'int'  : if(is_numeric($data)) return true;  break;
        }

    }

}