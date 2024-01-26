<?php
defined('BASEPATH') || exit('No direct script access allowed');


class Register_model extends CI_Model
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

    var $table                      = 'user';
    var $table_addtocart            = 'addtocart';
    var $table_variants_options     = 'variants_options';
    var $table_checkout             = 'checkout';
    

    public function __construct()
    {
        parent::__construct();
    }
    // ***************************USE Function****************************************
    public function add($data)
    {
        $this->db->insert($this->table, $data);
        return $this->db->insert_id();
    }
    public function add_to_cart($data)
    {
        $this->db->insert($this->table_addtocart, $data);
        return $this->db->insert_id();
    }
   
    public function get_by_single_cartdata($iAddtocartId)
    { 
        $this->db->from($this->table_addtocart);
        $this->db->where('iAddtocartId',$iAddtocartId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    public function add_to_cart_verify_product($iProductId,$size,$iUserId='',$vCookie='')
    {
        $this->db->from($this->table_addtocart);
        $this->db->where('iProductId',$iProductId);
        if(!empty($size))
        {
            $this->db->where('vSize',$size);
        }
        if(!empty($iUserId) && $iUserId!='null')
        {
            $this->db->where('iUserId',$iUserId);
        }
        if(!empty($vCookie) && $vCookie!='null')
        {
            $this->db->where('vCookie',$vCookie);
        }
    
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    public function get_by_all_checkout_data($guestCheckoutId='',$iUserId='')
    { 
        $this->db->from($this->table_checkout);
        if(!empty($guestCheckoutId) && empty($iUserId))
        {
            $this->db->where('iGuestCheckoutId',$guestCheckoutId);
        }
        if(!empty($iUserId) && !empty($iUserId))
        {
            $this->db->where('iUserId',$iUserId);
        }
        $query=$this->db->get(); 
        $data = $query->result();
        return $data;
    }
    public function get_by_all_checkout_data_user_wise($iUserId='')
    { 
        if(!empty($iUserId) && $iUserId!=0)
        {   
            $this->db->select("t.*,t2.vEmail");
            $this->db->from($this->table_checkout.' t');
            $this->db->join($this->table." t2", 't.iUserId = t2.iUserId');
            $this->db->where('t.iUserId',$iUserId);
            $query = $this->db->get(); 
            $data  = $query->row();
            if(count($data)==0)
            {

                $this->db->select('tu.vFirstName,tu.vLastName,tu.vEmail');
                $this->db->from($this->table.' tu');
                $this->db->where('tu.iUserId',$iUserId);
                $this->db->where('tu.eType','User');
                $query=$this->db->get();
                $data = $query->row();
            }
            return $data;
        }else{   
            return array();
        }
    }
    public function get_by_all_addtocart_data($cookiedata='',$iUserId='')
    {
    
        $this->db->from($this->table_addtocart.' t');
        if(!empty($cookiedata) && $iUserId=='null')
        {
            $this->db->where('t.vCookie',$cookiedata);
        }
        if($iUserId!='null')
        {
            $this->db->where('t.iUserId',$iUserId);
        }
        $this->db->where('t.iDeleteId','0');
        $query=$this->db->get();
        $data = $query->result();

        foreach($data as $key => $value)
        {
            $this->db->select('iOptionId');
            $this->db->from($this->table_variants_options);
            if(!empty($value->vSize))
            {
                $this->db->where_in('vOptions',$value->vSize);
            }
            
            $this->db->where('eStatus','Active');
            $query=$this->db->get();
            $data[$key]->iOptionId = $query->row();
        }

        return $data;
    }

    public function get_by_email($vEmail)
    { 
        $this->db->from($this->table);
        $this->db->where('vEmail',$vEmail);
        $this->db->where('eType','User');
        $query=$this->db->get();
        $data = $query->num_rows();
        return $data;
    }
    public function get_by_email_guest($vEmail)
    { 
        $this->db->from($this->table);
        $this->db->where('vEmail',$vEmail);
        $this->db->where('eType','Guest');
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }

    public function get_by_email_verify($vEmail)
    { 
        $this->db->from($this->table);
        $this->db->where('vEmail',$vEmail);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }

    public function get_by_otp($vOTP)
    { 
        $this->db->from($this->table);
        $this->db->where('vOTP',$vOTP);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }

    public function get_by_email_password($vEmail,$vPassword)
    { 
    
        $this->db->from($this->table);
        $this->db->where('vEmail',$vEmail);
        $this->db->where('vPassword',$vPassword);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }

    public function update_addtocart($where, $data)
    {
        $this->db->update($this->table_addtocart, $data, $where);
        return $this->db->affected_rows();
    }
    public function update_checkout($where, $data)
    {
        $this->db->update($this->table_checkout, $data, $where);
        return $this->db->affected_rows();
    }

    public function delete_by_addtocart_product($iAddtocartId)
    {
        $this->db->where('iAddtocartId', $iAddtocartId);
        return $this->db->delete($this->table_addtocart);
    }

    public function update_password($where, $data_update)
    {
        $this->db->update($this->table, $data_update, $where);
        return $this->db->affected_rows();
    }

    public function update($where, $data_update)
    {
        $this->db->update($this->table, $data_update, $where);
        return $this->db->affected_rows();
    }

    
    // ***************************USE Function END****************************************
    
    // public function get_by_all_category()
    // {   
    //     $this->db->from($this->table);
    //     $this->db->order_by("iCategoryId", "desc");
    //     $query=$this->db->get();
    //     $data = $query->result();
    //     return $data;
    // }
    // public function get_by_all_subcategory()
    // {   
    //     $this->db->from($this->table_subcategory.' t');
    //     $this->db->join($this->table." t2", 't.iCategoryId = t2.iCategoryId');
    //     $this->db->order_by("iSubcategoryId", "desc");
    //     $query=$this->db->get();
    //     $data = $query->result();
    //     return $data;
    // }
    
    // public function delete_by_id($iCategoryId)
    // {
    //     $this->db->where('iCategoryId', $iCategoryId);
    //     $this->db->delete($this->table);
    // }
    // public function delete_by_sub_id($iSubcategoryId)
    // {
    //     $this->db->where('iSubcategoryId', $iSubcategoryId);
    //     $this->db->delete($this->table_subcategory);
    // }

    // public function update($where, $data)
    // {
    //     $this->db->update($this->table, $data, $where);
    //     return $this->db->affected_rows();
    // }

    // public function update_sub($where, $data)
    // {
    //     $this->db->update($this->table_subcategory, $data, $where);
    //     return $this->db->affected_rows();
    // }

    
  

}
