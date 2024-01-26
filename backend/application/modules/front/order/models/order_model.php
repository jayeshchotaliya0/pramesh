<?php
defined('BASEPATH') || exit('No direct script access allowed');


class order_model extends CI_Model
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

    var $table                   = 'orders';
    var $table_subcategory       = 'subcategory';
    var $table_contact_us        = 'contact_us';
    var $table_news_letter       = 'news_letter';
    var $table_checkout          = 'checkout';
    var $table_addtocart         = 'addtocart';
    var $table_product_variants  = 'product_variants';
    var $table_variants_options  = 'variants_options';
    var $table_order_note        = 'order_note';
    

    public function __construct()
    {
        parent::__construct();
    }
    public function add($data)
    {
        $this->db->insert($this->table, $data);
        return $this->db->insert_id();
    }
    public function add_order_note($data)
    {
        $this->db->insert($this->table_order_note, $data);
        return $this->db->insert_id();
    }

    
    public function add_contact_us($data)
    {
        $this->db->insert($this->table_contact_us, $data);
        return $this->db->insert_id();
    }
    public function add_newsLetter($data)
    {
        $this->db->insert($this->table_news_letter, $data);
        return $this->db->insert_id();
    }
    public function get_by_email($vEmail)
    { 
        $this->db->from($this->table_news_letter);
        $this->db->where('vEmail',$vEmail);
        $query=$this->db->get();
        $data = $query->num_rows();
        return $data;
    }

    public function get_by_id_checkout($iCheckoutDetailId)
    { 
        $this->db->select('iUserId,iProductId,iCheckoutDetailId,iOptionId');
        $this->db->from($this->table_checkout);
        $this->db->where('iCheckoutDetailId',$iCheckoutDetailId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }

    public function get_by_id_payment($iUserId,$iProductId,$iOptionId)
    {
        $iProductIds = explode(',',$iProductId);
        $this->db->from($this->table_addtocart);
        $this->db->where_in('iProductId',$iProductIds);
        if(!empty($iUserId))
        {
            $this->db->where('iUserId',$iUserId);
        }
        $query=$this->db->get();
        $data = $query->result();

        foreach($data as $key => $value)
        {
            $this->db->from($this->table_product_variants);
            $this->db->where('iProductId',$value->iProductId);
            $this->db->where_in('iOptionId',$value->iOptionId);
            $this->db->group_by('iProductId');
            $query=$this->db->get();
            $data[$key]->product = $query->row();
        }

        // foreach($data as $key => $value)
        // {
        //     $this->db->select('iOptionId');
        //     $this->db->from($this->table_variants_options);
        //     $this->db->where_in('vOptions',$value->vSize);
        //     $this->db->where('eStatus','Active');
        //     $query=$this->db->get();
        //     $data[$key]->ioptionId = $query->row();
        // }

        return $data;

    }

    public function get_by_optionid($size)
    {
        $this->db->select('iOptionId');
        $this->db->from($this->table_variants_options);
        $this->db->where_in('vOptions',$size);
        $this->db->where('eStatus','Active');
        $query=$this->db->get();
        $data = $query->row();
        return $data->iOptionId;
    }

    public function get_by_all_order()
    {   
        $this->db->from($this->table);
        $this->db->order_by("iOrderId", "desc");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }

    public function get_by_product_size_qty($iOptionId,$iProductId)
    {   
        $this->db->from($this->table_product_variants);
        $this->db->where("iProductId", $iProductId);
        $this->db->where("iOptionId", $iOptionId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    
    public function get_by_id($iOrderId)
    { 
        $this->db->from($this->table);
        $this->db->where('iOrderId',$iOrderId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;  
    }

    public function get_by_id_checkout_user_data($iUserId)
    { 
        $this->db->from($this->table_checkout);
        $this->db->where('iUserId',$iUserId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;  
    }

    public function get_by_id_note($iOrderId)
    { 
        $this->db->from($this->table_order_note);
        $this->db->where('iOrderId',$iOrderId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;  
    }

    public function delete_by_id($iOrderId)
    {
        $this->db->where('iOrderId', $iOrderId);
        $this->db->delete($this->table);
    }

    public function update($where, $data)
    {
        $this->db->update($this->table, $data, $where);
        return $this->db->affected_rows();
    }
    public function update_addtocart_data($where, $data)
    {
        $this->db->update($this->table_addtocart, $data, $where);
        return $this->db->affected_rows();
    }

    public function update_note($where, $data)
    {
        $this->db->update($this->table_order_note, $data, $where);
        return $this->db->affected_rows();
    }

    public function update_product_variant_quntity($where, $data)
    {
        $this->db->update($this->table_product_variants, $data, $where);
        return $this->db->affected_rows();
    }

}
