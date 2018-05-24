<?php

class Position extends LoginController {

    public function __construct(){
        parent::__construct();
        $this->load->model('admin/Role');
        $this->load->library('validateclass');
    }

    // 获取权限信息
    public function right()
    {
        // 获取权限信息
        $res = $this->Role->get_right();
        if($res){
            return return_response( 0, '请求成功',["list" => $res]);
        }else{
            return return_response( 2, '权限还未注册');
        }
    }

    /**
     * 添加角色权限
     *
     * @success publid
     * @param string roleName 角色名称
     * @param array right 权限数组
     */
    public function create()
    {
        $roleName = $this->input->post('roleName');

        $var = $this->validateclass->validator($roleName,'empty');
        if($var) return return_response( 2, '请输入职位名称');

        $value = $this->input->post('right');

        $var = $this->validateclass->validator($value,'empty');
        if($var) return return_response( 3, '没有选择权限');

        $right = explode(',',$value);

        $res = $this->Role->set_role_exist($roleName,$right);

        if($res === 2) return return_response( 4, '职位已存在');
        if($res === 0) return return_response( 0, '添加成功');
    }

    // 获取职位列表内容信息
    public function show()
    {
        // 获取职位信息数据
        $res = $this->Role->get_role_list();
        // 返回结果
        if($res){
            return return_response( 0, '请求成功',["list" => $res]);
        }else{
            return return_response( 2, '当前没有添加职位');
        }
    }

    /**
     * 删除职位
     *
     * @success publid
     * @param int id 要删除的职位ID
     */
    public function delete()
    {
        $id = $this->input->post('id');

        $res = $this->Role->get_role_delete($id);

        if($res === 0) return return_response( 0, '删除成功');
        if($res === 2) return return_response( 2, '当前职位已被管理员使用,不可删除');
        if($res === 3) return return_response( 3, '删除失败');
    }

    /**
     * 修改角色权限
     *
     * @success publid
     * @param int id 要求改的职位ID
     * @param string roleName 角色名称
     * @param array right 权限数组
     */
    public function update()
    {

        $id = $this->input->post('id');

        $roleName = $this->input->post('roleName');

        $var = $this->validateclass->validator($roleName,'empty');
        if($var) return return_response( 2, '请输入职位名称');

        $value = $this->input->post('right');

        $var = $this->validateclass->validator($value,'empty');
        if($var) return return_response( 3, '没有选择权限');

        $right = explode(',',$value);

        $res = $this->Role->get_role_update($id,$roleName,$right);

        if($res === 0) return return_response( 0, '修改成功');
        if($res === 2) return return_response( 4, '要修改角色不存在');
        if($res === 3) return return_response( 5, '职位已存在');
        if($res === 4) return return_response( 6, '修改失败');
    }
}