<?php
defined('BASEPATH') || exit('No direct script access allowed');


class Category_model extends CI_Model
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

    var $table                      = 'category';
    var $table_subcategory          = 'subcategory';
    var $table_color                = 'color';
    var $table_fabric               = 'fabric';
    var $table_news_letter          = 'news_letter';
    var $table_category             = 'category';
    var $table_header_menu          = 'header_menu';
    var $table_materials            = 'materials';


    public function __construct()
    {
        parent::__construct();
    }
    public function add($data)
    {
        $this->db->insert($this->table, $data);
        return $this->db->insert_id();
    }
    public function add_fabric($data)
    {
        $this->db->insert($this->table_fabric, $data);
        return $this->db->insert_id();
    }
    public function sub_add($data)
    {
        $this->db->insert($this->table_subcategory, $data);
        return $this->db->insert_id();
    }
    public function add_color($data)
    {
        $this->db->insert($this->table_color, $data);
        return $this->db->insert_id();
    }
    
    public function get_by_all_color()
    {   
        $this->db->from($this->table_color);
        $this->db->order_by("iColorId", "desc");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    public function get_by_single_color($iColorId)
    {   
        $this->db->from($this->table_color);
        $this->db->where("iColorId", $iColorId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    public function get_by_single_fabric($iFabricId)
    {   
        $this->db->from($this->table_fabric);
        $this->db->where("iFabricId", $iFabricId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    public function get_by_all_fabric($iHeaderId="")
    {   
        $this->db->select('tb.*,tc.vTitle as Cat_title');
        $this->db->from($this->table_fabric.' tb');
        $this->db->join($this->table_header_menu.' tc','tb.iHeaderId=tc.iHeaderId');
        if(!empty($iHeaderId))
        {
            $this->db->where("tb.iHeaderId", $iHeaderId);
        }
       
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }

    public function get_by_all_active_fabric()
    {   
        $this->db->from($this->table_fabric);
        $this->db->where("eStatus", 'Active');
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    

    public function get_by_all_news_letter()
    {   
        $this->db->from($this->table_news_letter);
        $this->db->order_by("iNewsLetterId", "DESC");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    public function get_by_single_news_letter($iNewsLetterId)
    {   
        $this->db->from($this->table_news_letter);
        $this->db->where("iNewsLetterId", $iNewsLetterId);
        $this->db->order_by("iNewsLetterId", "DESC");
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    public function get_by_all_fabric_asc()
    {   
        $this->db->from($this->table_fabric);
        $this->db->order_by("iFabricId", "ASC");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    public function get_by_all_category()
    {   
        $this->db->from($this->table);
        $this->db->order_by("dtAddedDate", "DESC");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    public function get_by_all_active_category()
    {   
        $this->db->from($this->table);
        $this->db->where('eStatus','Active');
        $this->db->order_by("vTitle", "ASC");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    public function get_by_all_subcategory()
    {   
        $this->db->select('t.*,t2.vTitle');
        $this->db->from($this->table_subcategory.' t');
        $this->db->join($this->table_header_menu." t2", 't.iHeaderId = t2.iHeaderId');
        $this->db->order_by("iSubcategoryId", "desc");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    public function get_by_id($iCategoryId)
    { 
        $this->db->from($this->table);
        $this->db->where('iCategoryId',$iCategoryId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    public function get_by_sub_id($iSubcategoryId)
    {   
        $this->db->select('t.*,t2.vTitle,f.iFabricId,f.vTitle as Fabrictitle');
        $this->db->from($this->table_subcategory.' t');
        $this->db->join($this->table_header_menu." t2", 't.iHeaderId = t2.iHeaderId');
        $this->db->join($this->table_fabric." f", 't.iFabricId = f.iFabricId','left');
        $this->db->where('t.iSubcategoryId',$iSubcategoryId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    public function get_by_sub_data_by_categoryId($category_id)
    {
        $this->db->select('t.*,t2.vTitle');
        $this->db->from($this->table_subcategory.' t');
        $this->db->join($this->table." t2", 't.iCategoryId = t2.iCategoryId');
        $this->db->order_by("iSubcategoryId", "desc");
        $this->db->where('t.iCategoryId',$category_id);
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }

    public function delete_by_id($iCategoryId)
    {
        $this->db->where('iCategoryId', $iCategoryId);
        $this->db->delete($this->table);
    }
    public function delete_by_colorid($iColorId)
    {
        $this->db->where('iColorId', $iColorId);
        $this->db->delete($this->table_color);
    }
    public function delete_by_sub_id($iSubcategoryId)
    {
        $this->db->where('iSubcategoryId', $iSubcategoryId);
        $this->db->delete($this->table_subcategory);
    }

    public function delete_by_fabricid($iFabricId)
    {
        $this->db->where('iFabricId', $iFabricId);
        $this->db->delete($this->table_fabric);
    }
    public function delete_by_news($iNewsLetterId)
    {
        $this->db->where('iNewsLetterId', $iNewsLetterId);
        $this->db->delete($this->table_news_letter);
    }
    public function update($where, $data)
    {
        $this->db->update($this->table, $data, $where);
        return $this->db->affected_rows();
    }
    public function color_update($where, $data)
    {
        $this->db->update($this->table_color, $data, $where);
        return $this->db->affected_rows();
    }
    public function news_update($where, $data)
    {
        $this->db->update($this->table_news_letter, $data, $where);
        return $this->db->affected_rows();
    }
    public function fabric_update($where, $data)
    {
        $this->db->update($this->table_fabric, $data, $where);
        return $this->db->affected_rows();
    }
    public function update_sub($where, $data)
    {
        $this->db->update($this->table_subcategory, $data, $where);
        return $this->db->affected_rows();
    }
    public function get_by_all_subcategory_data($iHeaderId,$iFabricId)
    {   
        $this->db->from($this->table_subcategory);
        $this->db->where('iHeaderId',$iHeaderId);
        if(!empty($iFabricId))
        {
            $this->db->where('iFabricId',$iFabricId);
        }
        $this->db->order_by("vSubTitle", "ASC");
        $this->db->where("eStatus", "Active");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    public function get_by_all_subcat_headerwise($iHeaderId)
    {   
        $this->db->from($this->table_subcategory);
        $this->db->where('iHeaderId',$iHeaderId);
        $this->db->order_by("vSubTitle", "ASC");
        $this->db->where("eStatus", "Active");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }

    public function get_by_front_category()
    {   
        $this->db->select('iHeaderId,vTitle');
        $this->db->from($this->table_header_menu);
        $this->db->where("eStatus", "Active");
        $query=$this->db->get();
        $data = $query->result();

        foreach($data as $key => $value)
        {
            if(!empty($value->iHeaderId))
            {
                $this->db->select('iSubcategoryId,iHeaderId,iFabricId,vSubTitle,vImage');
                $this->db->from($this->table_subcategory);
                $this->db->where('iHeaderId',$value->iHeaderId);
                $this->db->where('eStatus',"Active");
                $this->db->order_by("vSubTitle", "ASC");
                $query=$this->db->get();
                $data[$key]->sub = $query->result();
            }
        }
        return $data;
    }
    // *****************************Header menu All Function********************************
    public function get_by_all_header_menu()
    {   
        $this->db->from($this->table_header_menu);
        $this->db->order_by("vTitle", "ASC");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    public function header_menu_add($data)
    {
        $this->db->insert($this->table_header_menu, $data);
        return $this->db->insert_id();
    }
    public function update_header_menu($where, $data)
    {
        $this->db->update($this->table_header_menu, $data, $where);
        return $this->db->affected_rows();
    }
    public function get_by_header_id($iHeaderId)
    { 
        $this->db->from($this->table_header_menu);
        $this->db->where('iHeaderId',$iHeaderId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    public function delete_by_header_id($iHeaderId)
    {
        $this->db->where('iHeaderId', $iHeaderId);
        $this->db->delete($this->table_header_menu);
    }
    // *****************************Materials All Function********************************
    public function get_by_all_materials()
    {   
        $this->db->from($this->table_materials);
        $this->db->order_by("dtAddedDate", "DESC");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }
    public function get_by_all_active_materials()
    {   
        $this->db->from($this->table_materials);
        $this->db->where('eStatus','Active');
        $this->db->order_by("vTitle", "ASC");
        $query=$this->db->get();
        $data = $query->result();
        return $data;
    }

    public function material_add_add($data)
    {
        $this->db->insert($this->table_materials, $data);
        return $this->db->insert_id();
    }
    public function update_materials($where, $data)
    {
        $this->db->update($this->table_materials, $data, $where);
        return $this->db->affected_rows();
    }
    public function get_by_material_id($iMaterialId)
    { 
        $this->db->from($this->table_materials);
        $this->db->where('iMaterialId',$iMaterialId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }
    public function delete_by_materials_is($iMaterialId)
    {
        $this->db->where('iMaterialId', $iMaterialId);
        $this->db->delete($this->table_materials);
    }

}
