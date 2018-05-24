<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/14 0013
 * Time: 20:10
 */
class Role extends CI_Model {

    private $CI;

    public function __construct()
    {
        $this->CI =& get_instance();
        parent::__construct();
    }

    public function isSystemAdmin(){
        // 获取管理员信息信息
        $res = $this->CI->db->get_where('data_home_users',['id'=>1]);
        return $res->result()[0];
    }

    // 判断数据库是否有这个角色,如果纯在不处理，不存在添加
    public function set_role_exist($roleName,$right)
    {
        // 查看数据库中是否有这个角色
        $role = $this->CI->db->get_where('data_admin_roles',['role_name'=>$roleName]);
        if($role->result()) return 2;
        // 添加这个角色到数据库
        $this->CI->db->trans_start();
        $res = $this->CI->db->insert('data_admin_roles',['role_name'=> $roleName]);
        if($res){
            // 添加对应权限到数据库
            $role = $this->CI->db->get_where('data_admin_roles',['role_name'=>$roleName]);
            $role_id = $role->result()[0]->id;
            $data = [];
            for($a=0;$a<count($right);$a++){
                $data[] = ["role_id"=>$role_id,"right_id"=>$right[$a]];
            }
            $ret = $this->CI->db->insert_batch('index_role_rights',$data);
            $this->CI->db->trans_complete();
            if($ret){return 0;}
        }
    }

    // 获取角色信息
    public function get_role_list()
    {
        $role = $this->CI->db->get('data_admin_roles');
        return $role->result();
    }


    public function get_role_delete($id)
    {
        // 如果职位已经被管理员使用,不可删除
        $user_roles = $this->CI->db->get_where('index_user_roles',['role_id' => $id]);
        if($user_roles->result()){return 2;}
        // 删除对应id的角色,同时删除职位对应权限
        $role_rights = $this->CI->db->get_where('index_role_rights',['role_id' => $id]);
        if($role_rights->result()){
            $index_row = $this->CI->db->delete('index_role_rights',['role_id' => $id]);
        }
        $role_row = $this->CI->db->delete('data_admin_roles',['id' => $id]);
        if(($role_rights && $index_row) || $role_row){ return 0; }else{ return 3; }
    }

    public function get_right(){
        // 查看数据库中是否有权限
        $right = $this->CI->db->get('data_admin_rights');
        return $right->result();
    }

    public function get_role_update($id,$roleName,$right)
    {
        // 查看数据库中是否有这个角色
        $role = $this->CI->db->get_where('data_admin_roles',['id'=>$id]);
        if($role->result()){
            // 查看数据库中是否有这个角色
            $this->CI->db->trans_start();
            $role_data = $this->CI->db->get_where('data_admin_roles',['role_name'=>$roleName]);
            if( ($roleName == $role_data->result()[0]->role_name ) || !$role_data->result()){
                // 修改角色名称
                $this->CI->db->where('id', $id);
                $res = $this->CI->db->update('data_admin_roles',['role_name'=>$roleName]);
                $index_row = $this->CI->db->delete('index_role_rights',['role_id' => $id]);
                if(($res && $index_row)||$res){
                    $data = [];
                    for($a=0;$a<count($right);$a++){
                        $data[] = ["role_id"=>$id,"right_id"=>$right[$a]];
                    }
                    $ret = $this->CI->db->insert_batch('index_role_rights',$data);
                    $this->CI->db->trans_complete();
                    if($ret){
                        return 0;
                    }
                }else{
                    return 4;
                }
            }else{
                return 3;
            }
        }else{
            return 2;
        }
    }

    public function getAdminUserRight($openid){
        // 查看数据库中管理员对应的权限
        $this->CI->db->select('data_admin_rights.id,data_admin_rights.right_name,data_admin_rights.right_route');
        $this->CI->db->from('data_home_users');
        $this->CI->db->join('data_admin_users', 'data_home_users.id = data_admin_users.user_id');
        $this->CI->db->join('index_user_roles', 'data_admin_users.id = index_user_roles.admin_id');
        $this->CI->db->join('data_admin_roles', 'index_user_roles.role_id = data_admin_roles.id');
        $this->CI->db->join('index_role_rights', 'data_admin_roles.id = index_role_rights.role_id');
        $this->CI->db->join('data_admin_rights', 'index_role_rights.right_id = data_admin_rights.id');
        $this->CI->db->where('data_home_users.open_id', $openid);
        $right = $this->CI->db->get();
        return $right->result();
    }
}