<?php
defined('BASEPATH') || exit('No direct script access allowed');

class Login_model extends CI_Model
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

    var $table                  = 'admin';
    var $table_tearms_page      = 'tearms_page';

    
    public function __construct()
    {
        parent::__construct();
    }

    public function add($data)
    {
        $this->db->insert($this->table, $data);
        return $this->db->insert_id();
    }

    public function add_terms_condition($data)
    {
        $this->db->insert($this->table_tearms_page, $data);
        return $this->db->insert_id();
    }
    public function all_terms_condition_data_get()
    {
        $this->db->from($this->table_tearms_page);
        $query=$this->db->get();
        return $query->row();  
    }

    public function get_by_terms_id($iTermsId)
    {
        $this->db->from($this->table_tearms_page);
        $this->db->where('iTermsPage',$iTermsId);
        $query=$this->db->get();
        return $query->row();  
    }
    public function update($where, $data)
    {
        $this->db->update($this->table_tearms_page, $data, $where);
        return $this->db->affected_rows();
    }

    public function login($email, $password)
    {
        $this->db->from($this->table);
        $this->db->where('vEmail', $email);
        $this->db->where('vPassword', $password );
        $this->db->where('eStatus', 'Active');
        $query=$this->db->get();
        return $query->row();
    }

    public function delete_by_id($iTermsPage)
    {
        $this->db->where('iTermsPage', $iTermsPage);
        $this->db->delete($this->table_tearms_page);
    }


}
