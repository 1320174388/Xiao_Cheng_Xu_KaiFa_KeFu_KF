<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/16 0016
 * Time: 18:29
 */
class Admin extends CI_Model {

    private $CI;

    public function __construct()
    {
        $this->CI =& get_instance();
        parent::__construct();
    }

    public function get_admin_user()
    {
        // 获取所有管理原信息
        $this->CI->db->select('data_admin_users.id,data_admin_users.admin_name,data_admin_roles.role_name');
        $this->CI->db->from('data_admin_users');
        $this->CI->db->join('index_user_roles', 'data_admin_users.id = index_user_roles.admin_id');
        $this->CI->db->join('data_admin_roles', 'index_user_roles.role_id = data_admin_roles.id');
        $admin_data = $this->CI->db->get();
        if($admin_data->result()) return $admin_data->result(); else return false;
    }

    public function get_admin_roles()
    {
        // 获取所有管理职位信息
        $role_data = $this->CI->db->get('data_admin_roles');
        if($role_data->result()) return $role_data->result(); else return false;
    }

    public function set_admin_user($user_id,$admin_name,$role_id)
    {
        // 判断user_id对应用户是否存在
        $home_user = $this->CI->db->get_where('data_home_users',['id'=>$user_id]);
        if($home_user->result()){
            // 判断user_id是否已经是管理员
            $admin_user = $this->CI->db->get_where('data_admin_users',['user_id'=>$user_id]);
            if(!$admin_user->result()){
                // 判断管理员名称是否已经存在
                $admin_user = $this->CI->db->get_where('data_admin_users',['admin_name'=>$admin_name]);
                if(!$admin_user->result()){
                    // 添加数据库
                    $date = date('Y-m-d H:i:s',time());
                    $res = $this->CI->db->insert('data_admin_users',[
                        'user_id'     => $user_id,
                        'admin_name'  => $admin_name,
                        'create_time' => $date
                    ]);
                    if($res){
                        $admin_user1 = $this->CI->db->get_where('data_admin_users',['admin_name'=>$admin_name]);
                        $ret = $this->CI->db->insert('index_user_roles',[
                            'admin_id'     => $admin_user1->result()[0]->id,
                            'role_id'  => $role_id,
                        ]);
                        if($ret){ return 0;
                        }else return 8;
                    }else return 7;
                }else return 6;
            }else return 5;
        }else return 4;
    }

    public function admin_user_update($admin_id,$admin_name,$role_id)
    {
        // 判断管理员名称是否已经存在
        $admin_user = $this->CI->db->get_where('data_admin_users',['admin_name'=>$admin_name]);
        if($admin_user->result()){
            if($admin_user->result()[0]->id !== $admin_id){
                return 5;
            }
        }
        $this->db->trans_start();
        // 修改管理员名称
        $this->CI->db->where('id', $admin_id);
        $res = $this->CI->db->update('data_admin_users',[
            "admin_name" => $admin_name
        ]);
        $row = $this->db->delete('index_user_roles',['admin_id'=>$admin_id]);
        if($row){
            $ret = $this->db->insert('index_user_roles',[
                'admin_id' => $admin_id,
                'role_id'  => $role_id
            ]);
        }
        $this->db->trans_complete();
        if($res && $ret) return 0; else return 6;
    }

    public function admin_user_delete($admin_id)
    {
        // 删除数据库管理员数据
        $res = $this->CI->db->delete('data_admin_users',['id' => $admin_id]);
        if($res) return $res;
    }

    public function is_admin_users($id)
    {
        $admin_user = $this->CI->db->get_where('data_admin_users',['user_id'=>$id]);
        if($admin_user->result()) return true; else return false;
    }
}