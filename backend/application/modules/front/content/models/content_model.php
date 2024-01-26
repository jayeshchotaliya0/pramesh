<?php
defined('BASEPATH') || exit('No direct script access allowed');

class Content_model extends CI_Model
{
    public $table_name;
    public $table_alias;
    public $primary_key;
    public $primary_alias;
    public $grid_fields;
    public $join_tables;
    public $extra_cond;
    public $groupby_cond;
    public $orderby_cond;
    public $unique_type;
    public $unique_fields;
    public $switchto_fields;
    public $default_filters;
    public $search_config;
    public $relation_modules;
    public $deletion_modules;
    public $print_rec;
    public $multi_lingual;
    public $physical_data_remove;
    public $listing_data;
    public $rec_per_page;
    public $message;

    var $table                      = 'banner';
    var $table_image_content        = 'image_content';
    var $table_user                 = 'user';
 

    public function __construct()
    {
        parent::__construct();
    }
    public function add_banner($data)
    {
        $this->db->insert($this->table, $data);
        return $this->db->insert_id();
    }
    public function get_by_all_banner()
    {   
        $this->db->from($this->table);
        $this->db->order_by('iBannerId','desc');
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    public function get_by_id($iBannerId)
    { 
        $this->db->from($this->table);
        $this->db->where('iBannerId',$iBannerId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    public function delete_by_id($iBannerId)
    {
        $this->db->where('iBannerId', $iBannerId);
        $this->db->delete($this->table);
    }

    public function update($where, $data)
    {
        $this->db->update($this->table, $data, $where);
        return $this->db->affected_rows();
    }
    

// ******************************Table2*************************************************

    public function image_content_add($data)
    {
        $this->db->insert($this->table_image_content, $data);
        return $this->db->insert_id();
    }
    
     public function get_by_all_image_content()
    {   
        $this->db->from($this->table_image_content);
        $this->db->order_by('iContentId','desc');
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }

    public function delete_by_id_image_content($iContentId)
    {
        $this->db->where('iContentId', $iContentId);
        $this->db->delete($this->table_image_content);
    }
     public function get_image_content_by_id($iContentId)
    { 
        $this->db->from($this->table_image_content);
        $this->db->where('iContentId',$iContentId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    public function update_image_content($where, $data)
    {
        $this->db->update($this->table_image_content, $data, $where);
        return $this->db->affected_rows();
    }
// ******************************Table2 END************************************************* 

// ******************************Table3*************************************************
    public function add_user($data)
    {
        $this->db->insert($this->table_user, $data);
        return $this->db->insert_id();
    }
    public function get_by_all_user()
    {
        $this->db->from($this->table_user);
         $this->db->order_by("iUserId", "desc");
        $query = $this->db->get();
        $data = $query->result();
        return $data;

    }
     public function get_by_last_data()
    {
        $this->db->from($this->table_user);
         $this->db->order_by("iUserId", "desc");
         $this->db->limit(5);
        $query = $this->db->get();
        $data = $query->result();
        return $data;

    }

    
    public function get_by_user_id($iUserId)
    {
        $this->db->from($this->table_user);
        $this->db->where('iUserId', $iUserId);
        $query = $this->db->get();
        $data = $query->row();
        return $data;

    }
    public function update_userdata($where, $data)
    {
        $this->db->update($this->table_user, $data, $where);
        return $this->db->affected_rows();
    }
    public function delete_by_user_id($iUserId)
    {
        $this->db->where('iUserId', $iUserId);
        return $this->db->delete($this->table_user);
    }
    
    
// ******************************FRONT API *************************************************
    public function get_by_all_banner_front()
    {   
        $this->db->from($this->table);
        $this->db->where('eStatus','Active');
        $this->db->where('vBannerType','1');
        $this->db->where('eShowtype','Desktop');
        $this->db->order_by('iOrder','ASC');
        $this->db->limit(4);
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    public function get_by_all_banner_front_mobile()
    {   
        $this->db->from($this->table);
        $this->db->where('eStatus','Active');
        $this->db->where('vBannerType','1');
        $this->db->where('eShowtype','Mobile');
        $this->db->order_by('iOrder','ASC');
        $this->db->limit(4);
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }

    public function get_by_all_mini_banner_front()
    {   
        $this->db->from($this->table);
        $this->db->where('eStatus','Active');
        $this->db->where('vBannerType','2');
        $this->db->order_by('iOrder','ASC');
        $this->db->limit(4);
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    public function get_by_all_first_image()
    {   
        $this->db->from($this->table_image_content);
        $this->db->where('eStatus','Active');
        $this->db->where('vImageType','1');
        $this->db->limit(1);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    public function get_by_all_second_image()
    {   
        $this->db->from($this->table_image_content);
        $this->db->where('eStatus','Active');
        $this->db->where('vImageType','2');
        $this->db->limit(1);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    public function get_by_all_third_image()
    {   
        $this->db->from($this->table_image_content);
        $this->db->where('eStatus','Active');
        $this->db->where('vImageType','3');
        $this->db->limit(1);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    public function get_by_product_listing_image()
    {
        $this->db->from($this->table_image_content);
        $this->db->where('eStatus','Active');
        $this->db->where('vImageType','4');
        $this->db->or_where('vImageType','5');
        $this->db->limit(2);
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    

    

//   ************************************************************REMOVE CODE************************
      
}
