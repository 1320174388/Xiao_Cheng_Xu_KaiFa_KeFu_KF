<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/16 0016
 * Time: 18:26
 */
class Isadmin extends LoginController {

    public function __construct(){
        parent::__construct();
        $this->load->model('admin/Admin');
        $this->load->library('validateclass');
        if(!is_system_admin()){
            return return_response( 1, '你没有权限进行此操作', NULL );
        }
    }

    // 获取管理员列表信息
    public function show()
    {
        // 获取权限信息
        $res = $this->Admin->get_admin_user();
        // 返回结果
        if($res){
            return return_response( 0, '请求成功', ["list"=>$res]);
        }else{
            return return_response( 2, '当前没有添加管理员',NULL);
        }
    }
    // 获取管理员职位信息
    public function roles()
    {
        // 获取权限信息
        $res = $this->Admin->get_admin_roles();
        // 返回结果
        if($res){
            return return_response( 0, '请求成功', ["list"=>$res]);
        }else{
            return return_response( 2, '当前还没有管理职位',NULL);
        }
    }

    /**
     * 添加管理员
     *
     * @success publid
     * @param int role_id 职位ID
     * @param string admin_name 管理员名称
     * @param int user_id 用户ID
     */
    public function create()
    {
        $role_id = $this->input->post('role_id');

        if(!$role_id){
            return return_response( 2, '请选择管理员职位');
        }

        $admin_name = $this->input->post('admin_name');

        if(!$admin_name){
            return return_response( 3, '请输入管理员名称');
        }

        $user_id = $this->input->post('user_id');

        $var = $this->validateclass->validator($user_id,'int');
        if(!$var){
            return return_response( 4, '用户不存在');
        }

        $res = $this->Admin->set_admin_user($user_id,$admin_name,$role_id);

        if($res === 4) return return_response( 4, '用户不存在');
        if($res === 5) return return_response( 5, '此用户已经是管理员');
        if($res === 6) return return_response( 6, '管理员名称已存在');
        if($res === 7) return return_response( 7, '管理员添加失败');
        if($res === 8) return return_response( 8, '管理员职位绑定失败');
        if($res === 0) return return_response( 0, '添加成功');
    }

    /**
     * 修改管理员
     *
     * @success publid
     * @param int role_id 职位ID
     * @param string admin_name 管理员名称
     * @param int admin_id 管理员ID
     */
    public function update()
    {
        $role_id = $this->input->post('role_id');

        if(!$role_id){
            return return_response( 2, '请选择管理员职位');
        }

        $admin_name = $this->input->post('admin_name');

        if(!$admin_name){
            return return_response( 3, '请输入管理员名称');
        }

        $admin_id = $this->input->post('admin_id');

        if(!$admin_id){
            return return_response( 4, '管理员ID丢失');
        }

        $res = $this->Admin->admin_user_update($admin_id,$admin_name,$role_id);

        if($res === 5) return return_response( 5, '管理员名称已存在');
        if($res === 6) return return_response( 6, '修改失败');
        if($res === 0) return return_response( 0, '修改成功');
    }

    public function delete()
    {
        // 判断是否输入管理员ID
        $admin_id = $this->input->post('admin_id');
        if(!$admin_id){
            return return_response( 2, '管理员ID丢失');
        }
        // 修改管理员数据
        $res = $this->Admin->admin_user_delete($admin_id);
        if($res){
            return return_response( 0, '删除成功');
        }else{
            return return_response( 3, '删除失败');
        }
    }
}