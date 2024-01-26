<?php
defined('BASEPATH') || exit('No direct script access allowed');


class Variants_model extends CI_Model
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

    var $table                      = 'variants';
    var $table_variants_options     = 'variants_options';
    var $table_product_variants     = 'product_variants';

    public function __construct()
    {
        parent::__construct();
    }
    public function add($data)
    {
        $this->db->insert($this->table, $data);
        return $this->db->insert_id();
    }
    public function option_add($data)
    {
        $this->db->insert($this->table_variants_options, $data);
        return $this->db->insert_id();
    }

    public function get_by_all_variants()
    {   
        $this->db->from($this->table);
        $this->db->order_by("iVariantId", "desc");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    public function get_by_variants_wise_option($iVariantsId)
    {   
        // $p = explode(",",$iVariantsId);
        $this->db->from($this->table_variants_options);
        $this->db->where("iVariantId", $iVariantsId);
        $this->db->order_by("iVariantId", "desc");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }

    public function get_by_all_variants_option()
    {      
        $this->db->select('t.*,t2.vLabel');
        $this->db->from($this->table_variants_options.' t');
        $this->db->join($this->table." t2", 't.iVariantId = t2.iVariantId');
        $this->db->order_by("iOptionId", "desc");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    public function get_by_id($iVariantId)
    { 
        $this->db->from($this->table);
        $this->db->where('iVariantId',$iVariantId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
     public function get_by_option_id($iOptionId)
    {   
        $this->db->select('t.*,t2.vLabel');
        $this->db->from($this->table_variants_options.' t');
        $this->db->join($this->table." t2", 't.iVariantId = t2.iVariantId');
        $this->db->where('t.iOptionId',$iOptionId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }

    public function delete_by_id($iVariantId)
    {
        $this->db->where('iVariantId', $iVariantId);
        $this->db->delete($this->table);
    }

    public function delete_by_variants_id($iProduct_variantsId)
    {
        $this->db->where('iProduct_variantsId', $iProduct_variantsId);
        $this->db->delete($this->table_product_variants);
        
    }
    public function delete_by_option_id($iOptionId)
    {
        $this->db->where('iOptionId', $iOptionId);
        $this->db->delete($this->table_variants_options);
    }

    public function update($where, $data)
    {
        $this->db->update($this->table, $data, $where);
        return $this->db->affected_rows();
    }

    public function update_option($where, $data)
    {
        $this->db->update($this->table_variants_options, $data, $where);
        return $this->db->affected_rows();
    }

    public function get_by_all_subcategory_data($iCategoryId)
    {   
       
        $this->db->from($this->table_subcategory);
        $this->db->where('iCategoryId',$iCategoryId);
        $this->db->order_by("iSubcategoryId", "desc");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }

}
