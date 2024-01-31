<?php
defined('BASEPATH') || exit('No direct script access allowed');


class Product_model extends CI_Model
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

    var $table                   = 'product';
    var $table_subcategory       = 'subcategory';
    var $table_product_image     = 'product_image';
    var $table_product_variants  = 'product_variants';
    var $table_variants_options  = 'variants_options';
    var $table_category          = 'category';
    var $table_checkout          = 'checkout';
    var $table_wishlist          = 'wishlist';
     var $table_color            = 'color';
     var $table_order            = 'orders';

    public function __construct()
    {
        parent::__construct();
    }
    public function add($data)
    {
        $this->db->insert($this->table, $data);
        return $this->db->insert_id();
    }
    public function add_wishlist($data)
    {
        $this->db->insert($this->table_wishlist, $data);
        return $this->db->insert_id();
    }
    public function add_checkoutdata($data)
    {
        $this->db->insert($this->table_checkout, $data);
        return $this->db->insert_id();
    }

    public function add_product_variants($datao)
    {
        $this->db->insert($this->table_product_variants, $datao);
        return $this->db->insert_id();
    }

    
    public function image_add($datas)
    {
        $this->db->insert($this->table_product_image, $datas);
        return $this->db->insert_id();
    }

    public function get_by_wishlist_data($iUserId)
    {
        $this->db->from($this->table_wishlist);
        $this->db->like('iUserId', $iUserId);
        $query=$this->db->get();
        $data = $query->result(); 
        return $data;
    }

    public function search($keyword)
    {
        $this->db->select('t.iProductId,t.vProductName');
        $this->db->from($this->table.' t');
        // $this->db->join($this->table_subcategory.' ts','t.iSubcategoryId=ts.iSubcategoryId');
        // $this->db->join($this->table_color.' tc','t.iColorId = tc.iColorId');
        $this->db->like('vProductName', $keyword);
        // $this->db->or_like('ts.vSubTitle',$keyword); 
        // $this->db->or_like('tc.vColor',$keyword); 
        $this->db->group_by('t.vProductName');
        $this->db->where('t.eStatus','Active');
        $query=$this->db->get();
        $data = $query->result();

        foreach($data as $key => $value)
        {   
            $this->db->select('vColor');
            $this->db->from($this->table_color);
            $this->db->like('vColor', $keyword);
            $query=$this->db->get();
            $data[$key]->color = $query->row();
        }

        foreach($data as $key1 => $value1)
        {   
            $this->db->select('vSubTitle');
            $this->db->from($this->table_subcategory);
            $this->db->like('vSubTitle', $keyword);
            $query=$this->db->get();
            $data[$key1]->category = $query->row();
        }
        // foreach($data as $key => $value)
        // {   
        //     $this->db->select('t1.iProductId,t1.vProductName,ts.vSubTitle');
        //     $this->db->from($this->table.' t1');
        //     $this->db->join($this->table_subcategory.' ts','t1.iSubcategoryId=ts.iSubcategoryId');
        //     $this->db->like('t1.vProductName', $value->vProductName);
        //     $this->db->or_like('ts.vSubTitle',$value->vSubTitle);
        //     // $this->db->group_by('vProductName');
        //     $this->db->where('t1.eStatus','Active');
        //     $query=$this->db->get();
        //     $data[$key]->count = $query->num_rows();
        // }
        return $data;
    }

    public function get_by_all_product()
    {   
        $this->db->select("t.iProductId,t.vProductName,t.vHomePageDisplay,t.iColorId,t.eStatus,t2.vSku,t2.vPrice,t2.vSku");
        $this->db->from($this->table.' t');
        $this->db->join($this->table_product_variants.' t2','t.iProductId=t2.iProductId');
        $this->db->group_by("t.iProductId");
        $this->db->order_by("t.iProductId", "desc");
        $query=$this->db->get();
        $data = $query->result();
        foreach($data as $key => $value)
        {

            $this->db->from($this->table_product_image);
            $this->db->where('iProductId',$value->iProductId);
            $this->db->where('vType','1');
            $this->db->limit(1);
            $query=$this->db->get();
            $data[$key]->image = $query->result();
        }
        foreach($data as $key => $value)
        {
            $this->db->from($this->table_color);
            $this->db->where('iColorId',$value->iColorId);
            $this->db->limit(1);
            $query=$this->db->get();
            $data[$key]->color = $query->result();
        }

        return $data;
    }
    public function order_wise_product($iProductId)
    {
        $iProductIds = explode(',',$iProductId);

        $this->db->select("t.*,t2.vPrice,t2.vSku,t2.vQty");
        $this->db->from($this->table.' t');
        $this->db->join($this->table_product_variants.' t2','t.iProductId=t2.iProductId');
        $this->db->where_in('t.iProductId',$iProductIds);
        $this->db->group_by("t.iProductId");
        $this->db->order_by("t.iProductId", "desc");
        $query=$this->db->get();
        $data = $query->result();
        foreach($data as $key => $value)
        {
            $this->db->from($this->table_product_image);
            $this->db->where('iProductId',$value->iProductId);
            $this->db->where('vType','1');
            $this->db->limit(1);
            $query=$this->db->get();
            $data[$key]->image = $query->result();
        }
        foreach($data as $key => $value)
        {
            $this->db->from($this->table_color);
            $this->db->where('iColorId',$value->iColorId);
            $this->db->limit(1);
            $query=$this->db->get();
            $data[$key]->color = $query->result();
        }
        foreach($data as $key => $value)
        {
            $this->db->from($this->table_category);
            $this->db->where('iCategoryId',$value->iCategoryId);
            $this->db->limit(1);
            $query=$this->db->get();
            $data[$key]->iCategoryId = $query->result();
        }
        return $data;
    }

    public function order_invoice_product($iProductId)
    {
        $iProductIds = explode(',',$iProductId);

        $this->db->select("t.vProductName,t2.vPrice,t2.vQty,t2.iOptionId");
        $this->db->from($this->table.' t');
        $this->db->join($this->table_product_variants.' t2','t.iProductId=t2.iProductId');
        $this->db->where_in('t.iProductId',$iProductIds);
        $this->db->group_by("t.iProductId");
        $this->db->order_by("t.iProductId", "desc");
        $query=$this->db->get();
        $data = $query->result();

        foreach($data as $key => $value)
        {   
            $this->db->select("iOptionId,vOptions");
            $this->db->from($this->table_variants_options);
            $this->db->where('iOptionId',$value->iOptionId);
            $this->db->where('eStatus','Active');
            $query=$this->db->get();
            $data[$key]->vOptions = $query->row();
        }
       
        return $data;
    }


    public function get_by_id($iProductId)
    { 
        $this->db->from($this->table);
        $this->db->where('iProductId',$iProductId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;  
    }

    public function get_by_product_id_with_image($iProductId='',$vPrice='')
    { 
        $this->db->select('t.*,t2.vPrice,t2.vQty,t2.vSku,t2.iVariantId,t2.iOptionId,t2.vColor');
        $this->db->from($this->table.' t');
        $this->db->join($this->table_product_variants.' t2','t.iProductId=t2.iProductId');
        $this->db->where('t2.iProductId',$iProductId);
        $this->db->where('t2.vPrice',$vPrice);
        $this->db->where('t.eStatus','Active');
        $this->db->limit(1);
        $query = $this->db->get();
    
        $data  = $query->result();

        foreach($data as $key => $value)
        {
            $this->db->from($this->table_product_image);
            $this->db->where('iProductId',$value->iProductId);
            $this->db->limit(6);
            $query=$this->db->get();
            $data[$key]->image = $query->result();
        }
        foreach($data as $key1 => $value1)
        {   
            $this->db->select('t1.*,t2.vOptions,t2.eStatus');
            $this->db->from($this->table_product_variants.' t1');
            $this->db->join($this->table_variants_options.' t2','t1.iOptionId=t2.iOptionId');
            $this->db->where('t1.iProductId',$iProductId);
            $query=$this->db->get();
            $data[$key]->product_variants = $query->result();
        }
        return $data;  
       
    }

    public function get_by_single_product($iProductId='')
    { 
        $this->db->select('t.*,t2.vPrice,t2.vQty,t2.vSku,t2.iVariantId,t2.iOptionId,t2.vColor');
        $this->db->from($this->table.' t');
        $this->db->join($this->table_product_variants.' t2','t.iProductId=t2.iProductId');
        $this->db->where('t2.iProductId',$iProductId);
        $this->db->where('t.eStatus','Active');
        $this->db->limit(1);
        $query = $this->db->get();
        $data  = $query->row();

        $this->db->from($this->table_product_image);
        $this->db->where('iProductId',$data->iProductId);
        $query=$this->db->get();
        $data->image = $query->row();
   
        return $data;  
    }
    
    public function get_by_category_wise_product($iCategoryId)
    { 
        $this->db->select('t.*,t2.vPrice');
        $this->db->from($this->table.' t');
        $this->db->join($this->table_product_variants.' t2','t.iProductId=t2.iProductId');
        $this->db->where('t.iCategoryId',$iCategoryId);
        $this->db->where('t.eStatus','Active');
        $this->db->group_by('t.iProductId');
        $this->db->order_by('iProductId','RANDOM');
        $this->db->limit(12);
        $query = $this->db->get();
    
        $data  = $query->result();
        foreach($data as $key => $value)
        {
            $this->db->from($this->table_product_image);
            $this->db->where('iProductId',$value->iProductId);
            $this->db->limit(1);
            $query=$this->db->get();
            $data[$key]->image = $query->result();
        }
        return $data;  
       
    }

   
    public function get_by_all_product_variyant($iProductId)
    {
        $this->db->select('t1.*,t2.vOptions');
        $this->db->from($this->table_product_variants.' t1');
        $this->db->join($this->table_variants_options.' t2','t1.iOptionId=t2.iOptionId');
        $this->db->where('t1.iProductId',$iProductId);
        $query=$this->db->get();
        $data = $query->result();

        if(count($data)==0)
        {
            $this->db->select('t1.*');
            $this->db->from($this->table_product_variants.' t1');
            $this->db->where('t1.iProductId',$iProductId);
            $query=$this->db->get();
            $data = $query->result();
        }

        return $data;  
    }
    public function get_by_all_image($iProductId)
    { 
        $this->db->from($this->table_product_image);
        $this->db->where('iProductId',$iProductId);
        $this->db->order_by('vType','DESC');
        $query=$this->db->get();
        $data = $query->result();
        return $data;  
    }


    public function get_by_id_subcategory($iSubcategoryId)
    {
        $this->db->select('t.vSubTitle');
        $this->db->from($this->table_subcategory.' t');
        $this->db->where('t.iSubcategoryId',$iSubcategoryId);
        $query=$this->db->get();
        $data = $query->row();
        return $data;
    }

    public function delete_by_id($iProductId)
    {
        $this->db->where('iProductId', $iProductId);
        $this->db->delete($this->table);
    }
    public function delete_by_image($iProductId)
    {
        $this->db->where('iProductId', $iProductId);
        $this->db->delete($this->table_product_image);
    }

    public function delete_by_product_variants($iProductId)
    {
        $this->db->where('iProductId', $iProductId);
        $this->db->delete($this->table_product_variants);
    }
    
    
    public function delete_by_image_id($iImageId)
    {
        $this->db->where('iImageId', $iImageId);
        $this->db->delete($this->table_product_image);
    }

    public function update($where, $data)
    {
        $this->db->update($this->table, $data, $where);
        return $this->db->affected_rows();
    }

    public function update_product_image($where, $data)
    {
        $this->db->update($this->table_product_image, $data, $where);
        return $this->db->affected_rows();
    }

    

    // ************************************************FRONT****************************
    
    public function get_by_homepage_product()
    { 
        $this->db->select('t.*,t1.vImage,t2.vPrice');
        // $this->db->select('t.*,t1.vImage');
        $this->db->from($this->table. ' t');
        $this->db->join($this->table_product_image.' t1','t.iProductId=t1.iProductId');
        $this->db->join($this->table_product_variants.' t2','t.iProductId=t2.iProductId');
        $this->db->group_by('t.iProductId');
        $this->db->where('t.vHomePageDisplay','1');
        $this->db->where('t.eStatus','Active');
        $this->db->limit(4);
        $query=$this->db->get();
        $data = $query->result();
        return $data;  
    }
    public function get_by_main_product()
    { 
        $this->db->from($this->table_category);
        $this->db->where('eStatus','Active');
        $this->db->order_by('vTitle','ASC');
        $query=$this->db->get();
        $data = $query->result();
        return $data;  
    }
    public function get_by_all_product_listing($critearea=array())
    { 
        // echo "<pre>";
        // print_r($critearea);
        // exit;

        $this->db->select('t.*,MAX(t2.vPrice) as vPrice');
        $this->db->from($this->table. ' t');
        $this->db->join($this->table_product_variants.' t2','t.iProductId=t2.iProductId');
       
        if(!empty($critearea['vPrice']))
        {  
            $Price = explode("-", $critearea['vPrice']);
            if(!empty($Price[0]))
            {
                $this->db->where('t2.vPrice >=' ,(int)$Price[0]);
            }
            if(!empty($Price[1]))
            {
                $this->db->where('t2.vPrice <=' , (int)$Price[1]);
            }
        
            if($critearea['OrderBy']!='HIGHEST' && $critearea['OrderBy']!='LOWEST')
            {
                $this->db->order_by('t2.vPrice','DESC');
            }
        }

        if(!empty($critearea['iColorId']))
        {
            $this->db->where('t.iColorId',$critearea['iColorId']);
        }
        // if(!empty($critearea['vProductName']))
        // {
        //     $this->db->where('t.vProductName',$critearea['vProductName']);
        // }
        
        if($critearea['OrderBy'] == 'HIGHEST')
        {
            $this->db->order_by('vPrice','DESC');
        }
        if($critearea['OrderBy'] == 'LOWEST')
        {
            $this->db->order_by('vPrice','ASC');
        }
        if($critearea['OrderBy'] == 'DESC')
        {
            $this->db->order_by('iProductId','DESC');
        }

        if(!empty($critearea['iCategoryId']))
        {
            $this->db->where('t.iCategoryId',$critearea['iCategoryId']);
        }

        if(!empty($critearea['iSubcategoryId']))
        {
            $this->db->where('t.iSubcategoryId',$critearea['iSubcategoryId']);
        }

        $this->db->where('t.eStatus','Active');
        $this->db->where('t2.vPrice !=','');
        $this->db->where('t.vProductName !=','');
        $this->db->group_by('t2.iProductId');
        $query=$this->db->get();

        // echo $this->db->last_query();
        // exit;

        $data = $query->result();

        foreach($data as $key => $value)
        {
            $this->db->from($this->table_product_image);
            $this->db->where('iProductId',$value->iProductId);
            $this->db->where('vType','1');
            $this->db->limit(2);
            $query=$this->db->get();
            $data[$key]->image = $query->result();
        }
        return $data;  
    }

    public function delete_by_wishlist_data($iProductId)
    {
        $this->db->where('iProductId', $iProductId);
        $this->db->delete($this->table_wishlist);
    }

    
}
