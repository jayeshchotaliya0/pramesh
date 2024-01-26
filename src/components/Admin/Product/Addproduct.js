import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import "react-dropzone-uploader/dist/styles.css";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Variants from "../Product/Variants";
import  getEnvironment  from '../../../components/environment';
import $ from "jquery";

const Addproduct = () => {
  let history     = useHistory();
  const envConfig = getEnvironment();
  const apiUrl    = envConfig.apiUrl;   

  const [SubCategory, setSubCategory] = useState([]);
  const [Color, setColor]             = useState([]);
  const [Fabric, setFabric]           = useState([]);
  const [iFabricId, setiFabricId]     = useState(0);
  const [Image, setImage]             = useState([]);
  const [categotyIdArray, setcategotyIdArray] = useState([]);
  const [iHeaderId, setiHeaderId]       = useState("");
  const [ArrayOption, setArrayOption]     = useState([]);
  const [MultipleImage, setMultipleImage] = useState([]);
  const [Product, setProduct]         = useState("");
  const [Desc, setDesc]               = useState("");
  const [Moredesc, setMoredesc]       = useState("");
  const [Colorerror, setColorerror]   = useState("");
  const [Fabricerror, setFabricerror] = useState("");
  const [SubCategory_id, setSubcategory]  = useState("");
  const [Status, setStatus]                   = useState("inActive");
  const [StatusHomepage, setStatusHomepage]   = useState("2");
  const [Gif, setGif]                         = useState(false);
  const [errorProduct, setErrroProduct]       = useState("");
  const [errorImage, setErrroImage]           = useState("");
  const [VariantsError, setVariantsError]     = useState("");
  const [DescError, setDescError]             = useState("");
  const [MoredescError, setMoredescError]     = useState("");
  const [errorCategory_v, setErrroCategory_v] = useState("");
  const [SubCategory_i, setErrroSubCategory]  = useState("");
  const [category, setErrroCategory]          = useState("");
  const [disable, setdisable]                 = useState(false);
  const [headerMenuArray, setHeaderMenuArray] = useState([]);
  const [materialArray, setMaterialArray]     = useState([]);
  const [iCategoryId, setiCategoryId]         = useState("");
  // const [iMaterialId, setiMaterialId]         = useState("");
  const [materialerror, setMaterialError]     = useState("");
  
  function imagechange(e) {
    let ImagesArray = Object.entries(e.target.files).map((e, key) => e[1]);
    setImage([...Image, ...ImagesArray]);
  }
  function image_delele() {
    $(".vImages").val("");
    $(".gallery").html("");
    setImage([]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data    = new FormData(event.target);
    var Color     = event.target.iColorId.value;
    var FabricId  = event.target.iFabricId.value;

    var inputEle  = document.getElementsByName("price[]")[0].value;
    
    var error = false;
    if (Product != "") {
      setErrroProduct("");
    } else {
      setErrroProduct("Please Enter Product Name");
      var error = true;
    }
    
    if (Image.length > 0) {
      setErrroImage("");
    } else {
      setErrroImage("Please Select Product Image");
      var error = true;
      
    }

    if (Desc != "") {
      setDescError("");
    } else {
      setDescError("Please Enter Product Description");
      var error = true;
    }

    if (Moredesc != "") {
      setMoredescError("");
    } else {
      setMoredescError("Please Enter More Information");
      var error = true;
    }

    if (iHeaderId) {
      setErrroCategory_v("");
    } else {
      setErrroCategory_v("Please Select Header Menu");
      var error = true;
    }

    if (SubCategory_id) {
      setErrroSubCategory("");
    } else {
      setErrroSubCategory("Please Select Material");
      var error = true;
    }

    if(iCategoryId){
      setErrroCategory("");
    }
    else{
      setErrroCategory("Please Select Category");
      var error = true;
    }

    // if(iMaterialId)
    // {
    //   setMaterialError("");
    // }
    // else
    // {
    //   setMaterialError("Please Select Material");
    //   var error = true;
    // }

    if (Color) {
      setColorerror("");
      
    } else {
      setColorerror("Please Select Color");
      var error = true;
    }

    if (FabricId) {
      setFabricerror("");
    } else {
      setFabricerror("Please Select Fabric");
      var error = true;
    }

    if(inputEle==0)
    {
      document.getElementById("click_add_row").click();
      var error = true;
    }
    else
    {
      const price= document.getElementsByClassName("price_0");
      price[0].style.border= "";
    }
   
    if (error==false) 
    {
      var url = `${apiUrl}/product_added`;

      setGif(true);
      const dataa = axios
        .post(url, data)
        .then((res) => {
          setdisable(true);
          if (res.data.Status == "0") {
            setdisable(true);
            setGif(false);
            toast.success(res.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(function () {
              history.push("/admin/product/listing");
            }, 2000);
          } else {
            setdisable(false);

            setGif(false);
            toast.error(res.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((error) => {});
    }
  };

  async function headerMenuchangeevent(e) {
    const iFabricId = e.target.value;
    let category_Url="";
    setiFabricId(iFabricId)
    category_Url = `${apiUrl}/get_fabric_wise_subcategory?iHeaderId=${iHeaderId}&iFabricId=${iFabricId}`;
    try {
      const result = await axios.get(category_Url);
      if(result?.data?.data)
      {
        setSubCategory(result?.data?.data);
      }
      else
      {
        setSubCategory([]);
      }
    } catch (e) {}
  }

  var answer = window.location.href;
  const answer_array = answer.split("/");
  var urls = `${apiUrl}/get_category`;
  useEffect(() => {
    axios
      .get(urls)
      .then((res) => {
        setHeaderMenuArray(res.data.data);
        setColor(res.data.color);
        setFabric(res.data.fabric);
        setMaterialArray(res.data.material);
        setcategotyIdArray(res?.data?.categoryArray);
        setTimeout(function () {
            console.clear();
        },1500);
      })
      .catch((err) => {});
  }, []);


  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header border-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Product Add</h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      Product information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Product Name <span style={{color:'red'}}>*</span>
                            </label>
                            <input
                              type="text"
                              name="vProduct"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                              onChange={(e) => setProduct(e.target.value)}
                            />
                            <span className="red">{errorProduct}</span>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                for="vImage"
                              >
                                Product Image <span style={{color:'red'}}>*</span>
                              </label>
                              <input
                                name="vImage[]"
                                type="file"
                                id="vImage"
                                onChange={imagechange}
                                accept="image/*"
                                className="form-control vImages"
                                multiple
                              />
                              {Image.length > 0 ? (
                                <spam
                                  onClick={image_delele}
                                  className="fa fa-trash red float-right mt-2"
                                ></spam>
                              ) : (
                                <></>
                              )}

                              <div className="gallery"></div>
                              <span className="red">{errorImage}</span>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Header Menu <span style={{color:'red'}}>*</span>
                            </label>
                            <select
                              name="iHeaderId"
                              className="form-control"
                              onChange={(e)=>setiHeaderId(e.target.value)}
                            >
                              <option value="">Select Header Menu</option>
                              {
                                headerMenuArray.map(function(cat, index)
                                { return <option value={cat.iHeaderId}>
                                      {cat.vTitle}
                                    </option>
                                }) 
                              }
                            </select>
                            <span className="red">{errorCategory_v}</span>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <div className="form-group">
                              <label className="form-control-label" for="vTitle">Fabric <span style={{color:'red'}}>*</span></label>
                                <select name="iFabricId" className="form-control" onChange={headerMenuchangeevent}>
                                    <option value="">Select Fabric Name</option>
                                    {
                                        Fabric.filter((v,i)=>v.iHeaderId==iHeaderId && v.eStatus=='Active').map((fabric, index) => (
                                            <option value={fabric.iFabricId}> {fabric.vTitle} </option>
                                        ))
                                    }
                                </select>
                            <span className="red">{Fabricerror}</span>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                for="vTitle"
                              >
                                Material <span style={{color:'red'}}>*</span>
                              </label>
                              <select
                                name="iSubcategoryId"
                                className="form-control"
                                onChange={(e) => setSubcategory(e.target.value)}
                              >
                                <option value="">Please Select Material</option>
                                {   
                                  SubCategory.map((subcat, index) => (
                                  <option value={subcat.iSubcategoryId}>
                                    {subcat.vSubTitle}
                                  </option>
                                ))}
                              </select>
                              <span className="red">{SubCategory_i}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-lg-6">
                          <div className="form-group">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                for="vTitle"
                              >
                                Category <span style={{color:'red'}}>*</span>
                              </label>
                              <select
                                name="iCategoryId"
                                className="form-control"
                                onChange={(e)=>setiCategoryId(e.target.value)}
                              >
                                <option value="">Select Category</option>
                                {   
                                  categotyIdArray.map((v, i) => (
                                  <option value={v.iCategoryId}>
                                    {v.vTitle}
                                  </option>
                                ))}
                              </select>
                              <span className="red">{category}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* <div className="col-lg-6">
                          <div className="form-group">
                            <div className="form-group">
                              <label className="form-control-label" for="vTitle">Material <span style={{color:'red'}}>*</span></label>
                              <select name="iMaterialId" className="form-control" onChange={(e)=>setiMaterialId(e.target.value)}>
                                <option value="">Please Material</option>
                                {   
                                  materialArray.map((v, i) => (
                                  <option value={v.iMaterialId}>
                                    {v.vTitle}
                                  </option>
                                ))}
                              </select>
                              <span className="red">{materialerror}</span>
                            </div>
                          </div>
                        </div> */}

                        <div className="col-lg-6">
                          <div className="form-group">
                            <div className="form-group">
                              <label className="form-control-label" for="vTitle">Color <span style={{color:'red'}}>*</span></label>
                              <select name="iColorId" className="form-control">
                                  <option value="">Select Color Name</option>
                                  { Color.map((color, index) => (
                                          <option value={color.iColorId}>{color.vColor} </option>
                                      ))}
                              </select>
                              <span className="red">{Colorerror}</span>
                            </div>
                          </div>
                        </div>

                        <Variants
                          Color={Color}
                          Fabric={Fabric}
                          Colorerror={Colorerror}
                          Fabricerror={Fabricerror}
                        />

                        <div className="col-lg-6 mt-4">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              Description <span style={{color:'red'}}>*</span>
                            </label>
                            <textarea
                              onChange={(e) => setDesc(e.target.value)}
                              className="form-control"
                              name="tDescription"
                              rows="4"
                              cols="50"
                            ></textarea>
                            <span className="red">{DescError}</span>
                          </div>
                        </div>

                        <div className="col-lg-6 mt-4">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              More Information <span style={{color:'red'}}>*</span>
                            </label>
                            <textarea
                              onChange={(e) => setMoredesc(e.target.value)}
                              className="form-control"
                              name="tMoreinformation"
                              rows="4"
                              cols="50"
                            ></textarea>
                            <span className="red">{MoredescError}</span>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              Status
                            </label>
                            <select
                              name="eStatus"
                              className="form-control"
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option value="inActive">Inactive</option>
                              <option value="Active">Active</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              HomePage Display{" "}
                            </label>
                            <select
                              name="vHomePageDisplay"
                              className="form-control"
                              onChange={(e) =>
                                setStatusHomepage(e.target.value)
                              }
                            >
                              <option value="1">HomePage Show</option>
                              <option value="2">Default</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group">
                            <input
                              type="submit"
                              className={`btn btn-primary ${
                                disable ? "disabled" : ""
                              }`}
                              value="Submit"
                            />

                            <Link to="/admin/product/listing">
                              <a>
                                <button
                                  type="button"
                                  className="btn btn-warning"
                                >
                                  Back
                                </button>
                              </a>
                            </Link>
                            {Gif == true ? (
                              <img
                                className="loding_gif_product"
                                src={process.env.PUBLIC_URL + "/Images/3.svg"}
                                alt="img"
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                          <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addproduct;
