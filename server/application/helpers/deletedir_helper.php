<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/28 0028
 * Time: 19:39
 */
function deldir($dir)
{
    //删除目录下的文件：
    $dh=opendir($dir);
    while ($file=readdir($dh))
    {
        if($file!="." && $file!=".." && $file!="default.jpg" && $file!='default_table.jpg' && $file!='desk.jpg')
        {
            $fullpath=$dir."/".$file;
            if(!is_dir($fullpath))
            {
                unlink($fullpath);
            }
            else
            {
                deldir($fullpath);
            }
        }
    }
    closedir($dh);
}