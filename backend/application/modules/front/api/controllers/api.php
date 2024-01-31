<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Api extends MX_Controller 
{
    public function __construct() {
        parent::__construct();
        $this->load->library('general');
        $this->load->model('content/content_model');
		$this->load->model('stories/stories_model');
		$this->load->model('product/product_model');
		$this->load->model('category/category_model');
		$this->load->model('variants/variants_model');
		$this->load->model('order/order_model');
		$this->load->model('login/login_model');
		$this->load->model('register/register_model');
        header('Content-Type: application/json');
		header('Access-Control-Allow-Origin: *');
// 		header("Access-Control-Allow-Origin: https://pramesh.justcodenow.com/");
        // header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        date_default_timezone_set('Asia/Calcutta');

    }

	public function login()
	{	
		$error = false;

		$login    = $this->input->post('vEmail');
		$password = $this->input->post('vPassword');

		if(empty($login))
		{
			$error = true;
			$data['message'] = array('Output' => 1, 'Message' => 'Email is required');
		}
		if(empty($password))	
		{
			$error = true;
			$data['message'] = array('Output' => 1, 'Message' => 'Password is required');
		}

		if($error == false)
		{
			$result     = $this->login_model->login($login, md5($password));

			if(count($result) > 0)
			{	
				if($result->eStatus == 'Active')
				{
					$data['estatus']     	= "0";
					$data['message'] 		= 'Login Successfully';
					$data['vUserName']	    = $result->vUserName;
					$data['iAdminId']	    = $result->iAdminId;
				}
				else 
				{
					$data['estatus']     	= "1";
					$data['message'] 		= 'Status Not Active';
				}
			} 	 
			else 
			{	
				$data['estatus']     = "1";
				$data['message']    = 'Email and Password Incorect!';
			}
		}
	
		echo json_encode($data);
		exit;

	}

	public function banner_add()
	{	
		$iBannerId = $_POST['iBannerId'];

	    $data['vTitle']              	= $_POST['vTitle'];
        $data['iOrder']       			= $_POST['vOrder'];
        $data['tDescription']           = $_POST['vdesc'];
        $data['dtAddedDate']            = date("Y-m-d h:i:s");
        $data['eStatus']            	= $_POST['eStatus'];
        $data['vBannerType']            = $_POST['vBannerType'];
        $data['eShowtype']            	= $_POST['eShowtype'];

		
		if($_FILES['vImage']['name'] != "")
        {
            if($_FILES['vImage']['type'] == 'image/jpg'){
                $ext = ".jpg";
            } else if($_FILES['vImage']['type'] == 'image/jpeg'){
                $ext = ".jpeg";
            } else if($_FILES['vImage']['type'] == 'image/png'){
                $ext = ".png";
            }
			else if($_FILES['vImage']['type'] == 'image/webp'){
                $ext = ".webp";
            }

            $image = time().$ext;
			$tmp_name = $_FILES["vImage"]["tmp_name"];
            $base_path = $this->config->item('base_path');
		                 
            $directory = $base_path."/backend/image/banner/";
		
            $save_path = base_url("/image/banner/");
            
            mkdir($directory, 0777, TRUE);

             $p = $directory.$image;
			move_uploaded_file($tmp_name, $p);

            $data['vImage'] =  $save_path.'/'.$image;
        }
		
		if($iBannerId=="")
		{
			$result   = $this->content_model->add_banner($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Banner Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Banner Not Added Please Try!';
			}
		}
		else
		{
			$where = array('iBannerId'=>$iBannerId);
			$result   = $this->content_model->update($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Banner Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}

	public function all_banner_get()
	{
		$iBannerId = $_GET['iBannerId'];

		if($_SERVER['REQUEST_METHOD']=='GET' && $iBannerId!="")
		{
			$result  = $this->content_model->get_by_id($iBannerId);

			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Banner Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->content_model->get_by_all_banner();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Banner Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		
 		echo json_encode($data);
	}

	public function delete()
	{
		$iBannerId  = $this->input->post('iBannerId');
	
		$id = $this->content_model->delete_by_id($iBannerId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Banner Deleted Successfully';
			
		echo json_encode($data);
	}

	public function image_content_added()
	{	
		
		$iContentId = $_POST['iContentId'];

	    $data['vTitle']              	= $_POST['vTitle'];
        $data['tDescription']           = $_POST['tDesc'];
        $data['dtAddedDate']            = date("Y-m-d h:i:s");
        $data['eStatus']            	= $_POST['eStatus'];
        $data['vImageType']            	= $_POST['vImageType'];
	
		if($_FILES['vImage']['name'] != "")
        {
		
            if($_FILES['vImage']['type'] == 'image/jpg'){
                $ext = ".jpg";
            } else if($_FILES['vImage']['type'] == 'image/jpeg'){
                $ext = ".jpeg";
            } else if($_FILES['vImage']['type'] == 'image/png'){
                $ext = ".png";
            }
			else if($_FILES['vImage']['type'] == 'image/webp'){
                $ext = ".webp";
            }
			
            $image = time().$ext;

            $base_path = $this->config->item('base_path');
		
            $directory = $base_path."/backend/image/Image_content/";
		
            $save_path = base_url("/image/Image_content/");
            
            mkdir($directory, 0777, TRUE);

            $config = array(
                'file_name' => $image,
                'upload_path' => $directory,
                'allowed_types' => "gif|jpg|png|jpeg|webp|WEBP",
            );

            $this->load->library('upload', $config);

            if(!$this->upload->do_upload('vImage'))   {
                echo "<pre>";
                print_r($this->upload->display_errors());
                exit;
            }

             $data['vImage'] =  $save_path.'/'.$image;
        }

		if($iContentId=='')
		{
			$result   = $this->content_model->image_content_add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Image Content Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Image Content Not Added Please Try!';
			}
		}
		else
		{
			$where = array('iContentId'=>$iContentId);

			$result   = $this->content_model->update_image_content($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Image Content Updated  Successfully';
			}
		}
	
		echo json_encode($data);
		exit;

	}

	public function all_image_content_get()
	{
	    $iContentId = $_GET['iContentId'];
	
		if($_SERVER['REQUEST_METHOD']=='GET' && $iContentId!="")
		{
			$result  = $this->content_model->get_image_content_by_id($iContentId);
			
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Image Content Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->content_model->get_by_all_image_content();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Image Content Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		
		
		
 		echo json_encode($data);
	}

	public function image_content_delete()
	{
		$iContentId  = $this->input->post('iContentId');
	
		$id = $this->content_model->delete_by_id_image_content($iContentId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Image Content Deleted Successfully';
			
		echo json_encode($data);
	}

	public function useradd()
	{	
		$iUserId 	= $_POST['iUserId'];

	    $data['vFirstName']              	= $_POST['vFirstName'];
        $data['vLastName']       			= $_POST['vLastName'];
        $data['vPassword']           		= md5($_POST['vPassword']);
        $data['dtAddedDate']            	= date("Y-m-d h:i:s");
        $data['dtUpdatedDate']            	= date("Y-m-d h:i:s");
        $data['eStatus']            		= $_POST['eStatus'];
		


		if($iUserId=="")
		{
			$data['vEmail']           			= $_POST['vEmail'];
			$result   = $this->content_model->add_user($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'User Created Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'User Not Create Please Try!';
			}
		}
		else
		{
			$where = array('iUserId'=>$iUserId);
			$result   = $this->content_model->update_userdata($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'User Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}
	public function all_use_listing()
	{
		$result       	= $this->content_model->get_by_all_user();
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'User Data Get Successfully';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}

		echo json_encode($data);
	}

	public function all_user_get()
	{
		$iUserId = $_GET['iUserId'];

		if($_SERVER['REQUEST_METHOD']=='GET' && $iUserId!="")
		{
			$result  = $this->content_model->get_by_user_id($iUserId);

			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'User Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
		
			$result       	= $this->content_model->get_by_all_user();
			$Lastdata       = $this->content_model->get_by_last_data();
			$banner         = $this->content_model->get_by_all_banner();
			$stories        = $this->stories_model->get_by_all_stories();
			$order     		= $this->order_model->get_by_all_order();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'User Data Get Successfully';
				$data['data']       = $result;
				$data['count']      = count($result);
				$data['last']      	= $Lastdata;
				$data['banner']     = count($banner);
				$data['stories']    = count($stories);
				$data['order']    	= count($order);
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		
 		echo json_encode($data);
	}

	public function delete_user()
	{
		$iUserId  = $this->input->post('iUserId');
	
		$iDeletedId = $this->content_model->delete_by_user_id($iUserId);
		if($iDeletedId)
		{
			$data['Status']     = '0';
			$data['message']  	= 'User Deleted Successfully';
		}
		else
		{
			$data['Status']     = '1';
			$data['message']  	= 'User NotDeleted';

		}
		
		echo json_encode($data);
	}

	//***************************************************STORIES***************************************
	public function all_stories()
	{

		$iStoriesId = $_GET['iStoriesId'];
		
		if($_SERVER['REQUEST_METHOD']=='GET' && $iStoriesId!="")
		{
			$result  = $this->stories_model->get_by_id($iStoriesId);

			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Stories Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
	
			$result     		= $this->stories_model->get_by_all_stories();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'User Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		
 		echo json_encode($data);
	}

	public function stories_added()
	{
		$iStoriesId 						= $_POST['iStoriesId'];
		// *************************First Proccess*************
	    $data['vStories1_Title']            = $_POST['Stories1_title'];
        $data['vStories1_Desc']       	    = $_POST['Stories1_desc'];

		if($_FILES['Stories1_image']['name'] != "")
        {
            if($_FILES['Stories1_image']['type'] == 'image/jpg'){
                $ext = ".jpg";
            } else if($_FILES['Stories1_image']['type'] == 'image/jpeg'){
                $ext = ".jpeg";
            } else if($_FILES['Stories1_image']['type'] == 'image/png'){
                $ext = ".png";
            }

            $image = time().$ext;
			$tmp_name = $_FILES["Stories1_image"]["tmp_name"];
            $base_path = $this->config->item('base_path');
		
            $directory = $base_path."/backend/image/Stories/";
		
            $save_path = base_url("/image/Stories/");
            
            mkdir($directory, 0777, TRUE);

             $p = $directory.$image;
			move_uploaded_file($tmp_name, $p);

            $data['vStories1_image'] =  $save_path.'/'.$image;
        }
       	// *************************First Proccess END*************
		// *************************Second Proccess*************
		if($_FILES['second_image1']['name'] != "")
        {
            if($_FILES['second_image1']['type'] == 'image/jpg'){
                $ext = ".jpg";
            } else if($_FILES['second_image1']['type'] == 'image/jpeg'){
                $ext = ".jpeg";
            } else if($_FILES['second_image1']['type'] == 'image/png'){
                $ext = ".png";
            }

            $image = "secondimg1".time().$ext;
			$tmp_name = $_FILES["second_image1"]["tmp_name"];
            $base_path = $this->config->item('base_path');
		
            $directory = $base_path."/backend/image/Stories/";
		
            $save_path = base_url("/image/Stories/");
            
            mkdir($directory, 0777, TRUE);

             $p = $directory.$image;
			move_uploaded_file($tmp_name, $p);

            $data['vSecond_image1'] =  $save_path.'/'.$image;
        }
		if($_FILES['second_image2']['name'] != "")
        {
            if($_FILES['second_image2']['type'] == 'image/jpg'){
                $ext = ".jpg";
            } else if($_FILES['second_image2']['type'] == 'image/jpeg'){
                $ext = ".jpeg";
            } else if($_FILES['second_image2']['type'] == 'image/png'){
                $ext = ".png";
            }

            $image = "secondimg2".time().$ext;
			$tmp_name = $_FILES["second_image2"]["tmp_name"];
            $base_path = $this->config->item('base_path');
		
            $directory = $base_path."/backend/image/Stories/";
		
            $save_path = base_url("/image/Stories/");
            
            mkdir($directory, 0777, TRUE);

             $p = $directory.$image;
			move_uploaded_file($tmp_name, $p);

            $data['vSecond_image2'] =  $save_path.'/'.$image;
        }
		if($_FILES['second_image3']['name'] != "")
        {
            if($_FILES['second_image3']['type'] == 'image/jpg'){
                $ext = ".jpg";
            } else if($_FILES['second_image3']['type'] == 'image/jpeg'){
                $ext = ".jpeg";
            } else if($_FILES['second_image3']['type'] == 'image/png'){
                $ext = ".png";
            }

           $image = "secondimg3".time().$ext;
		
			$tmp_name 	= $_FILES["second_image3"]["tmp_name"];
            $base_path 	= $this->config->item('base_path');
            $directory 	= $base_path."/backend/image/Stories/";
            $save_path 	= base_url("/image/Stories/");
            mkdir($directory, 0777, TRUE);

            $p = $directory.$image;
			
			move_uploaded_file($tmp_name, $p);

            $data['vSecond_image3'] =  $save_path.'/'.$image;
        }
		// *************************Second Proccess END*************
		// *************************Third Proccess*************
		$data['vVideo_Title']           = $_POST['video_title'];
        $data['vVideo_Link1']      		= $_POST['video_link1'];
        $data['vVideo_Link2']       	= $_POST['video_link2'];
        $data['vVideo_Link3']       	= $_POST['video_link3'];
        $data['vVideo_Link4']       	= $_POST['video_link4'];
        $data['vVideo_Desc']       	    = $_POST['video_desc'];
		
		// ************************* Forth Proccess *************
		$data['vSecond_Title']            = $_POST['second_stories_title'];
        $data['vSecond_Desc']       	   = $_POST['second_stories_desc'];
		if($_FILES['second_stories_image']['name'] != "")
        {
            if($_FILES['second_stories_image']['type'] == 'image/jpg'){
                $ext = ".jpg";
            } else if($_FILES['second_stories_image']['type'] == 'image/jpeg'){
                $ext = ".jpeg";
            } else if($_FILES['second_stories_image']['type'] == 'image/png'){
                $ext = ".png";
            }

            $image 		= time().$ext;
			$tmp_name 	= $_FILES["second_stories_image"]["tmp_name"];
            $base_path 	= $this->config->item('base_path');
            $directory 	= $base_path."/backend/image/Stories/";
            $save_path 	= base_url("/image/Stories/");
            
            mkdir($directory, 0777, TRUE);

            $p = $directory.$image;
			move_uploaded_file($tmp_name, $p);

            $data['vSecond_image'] =  $save_path.'/'.$image;
        }
		$data['eStatus']           	   	= $_POST['eStatus'];
		$data['dtAddedDate']            = date("Y-m-d h:i:s");
		// *************************Forth Proccess END*************
		
		if($iStoriesId=="")
		{
			$result   = $this->stories_model->add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Stories Created Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Stories Not Create Please Try!';
			}
		}
		else
		{
			$where = array('iStoriesId'=>$iStoriesId);
			$result   = $this->stories_model->update($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Stories Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}

	public function stories_added_secondpage()
	{	
	
		$iStoriesId 						= $_POST['iStoriesId'];
		// *************************First Proccess*************
		$data['vTitle1']            = $_POST['vTitle1'];
		$data['tDesc1']       	    = $_POST['tDesc1'];
		$data['iStoriesId']       	= $_POST['iStoriesId'];
		
		if($_FILES['vImage1']['name'] != "")
		{
			if($_FILES['vImage1']['type'] == 'image/jpg'){
				$ext = ".jpg";
			} else if($_FILES['vImage1']['type'] == 'image/jpeg'){
				$ext = ".jpeg";
			} else if($_FILES['vImage1']['type'] == 'image/png'){
				$ext = ".png";
			}

			$image = time().$ext;
			$tmp_name = $_FILES["vImage1"]["tmp_name"];
			$base_path = $this->config->item('base_path');
		
			$directory = $base_path."/backend/image/Stories/";
		
			$save_path = base_url("/image/Stories/");
			
			mkdir($directory, 0777, TRUE);

				$p = $directory.$image;
			move_uploaded_file($tmp_name, $p);

			$data['vImage1'] =  $save_path.'/'.$image;
		}
		// *************************First Proccess END*************

		// *************************Second Proccess*************
		$data['vSubTitle']          = $_POST['vSubTitle'];
		$data['tDesc2']       	    = $_POST['tDesc2'];

		if($_FILES['vImage2']['name'] != "")
		{
			if($_FILES['vImage2']['type'] == 'image/jpg'){
				$ext = ".jpg";
			} else if($_FILES['vImage2']['type'] == 'image/jpeg'){
				$ext = ".jpeg";
			} else if($_FILES['vImage2']['type'] == 'image/png'){
				$ext = ".png";
			}

			$image = "secondimg1".time().$ext;
			$tmp_name = $_FILES["vImage2"]["tmp_name"];
			$base_path = $this->config->item('base_path');
		
			$directory = $base_path."/backend/image/Stories/";
		
			$save_path = base_url("/image/Stories/");
			
			mkdir($directory, 0777, TRUE);

				$p = $directory.$image;
			move_uploaded_file($tmp_name, $p);

			$data['vImage2'] =  $save_path.'/'.$image;
		}
		// *************************Second Proccess END*************

		// *************************Third Proccess*************
		$data['tDesc3']       	    = $_POST['tDesc3'];
		if($_FILES['vImage3']['name'] != "")
		{
			if($_FILES['vImage3']['type'] == 'image/jpg'){
				$ext = ".jpg";
			} else if($_FILES['vImage3']['type'] == 'image/jpeg'){
				$ext = ".jpeg";
			} else if($_FILES['vImage3']['type'] == 'image/png'){
				$ext = ".png";
			}

			$image = "secondimg1".time().$ext;
			$tmp_name = $_FILES["vImage3"]["tmp_name"];
			$base_path = $this->config->item('base_path');
		
			$directory = $base_path."/backend/image/Stories/";
		
			$save_path = base_url("/image/Stories/");
			
			mkdir($directory, 0777, TRUE);

				$p = $directory.$image;
			move_uploaded_file($tmp_name, $p);

			$data['vImage3'] =  $save_path.'/'.$image;
		}
		// *************************third Proccess END*************

		// *************************Forth Proccess Start*************
		$multipleImage = array();
		if($_FILES['vImage4']['name'] != "")
		{
			for($i=0; $i<count($_FILES['vImage4']['name']); $i++)
			{
				if($_FILES['vImage4']['type'][$i] == 'image/jpg'){
					$ext = ".jpg";
				} else if($_FILES['vImage4']['type'][$i] == 'image/jpeg'){
					$ext = ".jpeg";
				} else if($_FILES['vImage4']['type'][$i] == 'image/png'){
					$ext = ".png";
				}else if($_FILES['vImage4']['type'][$i] == 'image/gif'){
					$ext = ".gif";
				}else if($_FILES['vImage4']['type'][$i] == 'image/webp'){
					$ext = ".webp";
				}
				
				$time = time().'_'.$i;
				$image = $time.$ext;
				
				$tmp_name 	= $_FILES["vImage4"]["tmp_name"][$i];
				$base_path 	= $this->config->item('base_path');
				$directory 	= $base_path."/backend/image/Stories/";
				$save_path 	= base_url("/image/Stories/");
				
				mkdir($directory, 0777, TRUE);
				$p = $directory.$image;
				move_uploaded_file($tmp_name, $p);
				$path = '';
				$path = $save_path.'/'.$image;
				array_push($multipleImage,$path);	
			}
				
		}


		$data['vImage4']           	   	= implode(",",$multipleImage);
		$data['eStatus']           	   	= $_POST['eStatus'];
		$data['dtAddedDate']            = date("Y-m-d h:i:s");
		// *************************Forth Proccess END*************

		// if($iStoriesId=="")
		// {
		// 	$result   = $this->stories_model->add($data);
		// 	if($result)
		// 	{
		// 		$data = array();
		// 		$data['Status'] 		= '0';
		// 		$data['message']  		= 'Stories Created Successfully';
		// 	}
		// 	else
		// 	{
		// 		$data = array();
		// 		$data['Status'] 		= '1';
		// 		$data['message']  		= 'Stories Not Create Please Try!';
		// 	}
		// }
		// else
		// {
		// 	$where = array('iStoriesId'=>$iStoriesId);
		// 	$result   = $this->stories_model->update($where,$data);
		// 	if($result)
		// 	{
		// 		$data = array();
		// 		$data['Status'] 		= '0';
		// 		$data['message']  		= 'Stories Updated  Successfully';
		// 	}
		// }
		
		echo json_encode($data);
		exit;

	}
    
	public function stories_delete()
	{
		$iStoriesId  = $this->input->post('iStoriesId');
		$id = $this->stories_model->delete_by_id($iStoriesId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Stories Deleted Successfully';
			
		echo json_encode($data);
	}
	// ********************************************************PRODUCT*******************************************
	public function all_product()
	{
		$iProductId = $_GET['iProductId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iProductId!="")
		{
			
			$result  	  		= $this->product_model->get_by_id($iProductId);
			$all_image    		= $this->product_model->get_by_all_image($iProductId);
			$iHeaderId 			= $result->iHeaderId;
			$iFabricId 			= $result->iFabricId;
			$SubCategory   		= $this->category_model->get_by_all_subcategory_data($iHeaderId,$iFabricId);
			$categoryArray 		= $this->category_model->get_by_all_active_category();
			$product_variant    = $this->product_model->get_by_all_product_variyant($iProductId);

			if(count($result) > 0)
			{
				$iVariantsId 		= $product_variant[0]->iVariantId;
				$variantsListData  	= $this->variants_model->get_by_variants_wise_option($iVariantsId);

				$data['Status']     		= '1';
				$data['message']  			= 'Product Data Get Successfully';
				$data['data']       		= $result;
				$data['SubCategory'] 		= $SubCategory;
				$data['Image']  			= $all_image;
				$data['product_variant']  	= $product_variant;
				$data['variantsListData'] 	= $variantsListData;
				$data['categoryArray'] 		= $categoryArray;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			
			$result     		= $this->product_model->get_by_all_product();
	
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'User Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
 		echo json_encode($data);
	}

	public function product_added()
	{	
	
		$iProductId 						= $_POST['iProductId'];
	    $data['vProductName']              	= $_POST['vProduct'];
	    $data['iDescription']              	= $_POST['tDescription'];
	    $data['tMoreInformation']           = $_POST['tMoreinformation'];
		$data['iHeaderId']					= $_POST['iHeaderId'];
		$data['iFabricId']					= $_POST['iFabricId'];
		$data['iSubcategoryId']       	    = $_POST['iSubcategoryId'];
        $data['iCategoryId']       	   		= $_POST['iCategoryId'];
        // $data['iMaterialId']       	   		= $_POST['iMaterialId'];
		$data['iColorId']					= $_POST['iColorId'];
		$data['eStatus']            		= $_POST['eStatus'];
		$data['vHomePageDisplay']           = $_POST['vHomePageDisplay'];
        $data['dtAddedDate']            	= date("Y-m-d h:i:s");

        $all_image = array();

		if($iProductId=="")
		{
			$last_id = $this->product_model->add($data);
		
			if($last_id!="")
			{
				$price 						= $_POST['price'];
				$Qty 						= $_POST['qty'];
				$sku 						= $_POST['sku'];
				$weight 					= $_POST['weight'];
				$OptionName 				= $_POST['optionName'];
				$color 						= $_POST['color'];
				$VariantsId 				= $_POST['iVariantId'];
				
				for($i=0;$i<count($price);$i++)
				{
					$datao['iProductId'] 	= $last_id;
					$datao['vPrice']        = $price[$i];
					$datao['vQty']        	= $Qty[$i];
					$datao['vSku']        	= $sku[$i];
					$datao['vWeight']       = $weight[$i];
					$datao['iVariantId'] 	= $VariantsId;
					$datao['iOptionId']  	= $OptionName[$i];
					$datao['vColor']  	   	= $color[$i];
					$datao['dtAddedDate'] 	= date("Y-m-d h:i:s");

					$product_variantId = $this->product_model->add_product_variants($datao);
				}
				if($_FILES['vImage']['name'] != "")
				{
					for($i=0; $i<count($_FILES['vImage']['name']); $i++)
					{
						if($_FILES['vImage']['type'][$i] == 'image/jpg'){
							$ext = ".jpg";
						} else if($_FILES['vImage']['type'][$i] == 'image/jpeg'){
							$ext = ".jpeg";
						} else if($_FILES['vImage']['type'][$i] == 'image/png'){
							$ext = ".png";
						}else if($_FILES['vImage']['type'][$i] == 'image/gif'){
							$ext = ".gif";
						}else if($_FILES['vImage']['type'][$i] == 'image/webp'){
							$ext = ".webp";
						}
						
						$time = time().'_'.$i;
					    $image = $time.$ext;
						
						$tmp_name 	= $_FILES["vImage"]["tmp_name"][$i];
						$base_path 	= $this->config->item('base_path');
						$directory 	= $base_path."/backend/image/Product/";
						$save_path 	= base_url("/image/Product/");
						
						mkdir($directory, 0777, TRUE);
						$p = $directory.$image;
						move_uploaded_file($tmp_name, $p);
						$path = $save_path.'/'.$image;

						if($i <= 1)
						{
							$datas['vType'] = '1';
						}
						else
						{
						     $datas['vType'] = '0';
						}
						$datas['iProductId'] = $last_id;
						$datas['vImage']     = $path;
						$imageid = $this->product_model->image_add($datas);
					}
				}
			}

			if($last_id)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Product Created Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Product Not Create Please Try!';
			}
		}
		else
		{
			if($iProductId!="")
			{
				$this->product_model->delete_by_product_variants($iProductId);

				$price 						= $_POST['price'];
				$Qty 						= $_POST['qty'];
				$sku 						= $_POST['sku'];
				$weight 					= $_POST['weight'];
				$OptionName 				= $_POST['optionName'];
				$VariantsId 				= $_POST['iVariantId'];
				
				for($i=0;$i<count($price);$i++)
				{
					if(!empty($price[$i]))
					{
						$datao['iProductId'] 	= $iProductId;
						$datao['vPrice']        = $price[$i];
						$datao['vQty']        	= $Qty[$i];
						$datao['vSku']        	= $sku[$i];
						$datao['vWeight']       = $weight[$i];
						$datao['iVariantId'] 	= $VariantsId;
						$datao['iOptionId']  	= $OptionName[$i];
						$datao['dtAddedDate'] 	= date("Y-m-d h:i:s");
						$product_variantId = $this->product_model->add_product_variants($datao);
					}
					
				}

			}

			$where = array('iProductId'=>$iProductId);
			
			$result   = $this->product_model->update($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Product Updated  Successfully';
			}
		}
		echo json_encode($data);

	}

	public function product_delete()
	{
		$iProductId  = $this->input->post('iProductId');
		$this->product_model->delete_by_id($iProductId);
	    $this->product_model->delete_by_image($iProductId);
	    $this->product_model->delete_by_product_variants($iProductId);

		
		$data['Status']     = '0';
		$data['message']  	= 'Product Deleted Successfully';
		echo json_encode($data);
	
	}
	
	public function product_image_delete()
	{
		$iImageId  = $this->input->post('iImageId');
	
		$id = $this->product_model->delete_by_image_id($iImageId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Image Deleted Successfully';
		echo json_encode($data);	
	}

	public function get_variants_wise_option()
	{
		$iVariantsId = $_GET['iVariantsId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iVariantsId!="")
		{
			$result  = $this->variants_model->get_by_variants_wise_option($iVariantsId);

			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Option Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}

			echo json_encode($data);
		}
	}
	public function product_image_add()
	{
		$iProductId 						= $_POST['iProductId'];
		
		$length = strlen($_FILES['vImage']['name'][0]);
	
		if($_FILES['vImage']['name'] != "" && $length > 0)
		{
			for($i=0; $i<count($_FILES['vImage']['name']); $i++)
			{
				if($_FILES['vImage']['type'][$i] == 'image/jpg'){
					$ext = ".jpg";
				} else if($_FILES['vImage']['type'][$i] == 'image/jpeg'){
					$ext = ".jpeg";
				} else if($_FILES['vImage']['type'][$i] == 'image/png'){
					$ext = ".png";
				}else if($_FILES['vImage']['type'][$i] == 'image/gif'){
					$ext = ".gif";
				}else if($_FILES['vImage']['type'][$i] == 'image/webp'){
					$ext = ".webp";
				}
				
				$time = time().'_'.$i;
				$image = $time.$ext;
				
				$tmp_name 	= $_FILES["vImage"]["tmp_name"][$i];
				$base_path 	= $this->config->item('base_path');
				$directory 	= $base_path."/backend/image/Product/";
				$save_path 	= base_url("/image/Product/");
				
				mkdir($directory, 0777, TRUE);
				$p = $directory.$image;
				move_uploaded_file($tmp_name, $p);
				$path = $save_path.'/'.$image;

				$datas['iProductId'] = $iProductId;
				$datas['vImage']     = $path;
				$imageid = $this->product_model->image_add($datas);
			}

			$data = array();
			$data['Status'] 		= '0';
			$data['message']  		= 'Product Image Added Successfully';
			
			echo json_encode($data);
			exit;	
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['message']  		= 'Please Select Image';
			
			echo json_encode($data);
			exit;
		}
	}
	// **********************************************************CATEGORY********************************************
	public function all_category_get()
	{
		$iCategoryId = $_GET['iCategoryId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iCategoryId!="")
		{
			$result  = $this->category_model->get_by_id($iCategoryId);
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Category Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->category_model->get_by_all_category();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Category Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
 		echo json_encode($data);
	}
	// ****************************** Header menu *******************************
	public function all_categoy_menu_get()
	{
		$iHeaderId = $_GET['iHeaderId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iHeaderId!="")
		{
			$result  = $this->category_model->get_by_header_id($iHeaderId);
			if(!empty($result))
			{
				$data['Status']     = '1';
				$data['message']  	= 'Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->category_model->get_by_all_header_menu();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Header Menu Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
 		echo json_encode($data);
	}

	public function header_menu_add()
	{	
		$iHeaderId = $_POST['iHeaderId'];

	    $data['vTitle']              	= $_POST['vTitle'];
        $data['dtAddedDate']            = date("Y-m-d h:i:s");
        $data['eStatus']            	= $_POST['eStatus'];

	    if($_FILES['vImage']['name'] != "")
        {
            if($_FILES['vImage']['type'] == 'image/jpg'){
                $ext = ".jpg";
            } else if($_FILES['vImage']['type'] == 'image/jpeg'){
                $ext = ".jpeg";
            } else if($_FILES['vImage']['type'] == 'image/png'){
                $ext = ".png";
            }else if($_FILES['vImage']['type'] == 'image/webp'){
                $ext = ".webp";
            }
            $image = time().$ext;
			$tmp_name = $_FILES["vImage"]["tmp_name"];
            $base_path = $this->config->item('base_path');
		
             $directory = $base_path."/backend/image/category/";
		
            $save_path = base_url("/image/category/");
            
            mkdir($directory, 0777, TRUE);

            $p = $directory.$image;
			move_uploaded_file($tmp_name, $p);
        
            $data['vImage'] =  $save_path.'/'.$image;
        }
		
		if($iHeaderId=="")
		{
			$result   = $this->category_model->header_menu_add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Header Menu Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Header Menu Not Added Please Try!';
			}
		}
		else
		{
			$where = array('iHeaderId'=>$iHeaderId);
			$result   = $this->category_model->update_header_menu($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Header Menu Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}

	public function delete_header_menu()
	{
		$iHeaderId  = $this->input->post('iHeaderId');
	
		$id = $this->category_model->delete_by_header_id($iHeaderId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Category Deleted Successfully';
			
		echo json_encode($data);
	}
	//*****************************Header menu END******************************
	// ******************************Matirial*************************************
	public function all_material_get()
	{
		$iMaterialId = $_GET['iMaterialId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iMaterialId!="")
		{
			$result  = $this->category_model->get_by_material_id($iMaterialId);
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->category_model->get_by_all_materials();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Material Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
 		echo json_encode($data);
	}

	public function material_add()
	{	
		$iMaterialId = $_POST['iMaterialId'];

	    $data['vTitle']              	= $_POST['vTitle'];
        $data['dtAddedDate']            = date("Y-m-d h:i:s");
        $data['eStatus']            	= $_POST['eStatus'];

	 
		if($iMaterialId=="")
		{
			$result   = $this->category_model->material_add_add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Materials Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Materials Not Added Please Try!';
			}
		}
		else
		{
			$where = array('iMaterialId'=>$iMaterialId);
			$result   = $this->category_model->update_materials($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Materials Updated Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}

	public function delete_material()
	{
		$iMaterialId  = $this->input->post('iMaterialId');
	
		$id = $this->category_model->delete_by_materials_is($iMaterialId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Materials Deleted Successfully';
			
		echo json_encode($data);
	}
	// **********************************Matirials***********************************


	public function delete_category()
	{
		$iCategoryId  = $this->input->post('iCategoryId');
	
		$id = $this->category_model->delete_by_id($iCategoryId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Category Deleted Successfully';
			
		echo json_encode($data);
	}

	public function category_add()
	{	
		
		$iCategoryId = $_POST['iCategoryId'];

	    $data['vTitle']              	= $_POST['vTitle'];
        $data['dtAddedDate']            = date("Y-m-d h:i:s");
        $data['eStatus']            	= $_POST['eStatus'];


	    if($_FILES['vImage']['name'] != "")
        {

            if($_FILES['vImage']['type'] == 'image/jpg'){
                $ext = ".jpg";
            } else if($_FILES['vImage']['type'] == 'image/jpeg'){
                $ext = ".jpeg";
            } else if($_FILES['vImage']['type'] == 'image/png'){
                $ext = ".png";
            }else if($_FILES['vImage']['type'] == 'image/webp'){
                $ext = ".webp";
            }
			
            $image = time().$ext;
			$tmp_name = $_FILES["vImage"]["tmp_name"];
            $base_path = $this->config->item('base_path');
		
             $directory = $base_path."/backend/image/category/";
		
            $save_path = base_url("/image/category/");
            
            mkdir($directory, 0777, TRUE);

            $p = $directory.$image;
			move_uploaded_file($tmp_name, $p);
        
            $data['vImage'] =  $save_path.'/'.$image;
        }
		
		if($iCategoryId=="")
		{
			$result   = $this->category_model->add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Category Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Category Not Added Please Try!';
			}
		}
		else
		{
			$where = array('iCategoryId'=>$iCategoryId);
			$result   = $this->category_model->update($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'category Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}

	// COLOR****************************************************
	public function color_add()
	{	
		
		$iColorId 	= $_POST['iColorId'] ?? '';

	    $data['vColor']              	= $_POST['vColor'];
        $data['dtAddedDate']            = date("Y-m-d h:i:s");
        $data['eStatus']            	= $_POST['eStatus'];

		if($iColorId!="")
		{
			$where = array('iColorId'=>$iColorId);
			$result   = $this->category_model->color_update($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'ColorName Updated  Successfully';
			}
		}
		else
		{
			$result   = $this->category_model->add_color($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Color Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Color Not Added Please Try!';
			}
		}

		echo json_encode($data);
		exit;

	}

	public function all_color_get()
	{
	    $iColorId = $_GET['iColorId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iColorId!="")
		{
			$result     		= $this->category_model->get_by_single_color($iColorId);

			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Color Listing Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->category_model->get_by_all_color();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Color Listing Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}

 		echo json_encode($data);
	}
	// ***************************************News Letter *****************************
	public function all_news_letter_get()
	{
	    $iNewsLetterId = $_GET['iNewsLetterId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iNewsLetterId!="")
		{
			$result     		= $this->category_model->get_by_single_news_letter($iNewsLetterId);

			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'News Letter Listing Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->category_model->get_by_all_news_letter();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'News Letter Listing Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}

 		echo json_encode($data);
	}

	public function News_letter_add()
	{	
		
		$iNewsLetterId = $_GET['iNewsLetterId'];

	    $data['vEmail']              	= $_POST['vEmail'];
        $data['dtAddedDate']            = date("Y-m-d h:i:s");
       

		if($iNewsLetterId!="")
		{
			$where    = array('iNewsLetterId'=>$iNewsLetterId);
			$result   = $this->category_model->news_update($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'News Letter  Email Updated Successfully';
			}
		}
		

		echo json_encode($data);
		exit;

	}

	// *******************************Fabric Module Admin**********************

	public function fabric_add()
	{	
		
		$iFabricId = $_GET['iFabricId'];

	    $data['vTitle']              	= $_POST['vTitle'];
	    $data['iHeaderId']            	= $_POST['iHeaderId'];
        $data['dtAddedDate']            = date("Y-m-d h:i:s");
        $data['eStatus']            	= $_POST['eStatus'];

		if($iFabricId!="")
		{
			$where = array('iFabricId'=>$iFabricId);
			$result   = $this->category_model->fabric_update($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Fabric Name Updated  Successfully';
			}
		}
		else
		{
			$result   = $this->category_model->add_fabric($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Fabric Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Fabric Not Added Please Try!';
			}
		}

		echo json_encode($data);
		exit;
	}

	public function all_fabric_get()
	{
	    $iFabricId = $_GET['iFabricId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iFabricId!="")
		{
			$result     		= $this->category_model->get_by_single_fabric($iFabricId);

			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Fabric Listing Successfully';
				$data['data']       = $result;
				$data['category']   = $this->category_model->get_by_all_header_menu();
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->category_model->get_by_all_fabric();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Fabric Listing Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}

 		echo json_encode($data);
	}

	public function delete_fabric()
	{
		$iFabricId  = $this->input->post('iFabricId');
		$id = $this->category_model->delete_by_fabricid($iFabricId);
		$data['Status']     = '0';
		$data['message']  	= 'FabricName Deleted Successfully';
		echo json_encode($data);
	}

	public function delete_color()
	{
		$iColorId  = $this->input->post('iColorId');
		$id = $this->category_model->delete_by_colorid($iColorId);
		$data['Status']     = '0';
		$data['message']  	= 'Color Deleted Successfully';
		echo json_encode($data);
	}
	
	// ************************************************************* COLOR END****************************************

    // ***********************************************SUB CATEGORY*********************************
	public function get_fabric_wise_subcategory()
	{
		$iHeaderId = $_GET['iHeaderId'];
		$iFabricId = $_GET['iFabricId'];
	
		if($_SERVER['REQUEST_METHOD']=='GET' && $iHeaderId!='' && $iFabricId!="")
		{
			$result = $this->category_model->get_by_all_subcategory_data($iHeaderId,$iFabricId);
			
			if(count($result) > 0){
				$data['Status']     = '1';
				$data['message']  	= 'Successfully';
				$data['data']       = $result;
				
			} else {
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		
		echo json_encode($data);
	}


	public function get_category()
	{
		$iHeaderId = $_GET['iHeaderId'];
		$iFabricId = $_GET['iFabricId'];
		
		if($_SERVER['REQUEST_METHOD']=='GET' && $iHeaderId!='' || $iFabricId!="")
		{
			$result     		= $this->category_model->get_by_all_subcategory_data($iHeaderId,$iFabricId);
			
			if(count($result) > 0){
				$data['Status']     = '1';
				$data['message']  	= 'Category Data Get Successfully';
				$data['data']       = $result;
			} else {
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		} else {
			$result     		= $this->category_model->get_by_all_header_menu();
			$color     			= $this->category_model->get_by_all_color();
			$fabric     	    = $this->category_model->get_by_all_fabric();
			$category     	    = $this->category_model->get_by_all_active_category();
			$Material     	    = $this->category_model->get_by_all_active_materials();
			$categoryArray = $this->category_model->get_by_all_active_category();


			if(count($result) > 0 || count($color) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Image Content Data Get Successfully';
				$data['data']       = $result;
				$data['color']      = $color;
				$data['fabric']     = $fabric;
				$data['category']   = $category;
				$data['material']   = $Material;
				$data['categoryArray'] = $categoryArray;

			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
 		echo json_encode($data);
	}
	public function get_header_manu()
	{
		$result     		= $this->category_model->get_by_all_header_menu();
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();	
		}
		echo json_encode($data);

	}
	public function subcategory_add()
	{	
		$iSubcategoryId = $_POST['iSubcategoryId'];

	    $data['vSubTitle']              	= $_POST['vTitle'];
	    $data['iHeaderId']              	= $_POST['iHeaderId'];
	    $data['iFabricId']              	= $_POST['iFabricId'];
        $data['dtAddedDate']            	= date("Y-m-d h:i:s");
        $data['eStatus']            		= $_POST['eStatus'];

		if($_FILES['vImage']['name'] != "")
        {
            if($_FILES['vImage']['type'] == 'image/jpg'){
                $ext = ".jpg";
            } else if($_FILES['vImage']['type'] == 'image/jpeg'){
                $ext = ".jpeg";
            } else if($_FILES['vImage']['type'] == 'image/png'){
                $ext = ".png";
            }else if($_FILES['vImage']['type'] == 'image/webp'){
                $ext = ".webp";
            }
			
            $image = time().$ext;
			$tmp_name = $_FILES["vImage"]["tmp_name"];
            $base_path = $this->config->item('base_path');
            $directory = $base_path."/backend/image/subcategory/";
            $save_path = base_url("/image/subcategory/");
            mkdir($directory, 0777, TRUE);

            $p = $directory.$image;
			move_uploaded_file($tmp_name, $p);
            $data['vImage'] =  $save_path.'/'.$image;
        }
		if($iSubcategoryId=="")
		{	
			$data['iHeaderId']              	= $_POST['iHeaderId'];
			$result   = $this->category_model->sub_add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'SubCategory Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'SubCategory Not Added Please Try!';
			}
		}
		else
		{

			$where = array('iSubcategoryId'=>$iSubcategoryId);

			$result   = $this->category_model->update_sub($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Sub Category Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}
	public function all_subcategory_get()
	{
	
		$iSubcategoryId = $_GET['iSubcategoryId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iSubcategoryId!="")
		{
			$result  = $this->category_model->get_by_sub_id($iSubcategoryId);
			$header_menu  = $this->category_model->get_by_all_header_menu();
			if(count($result) > 0)
			{
				$iHeaderId 			= $result->iHeaderId;
				$data['Status']     = '1';
				$data['message']  	= 'Sub Category Data Get Successfully';
				$data['data']       = $result;
				$data['fabric']     = $this->category_model->get_by_all_active_fabric();
				$data['HeaderMenuArray'] = $header_menu;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->category_model->get_by_all_subcategory();
			
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Sub Category Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
			
		}
 		echo json_encode($data);
	}
	public function delete_subcategory()
	{
		$iSubcategoryId  = $this->input->post('iSubcategoryId');
	
		$id = $this->category_model->delete_by_sub_id($iSubcategoryId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Sub Category Deleted Successfully';
			
		echo json_encode($data);
	}

	

	public function get_all_order()
	{
		$result  	  = $this->order_model->get_by_all_order();

		if($result)
		{
			$data = array();
			$data['Status'] 		= '0';
			$data['message']  		= 'Order List Successfully';
			$data['data']  		    = $result;
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['message']  		= 'Record Not Found!';
			$data['data']  		    = array();
		}

		echo json_encode($data);
		exit;
	}

	public function order_note_add()
	{	
	    $iOderIdId = $_GET['iOrderId'];
		$ordernote   = $this->order_model->get_by_id_note($iOderIdId);
		
		if($iOderIdId!="" && !empty($_POST['tDesc']))
		{
			$data['tDesc']                 = $_POST['tDesc'];
			$data['iOrderId']              = $iOderIdId;
			$data['dtAddedDate']           = date("Y-m-d h:i:s");

			if(count($ordernote)>0)
			{
				
				$where = array('iOrderId'=>$iOderIdId);
				$result   = $this->order_model->update_note($where,$data);
				if($result)
				{
					$data = array();
					$data['Status'] 		= '0';
					$data['message']  		= 'Note Updated Successfully';
				}
				else
				{
					$data = array();
					$data['Status'] 		= '1';
				}
			}
			else
			{
				$Lastid   = $this->order_model->add_order_note($data);
				if($Lastid)
				{
					$data = array();
					$data['Status'] 		= '0';
					$data['message']  		= 'Note Added Successfully';
				}
			}	
		}
		else
		{
			if(count($ordernote)>0)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Order Not Get Successfully';
				$data['data']			= $ordernote->tDesc;	
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Record Not Found';
				$data['data']			= array();
			}
		}

		echo json_encode($data);
		exit;

	}

	// **********************************************************VARIANTS********************************************
	public function all_variants_get()
	{
		$iVariantId = $_GET['iVariantId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iVariantId!="")
		{
			$result  = $this->variants_model->get_by_id($iVariantId);
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Variants Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->variants_model->get_by_all_variants();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Variants Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
 		echo json_encode($data);
	}
	public function variants_add()
	{	
		
		$iVariantId = $_POST['iVariantId'];

	    $data['vLabel']              	= $_POST['vLabel'];
        $data['eStatus']            	= $_POST['eStatus'];
		$data['dtAddedDate']            = date("Y-m-d h:i:s");

		if($iVariantId=="")
		{
			$result   = $this->variants_model->add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Variants Name Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Variants Name Not Added Please Try!';
			}
		}
		else
		{
			$where = array('iVariantId'=>$iVariantId);
			$result   = $this->variants_model->update($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Variants Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}
	public function delete_variants()
	{
		$iVariantId  = $this->input->post('iVariantId');
	
		$id = $this->variants_model->delete_by_id($iVariantId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Variants Name Deleted Successfully';
			
		echo json_encode($data);
	}
	// **********************************************************VARIANTS OPTION********************************************
	public function all_option_get()
	{
	
		$iOptionId = $_GET['iOptionId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iOptionId!="")
		{
			$result  = $this->variants_model->get_by_option_id($iOptionId);
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Sub Category Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->variants_model->get_by_all_variants_option();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Variants Option Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
 		echo json_encode($data);
	}
	public function get_variants()
	{
		$iCategoryId = $_GET['iCategoryId'];

		if($_SERVER['REQUEST_METHOD']=='GET' && $iCategoryId!='')
		{
			$result     		= $this->category_model->get_by_all_subcategory_data($iCategoryId);
			
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Category Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		else
		{
			$result     		= $this->variants_model->get_by_all_variants();
			if(count($result) > 0)
			{
				$data['Status']     = '1';
				$data['message']  	= 'Variants Data Get Successfully';
				$data['data']       = $result;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}

		
		
 		echo json_encode($data);
	}
	public function option_add()
	{	
		$iOptionId = $_POST['iOptionId'];

	   
		$data['vOptions']         	= $_POST['vOptions'];  
        $data['eStatus']     		= $_POST['eStatus'];
		$data['dtAddedDate']      	= date("Y-m-d h:i:s");

		if($iOptionId=="")
		{
			$data['iVariantId']       	= $_POST['iVariantId'];
			$result   = $this->variants_model->option_add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Variants Option Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Variants Option Not Added Please Try!';
			}
		}
		else
		{
			$where = array('iOptionId'=>$iOptionId);
			$result   = $this->variants_model->update_option($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']  		= 'Variants Option Updated  Successfully';
			}
		}
		
		echo json_encode($data);
		exit;

	}
	public function delete_option()
	{
		$iOptionId  = $this->input->post('iOptionId');
	
		$id = $this->variants_model->delete_by_option_id($iOptionId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Variants Option  Deleted Successfully';
			
		echo json_encode($data);
	}

	public function product_variyant_delete()
	{
		$iProduct_variantsId  = $this->input->post('iProduct_variantsId');
	
		$id = $this->variants_model->delete_by_variants_id($iProduct_variantsId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Variants Option  Deleted Successfully';
			
		echo json_encode($data);

	}
	// **********************************************************FRONT*****************************************
    
	public function banner()
	{
		$desktop     		= $this->content_model->get_by_all_banner_front();
		$mobile     		= $this->content_model->get_by_all_banner_front_mobile();
		$mini_banner     	= $this->content_model->get_by_all_mini_banner_front();
		$first_image     	= $this->content_model->get_by_all_first_image();
		$second_image       = $this->content_model->get_by_all_second_image();
		$third_image     	= $this->content_model->get_by_all_third_image();


		if(count($desktop) > 0 || count($mobile) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Banner Data Get Successfully';
			$data['data']       = $desktop;
			$data['mobile']     = $mobile;
			$data['mini_banner'] = $mini_banner;
			$data['first_image'] = $first_image;
			$data['second_image'] = $second_image;
			$data['third_image']  = $third_image;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);
	}

	// public function mini_banner()
	// {
	// 	$result     		= $this->content_model->get_by_all_mini_banner_front();
	// 	if(count($result) > 0)
	// 	{
	// 		$data['Status']     = '1';
	// 		$data['message']  	= 'Banner Data Get Successfully';
	// 		$data['data']       = $result;
	// 	}
	// 	else
	// 	{
	// 		$data['Status']     = '0';
	// 		$data['message']  	= 'Data Not Found';
	// 		$data['data']     	= array();
	// 	}
		
 	// 	echo json_encode($data);
	// }
	// public function first_image()
	// {
	// 	$result     		= $this->content_model->get_by_all_first_image();
	// 	if(count($result) > 0)
	// 	{
	// 		$data['Status']     = '1';
	// 		$data['message']  	= 'Image Data Get Successfully';
	// 		$data['data']       = $result;
	// 	}
	// 	else
	// 	{
	// 		$data['Status']     = '0';
	// 		$data['message']  	= 'Data Not Found';
	// 		$data['data']     	= array();
	// 	}
		
 	// 	echo json_encode($data);
	// }
	// public function second_image()
	// {
	// 	$result     		= $this->content_model->get_by_all_second_image();
	// 	if(count($result) > 0)
	// 	{
	// 		$data['Status']     = '1';
	// 		$data['message']  	= 'Image Data Get Successfully';
	// 		$data['data']       = $result;
	// 	}
	// 	else
	// 	{
	// 		$data['Status']     = '0';
	// 		$data['message']  	= 'Data Not Found';
	// 		$data['data']     	= array();
	// 	}
		
 	// 	echo json_encode($data);
	// }
	// public function third_image()
	// {
	// 	$result     		= $this->content_model->get_by_all_third_image();
	// 	if(count($result) > 0)
	// 	{
	// 		$data['Status']     = '1';
	// 		$data['message']  	= 'Image Data Get Successfully';
	// 		$data['data']       = $result;
	// 	}
	// 	else
	// 	{
	// 		$data['Status']     = '0';
	// 		$data['message']  	= 'Data Not Found';
	// 		$data['data']     	= array();
	// 	}
		
 	// 	echo json_encode($data);
	// }
	public function homepage_product()
	{
		$result     		= $this->product_model->get_by_homepage_product();
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Product Data Get Successfully';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);
	}
	public function main_product_listing()
	{
		$result     		= $this->product_model->get_by_main_product();
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Product Data Get Successfully';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);
	}
	public function product_listing_image()
	{
	    $result     		= $this->content_model->get_by_product_listing_image();
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Image Data Get Successfully';
			$data['data']       = $result;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);	
	}
	public function header()
	{
	   $result     		= $this->category_model->get_by_front_category();
	   
		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Image Data Get Successfully';
			$data['data']       = $result;
			$data['fabric']     = $this->category_model->get_by_all_fabric_asc();
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data); 
	}

	public function product_listing()
	{	
		$json 			= file_get_contents('php://input');
        $postData 		= json_decode($json, true);

		$iSubCategoryId = $postData['iSubCategoryId'] ?  $postData['iSubCategoryId'] : '';
		$vPrice 		= $postData['Price'] ?  $postData['Price'] : '';
		
		$critearea = array();
		$critearea['iSubcategoryId']  	= $iSubCategoryId;
		$critearea['vPrice'] 	= ($postData['Price'] !== 'ALL') ? $vPrice : null;
		$critearea['iColorId'] 	= ($postData['iColorId'] !== 'ALL') ? $postData['iColorId'] : null;			
		$critearea['OrderBy']    = $postData['SortByFilter'] ?  $postData['SortByFilter'] : 'DESC';
		$critearea['iCategoryId']    = $postData['iCategoryId'] ?  $postData['iCategoryId'] : '';

		$result   = $this->product_model->get_by_all_product_listing($critearea);

		$countArray = array();
		foreach($result as $value)
		{	
			$imagecount = $value->image;
			if(count($imagecount) > 0)
			{
				array_push($countArray,$value->iProductId);
			} 
		}

		if($result)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Product Data Get Successfully';
			$data['data']       = $result;
			$data['product_count'] = count($countArray);
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);
	}

	public function single_product_get()
	{
		$json 			= file_get_contents('php://input');
        $postData 		= json_decode($json, true);
		
		$iProductId = $postData['iProductId']? $postData['iProductId'] : '';
		$vPrice     = $postData['vPrice']? $postData['vPrice'] : '';
		$result     		= $this->product_model->get_by_product_id_with_image($iProductId,$vPrice);

		$iCategoryId        = $result[0]->iCategoryId;
		$Slider     		= $this->product_model->get_by_category_wise_product($iCategoryId);

		if(count($result) > 0)
		{
			$data['Status']     = '1';
			$data['message']  	= 'Single Data Get Successfully';
			$data['data']       = $result;
			$data['Slider']     = $Slider;
		}
		else
		{
			$data['Status']     = '0';
			$data['message']  	= 'Data Not Found';
			$data['data']     	= array();
		}
		
 		echo json_encode($data);
	}
	public function product_listingpage_data_show()
	{
		$iImageId = $_POST['iImageId'];
		$type = $_POST['type'];

		if(!empty($iImageId))
		{	
			if($type=='Added')
			{
				$data['vType'] = '0'; 
			}
			else
			{
				$data['vType'] = '1';
			}
			
			$where = array('iImageId'=>$iImageId);
		
			$result   = $this->product_model->update_product_image($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
				if($type=='Added')
				{
					$data['message']  		= 'Product Front Side Remove Successfully';
				}
				else
				{
					$data['message']  		= 'Product Front Side Added Successfully';
				}
			}
			
			echo json_encode($data);
			exit;
		}
		
	}
	// *********************************Register******************************
	public function register()
	{	
		$vEmail = $_POST['vEmail'];

		$result   = $this->register_model->get_by_email_guest($vEmail);
		if(count($result)>0)
		{
			$iUserId = $result->iUserId;
			
			$data['vFirstName']              	= $_POST['vFirstName'];
			$data['vLastName']       			= $_POST['vLastName'];
			$data['vPassword']           		= md5($_POST['vPassword']);
			$data['dtAddedDate']            	= date("Y-m-d h:i:s");
			$data['dtUpdatedDate']            	= date("Y-m-d h:i:s");
			$data['eStatus']            		= 'Active';
			$data['eType']            			= 'User';

			$where    = array('iUserId'=>$iUserId);
			$result   = $this->register_model->update($where,$data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
			}
		}
		else
		{
		
			$data['vFirstName']              	= $_POST['vFirstName'];
			$data['vLastName']       			= $_POST['vLastName'];
			$data['vEmail']           			= $vEmail;
			$data['vPassword']           		= md5($_POST['vPassword']);
			$data['dtAddedDate']            	= date("Y-m-d h:i:s");
			$data['dtUpdatedDate']            	= date("Y-m-d h:i:s");
			$data['eStatus']            		= 'Active';
			
			$result   = $this->register_model->add($data);
			if($result)
			{
				$data = array();
				$data['Status'] 		= '0';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
			}
		}
		echo json_encode($data);
		exit;
	}

	public function email_varify()
	{	
        $vEmail           			= $_POST['vEmail'];
		$result   = $this->register_model->get_by_email($vEmail);

		if($result == '0')
		{
			$data = array();
			$data['Status'] 		= '0';
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			
		}
		
		echo json_encode($data);
		exit;

	}

	public function login_user()
	{	
		$vGoogleId = $_POST['vGoogleId'];
		if(!empty($vGoogleId))
		{
			$email_verify =  $this->register_model->get_by_email_verify($_POST['vEmail']);
			
			if(count($email_verify) == 0)
			{
				$vCookie 							= $_POST['vCookie'];
				$data['vFirstName']              	= $_POST['vFirstName'];
				$data['vLastName']       			= $_POST['vLastName'];
				$data['vEmail']           			= $_POST['vEmail'];
				$data['vGoogleId']				    = $_POST['vGoogleId'];
				$data['dtAddedDate']            	= date("Y-m-d h:i:s");
				$data['dtUpdatedDate']            	= date("Y-m-d h:i:s");
				$data['eStatus']            		= 'Active';
			
				$result   = $this->register_model->add($data);
				if($result)
				{
					$vFirstName = $_POST['vFirstName'];
					$vLastName 	= $_POST['vLastName'];
					$sortname = $vFirstName[0]."".$vLastName[0];

					if(!empty($vCookie))
					{
						$where = array('vCookie'=>$vCookie);
						$data_update['vCookie'] 	= '';
						$data_update['iUserId']		= $result;
						$this->register_model->update_addtocart($where,$data_update);
					}

					$data = array();
					$data['Status'] 		= '0';
					$data['message'] 		= 'Google Account Login Successfully';
					$data['iUserId']  		= $result;
					$data['sortname']		= strtoupper($sortname);
					$data['vGoogleId']		= $_POST['vGoogleId'];
				}
			}
			else
			{
					$vFirstName = $email_verify->vFirstName;
					$vLastName 	= $email_verify->vLastName;
					$vGoogleId 	= $email_verify->vGoogleId;
					$iUserId    = $email_verify->iUserId;

					$sortname 	= $vFirstName[0]."".$vLastName[0];
					$vCookie   	= $_POST['vCookie'];
					if(!empty($vCookie))
					{
						$where = array('vCookie'=>$vCookie);
						$data_update['vCookie'] 	= '';
						$data_update['iUserId']		= $iUserId;
						$this->register_model->update_addtocart($where,$data_update);
					}

					if(empty($vGoogleId))
					{
						$where = array('iUserId'=>$iUserId);
						$data_update_user['vGoogleId'] 	= $_POST['vGoogleId'];
						$this->register_model->update($where,$data_update_user);
					}

					$data = array();
					$data['Status'] 		= '0';
					$data['message'] 		= 'Google Account Login Successfully';
					$data['iUserId']  		= $iUserId;
					$data['sortname']		= strtoupper($sortname);
					$data['vGoogleId']		= $_POST['vGoogleId'];
			}

		}
		else
		{
			$vEmail           			= $_POST['vEmail'];
			$vPassword           		= md5($_POST['vPassword']);
			$vCookie           			= $_POST['vCookie'];
		
			$result   = $this->register_model->get_by_email_password($vEmail,$vPassword);

			$vFirstName = $result->vFirstName;
			$vLastName = $result->vLastName;
			
			$sortname = $vFirstName[0]."".$vLastName[0];
			
				
			if(count($result) > 0)
			{
				if($result->eStatus=='Active')
				{
					if(!empty($vCookie))
					{
						$where = array('vCookie'=>$vCookie);
						$data_update['vCookie'] 	= '';
						$data_update['iUserId']		= $result->iUserId;
						$this->register_model->update_addtocart($where,$data_update);
					}

					$data = array();
					$data['Status'] 		= '0';
					$data['message'] 		= 'Login Successfully';
					$data['data']  			= $result;
					$data['sortname']		= strtoupper($sortname);
				}
				else
				{
					$data = array();
					$data['Status'] 		= '2';
					$data['message'] 		= 'Email Address Not Activated!';
				}
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message'] 		= 'Email Password Incorrect!';
			}
		}


		echo json_encode($data);
		exit;

	}

	public function addtocart()
	{
		$vPrice 	= $_POST['vPrice'];
		$vQty    	= $_POST['vQty'];
		$vTotal   	= $vPrice * $vQty;
		$iUserId   	= $_POST['iUserId'];
		$size    	= $_POST['vSize'];
		$iProductId = $_POST['iProductId'];
		
		$iOptionId   = $this->order_model->get_by_optionid($size);

 	    $data['iProductId']              	= $iProductId;
        $data['vProductName']       		= $_POST['vProductName'];
        $data['vPrice']           			= $_POST['vPrice'];
		$data['vTotal']						= $vTotal;
		if(!empty($iUserId) && $iUserId!='null'){
			$data['iUserId'] 		       = $iUserId;
		}else{
			$vCookie 					   = $_POST['vCookie'];
			$data['vCookie'] 			   = $vCookie;
		}
        $data['vImage']           			= $_POST['vImage'];
        $data['vQty']            			= $_POST['vQty'];
		$data['vSize']            			= $_POST['vSize'];
		$data['iOptionId']            	    = $iOptionId;
		$data['dtAddedDate']            	= date("Y-m-d h:i:s");
		
		$verify   = $this->register_model->add_to_cart_verify_product($iProductId,$size,$iUserId,$vCookie);
		
		if(count($verify) > 0)
		{
			$result = '';
			$allvQty = $vQty + $verify->vQty;
			$where = array('iAddtocartId'=>$verify->iAddtocartId);
			$data_update['vQty']		= $allvQty;
			$data_update['vTotal']		= $allvQty * $verify->vPrice;
			$result = $this->register_model->update_addtocart($where,$data_update);
		}else{	
			$result = '';
			$result   = $this->register_model->add_to_cart($data);
		}
	
		if($result)
		{	
			// ********************ADDTOCART DATA GET PROCCESS IN CART TO DISPLAY****************
			$cookiedata = '';
			if($iUserId=='null')
			{
				$cookiedata = $_POST['vCookie'];
			}
			else if(!empty($iUserId))
			{
				$iUserId = $iUserId;
			}
			
			$addtocart = $this->register_model->get_by_all_addtocart_data($cookiedata,$iUserId);
			$Subtotal = array();
			foreach($addtocart as $key => $value)
			{	
				array_push($Subtotal,$value->vTotal);
			}
			// ********************ADDTOCART DATA GET PROCCESS IN CART TO DISPLAY END ****************
			$data = array();
			$data['Status'] 		= '0';
			$data['data']           = $addtocart;
			$data['subtotal']		= array_sum($Subtotal);
		}else{
			$data = array();
			$data['Status'] 		= '1';
		}
		echo json_encode($data);
		exit;
	}

	public function addtocartdataget()
	{
		$useridcookie   	= explode("@@",$_GET['cookie']);
		$cookie           	= $useridcookie[0];
		$iUserId           	= $useridcookie[1];
		$guestCheckoutId    ='';

		$cookiedata  				= "";
		if($iUserId=='null')
		{
			$cookiedata = $cookie;
		}

		if(!empty($iUserId) && $iUserId!='null')
		{
			$iUserId = $iUserId;
		}
		

		$result   		= $this->register_model->get_by_all_addtocart_data($cookiedata,$iUserId);
		$checkoutdata   = $this->register_model->get_by_all_checkout_data_user_wise($iUserId);

		if(count($result)>0)
		{
			$Subtotal = array();
			foreach($result as $key => $value)
			{	
				array_push($Subtotal,$value->vTotal);
			}
			$data = array();
			$data['Status'] 		= '1';
			$data['data'] 			= $result;
			$data['subtotal']		= array_sum($Subtotal);
			$data['checkoutdata']   = $checkoutdata;
			
		}
		else
		{
			$data = array();
			$data['Status'] 		= '0';
		}
		$data['wishlist']		= $this->product_model->get_by_wishlist_data($iUserId);
		$data['checkoutdata']   = $checkoutdata;
		echo json_encode($data);
		exit;
	}

	public function addtocartdelete()
	{	
		$iAddtocartId  	= $this->input->post('iAddtocartId');
		$vCookie  		= $this->input->post('vCookie');
		$iUserId  		= $this->input->post('iUserId');



		$where = array('iAddtocartId'=>$iAddtocartId);
		$data_update['iDeleteId'] 	= '1';
		
		$id = $this->register_model->update_addtocart($where,$data_update);
		// $id = $this->register_model->delete_by_addtocart_product($iAddtocartId);
		
		$cookiedata		= '';
		if(empty($iUserId) || $iUserId=="null")
		{
			$cookiedata = $vCookie;
		}
		else if(!empty($iUserId))
		{
			$iUserId = $iUserId;
		}
		sleep(1);

		$addtocart = $this->register_model->get_by_all_addtocart_data($cookiedata,$iUserId);
		$Subtotal = array();
		foreach($addtocart as $key => $value)
		{	
			array_push($Subtotal,$value->vTotal);
		}

		if($id)
		{
			$data['Status']     = '0';
			$data['data']		= $addtocart;
			$data['subtotal']   = array_sum($Subtotal);
		}
		else
		{
			$data['Status']     = '1';	
		}
		echo json_encode($data);
	}

	public function reset_password_email_check()
	{	
		ini_set("mail.log", "/tmp/mail.log");
    	ini_set("mail.add_x_header", TRUE);
    	
    	$code = rand(10000,99999);

        $vEmail           			= $_POST['vEmail'];
		$result   = $this->register_model->get_by_email($vEmail);

		if(count($result)>0)
		{
			$to         = $vEmail;
			$subject    = $code."   is your Pramesh";
			$Templet    = '<html>
						<body marginheight="0" marginwidth="0" leftmargin="0" topmargin="0" bgcolor="#e9e1e1">
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td bgcolor="#e9e1e1" align="center">
									<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
										<tr>
											<td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td  align="center" style="padding: 0px 10px 0px 10px;">
									<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
										<tr>
											<td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: "Lato", Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
												<h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src="https://pramesh.justcodenow.com/Images/logo.png" width="125" height="120" style="display: block; border: 0px;" />
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td bgcolor="#e1e1e1" align="center" style="padding: 0px 10px 0px 10px;">
									<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
										<tr>
											<td bgcolor="#ffffff" align="left">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
															<table border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td><h3>Hi,</h3></td>
															</tr>
																<tr>
																<td align="center"><h3>Please enter this verification code in the Website:</td>
																</tr>
																<tr>
																	<td align="center" style="border-radius: 3px;"><a href="#" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #100202; text-decoration: none; color: block; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #1746e0; display: inline-block;">'.$code.'</a></td>
																</tr>
																<tr>
																	<td align="center" style="padding:15px;margin-top:5px;"><h4>Verification code expires in 30 minutes</h4></td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr> 
									</table>
								</td>
							</tr>
						</table></body></html>';
			
			$headers  = "From:   mvora@justcodenow.com";
			$headers .= ''."\r\n";
			$headers .="Content-Type: text/html;\n\tcharset=\"iso-8859-1\"\n";

			
			if (mail($to,$subject,$Templet,$headers))
            {
                $name = "Message accepted";
            }
            else
            {
                $name = "Error: Message not accepted";
            }
			
			sleep(4);

			$where = array('vEmail'=>$vEmail);
			$data_update['vOTP'] 	= $code;
			$data_update['dtOTPDate'] = date("Y-m-d h:i:s");
			$this->register_model->update($where,$data_update);

			$data = array();
			$data['Status'] 		= '0';
			$data['message']		= $name;
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['message']		= 'Email Address Does Not Exist';	
		}
		
		echo json_encode($data);
		exit;
	}

	public function otp_verify()
	{	
        $vOTP           			= $_POST['vOTP'];
		$result   = $this->register_model->get_by_otp($vOTP);

		if(count($result)>0)
		{
			$otpdate 	= $result->dtOTPDate;
		
			$vEmail  	= $result->vEmail;
			$date       = strtotime($otpdate);
			$date       = strtotime("+30 minute", $date);
			$date_otp   = date('Y-m-d H:i:s', $date);

			$current_time = date("Y-m-d h:i:s"); 
			

			if($date_otp > $current_time)
            {	
				$where = array('vEmail'=>$vEmail);
				$data_update['vOTP'] 		= '';
				$data_update['dtOTPDate'] 	= '0000-00-00 00:00:00';
				$this->register_model->update($where,$data_update);

				$data = array();
				$data['Status'] 		= '0';
				$data['iUserId'] 		= $result->iUserId;
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']		= 'OTP code has expired!';	
			}
	
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['message']		= 'OTP Does Not Exist';	
		}
		
		echo json_encode($data);
		exit;

	}

	public function password_update()
	{	
        $iUserId           			= $_POST['UserId'];
        $vPassword           		= md5($_POST['vPassword']);
		
		if(!empty($iUserId) && !empty($vPassword))
		{
			$where = array('iUserId' => $iUserId);
			$data_update['vPassword'] = $vPassword;
			$data_update['eType'] 	  = 'User';
			$data_update['eStatus']   = 'Active';
			$id = $this->register_model->update_password($where,$data_update);
			
			$data = array();
			$data['Status'] 		= '0';
			$data['message']		= 'Password Updated Successfully';	
			
		}
	
		echo json_encode($data);
		exit;

	}

	public function checkoutdata()
	{
	
		$vCookieId	= $_POST['cookie'];
		$iUserId	= $_POST['iUserId'];
		$bill_Address_check	= $_POST['bill_Address_check'];
		$GuestcheckoutId	= $_POST['GuestcheckoutId'];

		$cookiedata  				= "";
		if($iUserId=='null'){
			$cookiedata = $vCookieId;
		}
		if(!empty($iUserId) && $iUserId!='null')
		{
			$iUserId = $iUserId;
		}
		
		$iProductId = array();
		$iOptionId  = array();
		if(!empty($_POST['vEmail']))
		{
			$userEmailVerify = $this->register_model->get_by_email_verify($_POST['vEmail']);
			
			if(count($userEmailVerify)==0){
				$iUserIdLast='';
				$data_register['vFirstName']              	= $_POST['vFirstName'];
				$data_register['vLastName']       			= $_POST['vLastName'];
				$data_register['vEmail']           			= $_POST['vEmail'];
				$data_register['dtAddedDate']            	= date("Y-m-d h:i:s");
				$data_register['dtUpdatedDate']            	= date("Y-m-d h:i:s");
				$data_register['eStatus']            		= 'Inactive';
				$data_register['eType']            			= 'Guest';
				$iUserIdLast   								= $this->register_model->add($data_register);

			} else {
				// $iUserIdLast='';
				// $data_user['eType'] 	= 'User';	
				// $data_user['eStatus'] 	= 'Active';	
				// $where = array('iUserId'=>$userEmailVerify->iUserId);
				// $this->register_model->update($where,$data_user);
				$iUserIdLast = $userEmailVerify->iUserId;
			}
			//Addtocard table cookie to replace userid
			$data_addtocart['iUserId'] 	=  $iUserIdLast;	
			$data_addtocart['vCookie'] 	=  null;	
			$where = array('vCookie'=>$vCookieId);
			$this->order_model->update_addtocart_data($where,$data_addtocart);
			sleep(1);
			// **********addtocart table data get in save to checkout table?
			$addtocart   	= $this->register_model->get_by_all_addtocart_data("",$iUserIdLast);

			foreach($addtocart as $key =>$value){
				$OptionId  = $value->iOptionId->iOptionId;
				array_push($iProductId,$value->iProductId);
				array_push($iOptionId,$OptionId?$OptionId:0);
			}
		}
		
		$data['iUserId']     			= $iUserId?$iUserId:$iUserIdLast;
		$data['iProductId']     		= implode(',',$iProductId);
		$data['iOptionId']     		    = implode(',',$iOptionId);
        $data['vFirstName']       		= $_POST['vFirstName'];
        $data['vLastName']              = $_POST['vLastName'];
        $data['vPhone']                 = $_POST['vPhone'];
        $data['tAddress']             	= $_POST['tAddress'];
        $data['vCity']                	= $_POST['vCity'];
        $data['vState']                	= $_POST['vState'];
        $data['vCountry']              	= $_POST['vCountry'];
        $data['vZipcode']              	= $_POST['vZipcode'];
		$data['tOrderComment']          = $_POST['tOrderComment'];
		$data['dtAddedDate']            = date("Y-m-d h:i:s");
	

		if($bill_Address_check==='0')
		{
			$data['vBillingFirstName']      	= $_POST['vBillingFirstName'];
			$data['vBillingLastName']           = $_POST['vBillingLastName'];
			$data['vBillingPhone']           	= $_POST['vBillingPhone'];
			$data['vBillingAddress']            = $_POST['vBillingAddress'];
			$data['vBillingCity']              	= $_POST['vBillingCity'];
			$data['vBillingState']              = $_POST['vBillingState'];
			$data['vBillingCountry']            = $_POST['vBillingCountry'];
        	$data['vBillingZipcode']            = $_POST['vBillingZipcode'];
		}
		else
		{
			$data['vBillingFirstName']      	= $_POST['vFirstName'];
			$data['vBillingLastName']           = $_POST['vLastName'];
			$data['vBillingPhone']           	= $_POST['vPhone'];
			$data['vBillingAddress']            = $_POST['tAddress'];
			$data['vBillingCity']              	= $_POST['vCity'];
			$data['vBillingState']              = $_POST['vState'];
			$data['vBillingCountry']            = $_POST['vCountry'];
        	$data['vBillingZipcode']            = $_POST['vZipcode'];
		}	

		$data_update['vQty'] 	= $qty;
		$data_update['vTotal'] 	= $result->vPrice * $qty;
		$checkoutdata   = $this->register_model->get_by_all_checkout_data($GuestcheckoutId,$iUserIdLast);
	
		if(count($checkoutdata)>0)
		{
			$allProductId 	= explode(",",$checkoutdata[0]->iProductId);
			$allOptionId 	= explode(",",$checkoutdata[0]->iOptionId);

			$iProductID = [$data['iProductId']];
			$iOptionId = [$data['iOptionId']];

			for($j=0;$j<count($allProductId);$j++)
			{
				array_push($iProductID,$allProductId[$j]);
				array_push($iOptionId,$allOptionId[$j]?$allOptionId[$j]:0);
			}
			$data['iProductId']  = implode(",",$iProductID);
			$data['iOptionId']   = implode(",",$iOptionId);
		  
			$where = array('iCheckoutDetailId'=>$checkoutdata[0]->iCheckoutDetailId);
		
			$id = $this->register_model->update_checkout($where,$data);
			if($id)
			{
				$data_json = array();
				$data_json['Status'] 		 = '0';
				$data_json['message']        = 'Shipping Address Updated Successfully';
				$data_json['iCheckoutDetailId'] = $checkoutdata[0]->iCheckoutDetailId;
			}else{
				$data_json = array();
				$data_json['Status'] 		= '1';
			}	
				
		}
		else
		{	
			$last_insert_id   = $this->product_model->add_checkoutdata($data);
			if($last_insert_id)
			{	
				$data_json = array();
				$data_json['Status'] 		 = '0';
				$data_json['message']        = 'Shipping Address Successfully Added';
				$data_json['iCheckoutDetailId'] = $last_insert_id;
			}
			else
			{
				$data_json = array();
				$data_json['Status'] 		= '1';
			}
		}

		echo json_encode($data_json);
		exit;
	}

	public function paymentsuccessproccess()
	{
		$iPaymentId 		= $this->input->post('iPaymentId');
		$iCheckoutDetailId 	= $this->input->post('iCheckoutDetailId');

		$result  			= $this->order_model->get_by_id_checkout($iCheckoutDetailId);
		
		$iUserId 			= $result->iUserId;
		$iProductId			= $result->iProductId;
		$iOptionId			= $result->iOptionId;
		$addtocartdata  	= $this->order_model->get_by_id_payment($iUserId,$iProductId,$iOptionId);

		foreach($addtocartdata as $key => $value)
		{
			$total_qty 		= '';
			$sell_qty  		= '';
			$iOptionId 		= '';
			$iAddtocartId 	= '';

		    $total_qty = $value->product->vQty;
		    $sell_qty  = $value->vQty;
			$iOptionId = $value->iOptionId;
			$iUserId   = $value->iUserId;
			if($total_qty >= $sell_qty)
			{
				$avalable_product = $total_qty - $sell_qty;
			}
			
			$iAddtocartId = $value->iAddtocartId;

			$iProduct_variantsId  = $value->product->iProduct_variantsId;
			
			$where = array();
			if(!empty($iProduct_variantsId) && !empty($iOptionId))
			{
				$where = array('iProduct_variantsId' => $iProduct_variantsId , 'iOptionId' => $iOptionId);
			}
			else
			{
				$where = array('iProduct_variantsId' => $iProduct_variantsId);
			}
			
			$data = array();
			$data['vQty'] 	= $avalable_product;
			
			$qty_update 	= $this->order_model->update_product_variant_quntity($where,$data);
			
			sleep(1);
			$where = array('iAddtocartId' => $iAddtocartId);
			$data_update_addtocart['eType']= '1';
			
			$this->register_model->update_addtocart($where,$data_update_addtocart);
		}
	
		$data = array();
		$data['Status'] 		= '0';
		$data['message']		= 'Product Quntity Updated Successfully';
			
		echo json_encode($data);
		exit;

	}

	public function order()
	{	
		$iProductId = $_POST['iProductId'];
		$vOrderQty  = $_POST['vOrderQty'];

		$result  	  = $this->product_model->get_by_id($iProductId);

		if(count($result) > 0)
		{
			$ProductQty = $result->vQty;

			if($ProductQty >= $vOrderQty)
			{
				$UpdateQty 				= $ProductQty - $vOrderQty;
				$Product_upd['vQty'] 	= $UpdateQty;
				$where = array('iProductId'=>$iProductId);
				$product_update   = $this->product_model->update($where,$Product_upd);

				$data['iProductId']              	= $iProductId;
				$data['vTransactionId']             = $_POST['vTransactionId'];
				$data['iOrderUserId']       	   	= $_POST['iOrderUserId'];
				$data['vOrderQty']       	  		= $vOrderQty;
				$data['vOrderAmount']       	   	= $_POST['vOrderAmount'];
				$data['tOrderShipAddress1']       	= $_POST['tOrderShipAddress1'];
				$data['tOrderShipAddress2']       	= $_POST['tOrderShipAddress2'];
				$data['vOrderState']       	    	= $_POST['vOrderState'];
				$data['vOrderCity']       	    	= $_POST['vOrderCity'];
				$data['vOrderZip']       	   	 	= $_POST['vOrderZip'];
				$data['vOrderCountry']            	= $_POST['vOrderCountry'];
				$data['vOrderPhone']            	= $_POST['vOrderPhone'];
				$data['vOrderEmail']            	= $_POST['vOrderEmail'];
				$data['dtAddedDate']            	= date("Y-m-d h:i:s");

				$Product_add   = $this->order_model->add($data);
	
				if($Product_add)
				{
					$data = array();
					$data['Status'] 		= '0';
					$data['message']  		= 'Product Created Successfully';
				}
				else
				{
					$data = array();
					$data['Status'] 		= '1';
					$data['message']  		= 'Product Not Create Please Try!';
				}

			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['message']  		= 'Stock Not Available';
			}
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['message']  		= 'Stock Not Available';
		}

		echo json_encode($data);
		exit;
	

	}
	
	public function stories()
	{
		$result   = $this->stories_model->get_by_all_data();
		if($result)
		{
			$data = array();
			$data['Status'] 		= '0';
			$data['message'] 		= 'Stories Data Get Successfully';
			$data['data'] 		    = $result;
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
		}
		echo json_encode($data);
		exit;
	}

	public function firstpage_image_add()
	{
		$iStoriesId 						= $_POST['iStoriesId'];
		$eType 						= $_POST['eType'];
	
		$length = strlen($_FILES['vImage']['name'][0]);

		if($_FILES['vImage']['name'] != "" && $length > 0)
		{
			for($i=0; $i<count($_FILES['vImage']['name']); $i++)
			{
				if($_FILES['vImage']['type'][$i] == 'image/jpg'){
					$ext = ".jpg";
				} else if($_FILES['vImage']['type'][$i] == 'image/jpeg'){
					$ext = ".jpeg";
				} else if($_FILES['vImage']['type'][$i] == 'image/png'){
					$ext = ".png";
				}else if($_FILES['vImage']['type'][$i] == 'image/gif'){
					$ext = ".gif";
				}else if($_FILES['vImage']['type'][$i] == 'image/webp'){
					$ext = ".webp";
				}
				
				$time = time().'_'.$i;
				$image = $time.$ext;
				
				$tmp_name 	= $_FILES["vImage"]["tmp_name"][$i];
				$base_path 	= $this->config->item('base_path');
				$directory 	= $base_path."/backend/image/Stories/firstpage/";

				$save_path 	= base_url("/image/Stories/firstpage/");
				
				mkdir($directory, 0777, TRUE);
				$p = $directory.$image;
				move_uploaded_file($tmp_name, $p);
				$path = $save_path.'/'.$image;

				$datas['iStoriesId'] = $iStoriesId;
				$datas['vImage']     = $path;
				$datas['eType']     = $eType;

				$imageid = $this->stories_model->firstpage_image_add($datas);
			}

			$data = array();
			$data['Status'] 		= '0';
			$data['message']  		= 'FirstPage Image Added Successfully';
			echo json_encode($data);
			exit;	
		}else{
			$data = array();
			$data['Status'] 		= '1';
			$data['message']  		= 'Please Select Image';
			
			echo json_encode($data);
			exit;
		}
	}


	public function firstpage_all_image_get()
	{
	    $iStoriesId 						= $_GET['iStoriesId'];
		$result = $this->stories_model->get_all_image_firstpage($iStoriesId);

		if(count($result)>0)
		{
			$data = array();
			$data['Status'] 		= '0';
			$data['data']			= $result;
			$data['message']  		= 'FirstPage Image Added Successfully';
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['message']  		= 'Record Not  Found!';
		}
	    echo json_encode($data);
	    exit;	
	}
	public function first_image_delete()
	{
		$iFirstPageStoriesId  = $this->input->post('iFirstPageStoriesId');
	
		$id = $this->stories_model->delete_by_first_image_id($iFirstPageStoriesId);
		
		$data['Status']     = '0';
		$data['message']  	= 'Image Deleted Successfully';
		echo json_encode($data);	
	}

	public function viewcartUpdateData()
	{	
		$iAddtocartId  	= $this->input->post('iAddtocartId');
		$action  		= $this->input->post('action');
		$iUserId        = $_POST['iUserId'];
		$vCookie        = $_POST['vCookie'];
		
	
		$result = $this->register_model->get_by_single_cartdata($iAddtocartId);

	
		if($action=='inc' && $result->vQty < 10)
		{
			$qty = $result->vQty + 1;
			$where = array('iAddtocartId'=>$iAddtocartId);
			$data_update['vQty'] 	= $qty;
			$data_update['vTotal'] 	= $result->vPrice * $qty;

			$id = $this->register_model->update_addtocart($where,$data_update);
		
			// sleep(5);
			if($id)
			{
				
				$addtocart = $this->register_model->get_by_all_addtocart_data($vCookie,$iUserId);

	
				$Subtotal = array();
				foreach($addtocart as $key => $value)
				{	
					array_push($Subtotal,$value->vTotal);
				}
				$data['Status']     = '0';
				$data['data']		= $this->register_model->get_by_all_addtocart_data($cookiedata,$iUserId);
				$data['subtotal']   = array_sum($Subtotal);
			}
			else
			{
				$data['Status']     = '1';	
			}
			echo json_encode($data);
		}
		else if($action=='des')
		{
			if($result->vQty > 1)
			{
				$qty = $result->vQty - 1;
				$where = array('iAddtocartId'=>$iAddtocartId);
				$data_update['vQty'] = $qty;
				$data_update['vTotal'] 	= $result->vPrice * $qty;

				$id = $this->register_model->update_addtocart($where,$data_update);
				// sleep(5);
				if($id)
				{
					$addtocart = $this->register_model->get_by_all_addtocart_data($vCookie,$iUserId);
					$Subtotal = array();
					foreach($addtocart as $key => $value)
					{	
						array_push($Subtotal,$value->vTotal);
					}

					$data['Status']     = '0';
					$data['data']		= $this->register_model->get_by_all_addtocart_data($cookiedata,$iUserId);
					$data['subtotal']   = array_sum($Subtotal);
				}
				else
				{
					$data['Status']     = '1';	
				}
				echo json_encode($data);
			}
		}
		// else
		// {
		// 	$data['Status']     = '1';	
		// }

	
	}

	public function search()
	{
		$keyword  = $_POST['keyword'];
		$result   = $this->product_model->search($keyword);

		$vColor 	= array();
		$category 	= array();

		foreach($result as $key => $value)
		{
			if(!empty($value->color->vColor))
			{	
				if (!in_array($value->color->vColor, $vColor))
				{
					array_push($vColor,$value->color->vColor);
				}	
			}
		   
			if(!empty($value->category->vSubTitle))
			{
				if (!in_array($value->category->vSubTitle, $category))
				{
					array_push($category,$value->category->vSubTitle);
				}	
			}  
		}

		$newArray = array();
		$newArray = array_merge($vColor, $category);
		
		if(count($result)>0)
		{
			$data = array();
			$data['Status'] 		= '0';
			$data['message']		= 'Search Data Successfully';
			$data['data']           = $result;	
			if(count($newArray)>0)
			{
				$data['alldata']        = $newArray;
			}
			else
			{
				$data['alldata']        = array();
			}	
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['data']		    = array();
			$data['alldata']        = array();
		}
		
	
		echo json_encode($data);
		exit;
	}
	public function wishlishadded()
	{
		$iProductId = $this->input->post('iProductId');
		$iUserId 	= $this->input->post('iUserId');
		$message = '';
	
		$result  	= $this->product_model->get_by_single_product($iProductId);
		$vWishlist  = $result->vWishlist;
		

		$data['vProductName'] 	= $result->vProductName;
		$data['iProductId'] 	= $iProductId;
		$data['vPrice'] 		= $result->vPrice;
		$data['vImage'] 		= $result->image->vImage;
		$data['iUserId'] 		= $iUserId;
		$data['dtAddedDate']    = date("Y-m-d h:i:s");

		// ***********************Wishlist table ADDED********************
		$id = $this->product_model->add_wishlist($data);

		// ***********************Product table Update********************
		$where = array('iProductId'=>$iProductId);
		if($vWishlist=='1')
		{
			$data_update['vWishlist'] = '0';
			$message = 'Removed from your Wishlist';
		}
		else
		{
			$data_update['vWishlist'] = '1';
			$message = 'Added to Your Wishlist';
		}
		
		$result   = $this->product_model->update($where,$data_update);
		if($vWishlist=='1')
		{
			$ids = $this->product_model->delete_by_wishlist_data($iProductId);
		}

		// ***********************Wishlist table data get********************

		$wishlistresult  	= $this->product_model->get_by_wishlist_data($iUserId);
		
		if(count($wishlistresult)>0)
		{
			$data = array();
			$data['Status'] 		= '0';
			$data['message']		= $message;
			$data['data']           = $wishlistresult;	
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['data']		    = array();
		}
		
	
		echo json_encode($data);
		exit;

	}
	public function terms_page_save_data()
	{
	
		$iTermsId   			= $this->input->post('iTermsId');

		$Aboutus   			= $this->input->post('Aboutus'); 
		$Exchange   		= $this->input->post('Exchange'); 
		$TermsCondition   	= $this->input->post('TermsCondition'); 
		
		if(strlen($Aboutus) > 30)
		{
			$data['tAboutus'] 			= $Aboutus;
		}
		if(strlen($Exchange) > 30)
		{
			$data['tExchange'] 			= $Exchange;
		}
		if(strlen($TermsCondition) > 30)
		{
			$data['tTermsCondition'] 	= $TermsCondition;
		}

		$data['dtAddedDate']    	= date("Y-m-d h:i:s");

		// ***********************Wishlist table ADDED********************
		if(empty($iTermsId))
		{
			$id = $this->login_model->add_terms_condition($data);
			if($id)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']		= 'Content Added Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['data']		    = array();
			}
		}
		else
		{

            $where = array('iTermsPage'=>$iTermsId);
			$id   = $this->login_model->update($where,$data);
		

			if($id)
			{
				$data = array();
				$data['Status'] 		= '0';
				$data['message']		= 'Content Updated Successfully';
			}
			else
			{
				$data = array();
				$data['Status'] 		= '1';
				$data['data']		    = array();
			}

		}
		
		
	
		echo json_encode($data);
		exit;

	}
	
	public function all_terms_condition_get()
	{
		$result = $this->login_model->all_terms_condition_data_get();

		if(count($result)>0)
		{
			$data = array();
			$data['Status'] 		= '0';
			$data['message']		= 'Content data Get Successfully';
			$data['data']			= $result;
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['data']		    = array();
		}
	
		echo json_encode($data);
		exit;

	}

	public function delete_terms_condition()
	{
		$iTermsPage  = $this->input->post('iTermsPage');
		$id = $this->login_model->delete_by_id($iTermsPage);
		
		$data['Status']     = '0';
		$data['message']  	= 'Terms & Condition Deleted Successfully';
			
		echo json_encode($data);
	}

	
	public function all_terms_get()
	{
	
		
		$iTermsId = $_GET['iTermsId'];
		if($_SERVER['REQUEST_METHOD']=='GET' && $iTermsId!="")
		{
			$result  = $this->login_model->get_by_terms_id($iTermsId);
			

			if(count($result) > 0)
			{
				$data['Status']     		= '1';
				$data['message']  			= 'Terms Data Get Successfully';
				$data['tAboutus']   		= $result->tAboutus;
				$data['tExchange']  	  	= $result->tExchange;
				$data['tTermsCondition']  	= $result->tTermsCondition;
			}
			else
			{
				$data['Status']     = '0';
				$data['message']  	= 'Data Not Found';
				$data['data']     	= array();
			}
		}
		
 		echo json_encode($data);
	}

	public function contact_us()
	{
		
		$data['vUserName'] 			= $this->input->post('vUserName');
		$data['vEmail'] 			= $this->input->post('vEmail');
		$data['vMobile'] 			= $this->input->post('vMobile');
		$data['vSubject'] 			= $this->input->post('vSubject');
		$data['vMessage'] 			= $this->input->post('vMessage');
		$data['dtAddedDate']    	= date("Y-m-d h:i:s");

		$id = $this->order_model->add_contact_us($data);

		if($id)
		{
			$data = array();
			$data['Status'] 		= '0';
			$data['message']		= 'Contact Us Details Added Successfully';
		
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['data']		    = array();
		}
		
	
		echo json_encode($data);
		exit;

	}

	public function delete_news_letter()
	{
		$iNewsLetterId  = $this->input->post('iNewsLetterId');
		$id = $this->category_model->delete_by_news($iNewsLetterId);
		$data['Status']     = '0';
		$data['message']  	= 'News Letter Email Deleted Successfully';
		echo json_encode($data);
	}
	

	public function newsLetter()
	{
		
		$data['vEmail'] 			= $this->input->post('vEmail');
		$data['dtAddedDate']    	= date("Y-m-d h:i:s");

		$id = $this->order_model->add_newsLetter($data);

		if($id)
		{
			$data = array();
			$data['Status'] 		= '0';
			$data['message']		= 'Email Added Successfully';
		
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['data']		    = array();
		}
	
		echo json_encode($data);
		exit;

	}
	public function email_varify_news_letter()
	{	
        $vEmail   = $_POST['vEmail'];
		$result   = $this->order_model->get_by_email($vEmail);

		if($result > 0)
		{
			$data = array();
			$data['Status'] 		= '1';
		}
		else
		{
			$data = array();
			$data['Status'] 		= '0';
		}
		
		echo json_encode($data);
		exit;

	}

	public function product_size_wise_data_get()
	{
	    $vSize 			= $this->input->post('vSize');
	    $iProductId 	= $this->input->post('iProductId');
		$iOptionId   	= $this->order_model->get_by_optionid($vSize);

		$result  		= $this->order_model->get_by_product_size_qty($iOptionId,$iProductId);
		
		if($result)
		{
			$data = array();
			$data['Status'] 		= '0';
			$data['data'] 			= $result->vQty;
		
		}
		else
		{
			$data = array();
			$data['Status'] 		= '1';
			$data['data']  			= '0';
		}

		echo json_encode($data);
		exit;
	}

	public function order_active_inactive()
	{	
		$iOrderId 		= explode("@",$this->input->post('iOrderId'));
		$result   		= $this->order_model->get_by_id($iOrderId[1]);
		$eOrderStatus 	= $result->eOrderStatus;

		if($iOrderId[0]=='Complete')
		{	
			// table data Blank 
			$where = array('iOrderId'=>$iOrderId[1]);
			$data_update['eOrderStatus'] = '';
			$this->order_model->update($where,$data_update);

			$eStatus = '';
			if($eOrderStatus=='Pending')
			{
				$eStatus = 'Complete';
			}
		    
			if($eOrderStatus=='Complete')
			{
				$eStatus = 'Pending';
			}

			$where = array('iOrderId'=>$iOrderId[1]);
			if(empty($eStatus))
			{
				$eStatus = 'Pending';
			}
			
			$data_update['eOrderStatus'] = $eStatus;
			$id = $this->order_model->update($where,$data_update);
			if($id)
			{
				$data['Status']     = '0';
				$data['message']    ='Status Update Successfully'; 
			}
			else
			{
				$data['Status']     = '1';	
			}

		}

		if($iOrderId[0]=='Rejected')
		{
			$where = array('iOrderId'=>$iOrderId[1]);
			$data_update['eOrderStatus'] = '';
			$this->order_model->update($where,$data_update);

			$eStatus = '';
			if($eOrderStatus=='Rejected')
			{
				$eStatus = 'Pending';
			}

			if($eOrderStatus=='Pending')
			{
				$eStatus = 'Rejected';
			}

			if($eOrderStatus=='Complete')
			{
				$eStatus = 'Rejected';
			}

			if(empty($eStatus))
			{
				$eStatus = 'Pending';
			}

			$where = array('iOrderId'=>$iOrderId[1]);
			$data_update['eOrderStatus'] = $eStatus;
			$id = $this->order_model->update($where,$data_update);
			if($id)
			{
				$data['Status']     = '0';
				$data['message']    ='Status Update Successfully'; 
			
			}
			else
			{
				$data['Status']     = '1';	
			}
			
		}

		echo json_encode($data);
		exit;
	}

	public function order_view()
	{	
	    $iOrderId = $this->input->get('iOrderId');
	
		$result   = $this->order_model->get_by_id($iOrderId);
		
		$iProductId = $result->iProductId;

		
		$all_data = $this->product_model->order_wise_product($iProductId);

		foreach($all_data as $key => $value)
		{
			// ****************Color Added ******************
			if(count($value->color)>0)
			{
				foreach($value->color as $key1 => $value1)
				{
				    $all_data[$key]->vColorAdded = $value1->vColor;
				}
			}
			else
			{
				$all_data[$key]->vColorAdded = 'white';
			}
			// ****************Category Added ******************
			if(count($value->iCategoryId)>0)
			{
				foreach($value->iCategoryId as $key2 => $value2)
				{
				    $all_data[$key]->CategoryName = $value2->vTitle;
				}
			}
			else
			{
				$all_data[$key]->CategoryName = '';
			}

			// ****************image Added ******************
			if(count($value->image)>0)
			{
				foreach($value->image as $key3 => $value3)
				{
				    $all_data[$key]->vImage = $value3->vImage;
				}
			}
			else
			{
				$all_data[$key]->vImage = '';
			}
	
		}		

		if(count($all_data)>0)
		{
			$data['Status']     = '0';
			$data['data']		= $all_data;
			$data['message']    ='View Order Listing Successfully'; 
		
		}
		else
		{
			$data['Status']     = '1';	
		}

		echo json_encode($data);
		exit;
	}

	public function invoice_view()
	{	
	    $iOrderId = $this->input->get('iOrderId');
	
		$result   			= $this->order_model->get_by_id($iOrderId);
		$iProductId 		= $result->iProductId;
		$vTransactionId 	= $result->vTransactionId;
		$iUserId 			= $result->iUserId;
		$vOrderQty 			= explode(",", $result->vOrderQty);

		$UserAddress  = $this->order_model->get_by_id_checkout_user_data($iUserId);
		$all_data     = $this->product_model->order_invoice_product($iProductId);
		$product_sum  = array();

		foreach($all_data as $key => $value)
		{
			$vPrice = '';
			$vQty   = '';

			$vPrice 	= $value->vPrice;
		    $vQty 		= $vOrderQty[$key];
			$sub_total 	= $vPrice * $vQty;
			array_push($product_sum,$sub_total);

			$all_data[$key]->vQty		= $vOrderQty[$key];
			$all_data[$key]->vOptions	= $value->vOptions->vOptions;
			$all_data[$key]->cal_price  = $sub_total;
		}

		if(count($all_data)>0)
		{
			$data['Status']     	= '0';
			$data['product_sum']    = array_sum($product_sum);
			$data['data']			= $all_data;
			$data['User']       	= $UserAddress;
			$data['vTransactionId'] = $vTransactionId;
			$data['message']    	= 'Order Invoice Listing Successfully'; 
		
		}
		else
		{
			$data['Status']     = '1';	
		}

		echo json_encode($data);
		exit;
	}


}