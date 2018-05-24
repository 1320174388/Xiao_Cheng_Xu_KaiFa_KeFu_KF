<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/28 0028
 * Time: 16:06
 */
class MY_Controller extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
    }


}
class LoginController extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
        if( !(is_admin_user() || is_system_admin()) ){
            redirect('https://'.$_SERVER['HTTP_HOST'].'/api/admin/Token/no_token');
        }
    }
}