import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import "react-dropzone-uploader/dist/styles.css";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  getEnvironment  from '../../../components/environment';
import $ from "jquery";
import Variants from "./Variants";

const Product_edit = () => {
  let history = useHistory();
  var answer = window.location.href;
  const answer_array = answer.split("/");
  const envConfig = getEnvironment();
  const apiUrl    = envConfig.apiUrl;     
  const p = answer_array[5];

  const [Category, setCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [CatId, setCatId] = useState([]);
  const [iSubcategoryId, setSubcatId] = useState([]);
  const [Product_v, setProduct_v] = useState([]);
  const [VariantsListData, setVariantsListData] = useState([]);
  const [Color, setColor] = useState([]);
  const [Fabric, setFabric] = useState([]);
  const [iFabricId, setiFabricId] = useState("");
  const [iHeaderId, setiHeaderId] = useState("");

  // const [iCategoryId, setCategoryId] = useState("");
  const [Product, setProduct] = useState("");
  const [SubCategory_id, setSubcategory] = useState("");
  const [Gif, setGif] = useState(false);
  const [Product_variantid, setProduct_variantid] = useState("");

  // const [Qty, setQty] = useState("");
  // const [Price, setPrice] = useState("");
  const [Desc, setDesc] = useState("");
  const [Moredesc, setMoredesc] = useState("");

  const [Status, setStatus] = useState("inActive");
  const [StatusHomepage, setStatusHomepage] = useState("2");

  const [errorProduct, setErrroProduct] = useState("");
  const [errorQty, setErrroQty] = useState("");
  // const [errorPrice, setErrroPrice] = useState("");
  const [errorCategory_v, setErrroCategory_v] = useState("");
  const [SubCategory_i, setErrroSubCategory] = useState("");
  const [Error, setErrro] = useState("false");
  const [DescError, setDescError] = useState("");
  const [MoredescError, setMoredescError] = useState("");
  const [Colorerror, setColorerror] = useState("");
  const [Fabricerror, setFabricerror] = useState("");
  const [ColorId, setColorId] = useState("");
  // const [iFabricId, setiFabricId] = useState("");
  const [disable, setdisable] = useState(false);
  const [headerMenuArray, setHeaderMenuArray] = useState([]);
  const [categotyIdArray, setcategotyIdArray] = useState([]);
  // const [materialArray, setMaterialArray]     = useState([]);
  const [iCategoryId, setiCategoryId]         = useState("");
  const [category, setErrroCategory]          = useState("");
  // const [iMaterialId, setiMaterialId]         = useState("");
  // const [materialerror, setMaterialError]     = useState("");

  var iProductId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    var Color = event.target.iColorId.value;
    var FabricId = event.target.iFabricId.value;
    let error = false;

    if (!Product) {
      setErrroProduct("Please Enter Product Name");
      error = true;
      console.log("eoororiffffff");
    } else {
      setErrroProduct("");
    }

    if(!iCategoryId)
    {
      setErrroCategory("Please Select Category");
      error = true;
    }
    else
    {
      setErrroCategory("");
    }

    if (!SubCategory_id) {
      setErrroSubCategory("Please Select Material");
      error = true;
    } else {
      setErrroSubCategory("");
    }

    if (!FabricId) {
      setFabricerror("Please Select Fabric");
      error = true;
    } else {
      setFabricerror("");
    }

    if (!Color) {
      setColorerror("Please Select Color");
      error = true;
    } else {
      setColorerror("");
    }

    if (!Desc != "") {
      setDescError("Please Enter Product Description");
      error = true;
    } else {
      setDescError("");
    }

    if (!Moredesc != "") {
      setMoredescError("Please Enter More Information");
      error = true;
    } else {
      setMoredescError("");
    }
  
    var url = `${apiUrl}/api/product_added`;
    const fd = new FormData(event.target);
    
    if (!error) 
    {
      setGif(true);
      const dataa = axios
        .post(url, fd)
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
              // window.location.reload(1);
            }, 1000);
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

  async function category_change(e) {
    var iCategoryId = e.target.value;
    setiCategoryId(iCategoryId);
    const urls = `${apiUrl}/get_category?iCategoryId=${iCategoryId}`;
    try {
      const result = await axios.get(urls);
    } catch (e) {}
  }

  const productUrl = `${apiUrl}/all_product?iProductId=${iProductId}`;
 
  useEffect(() => {
    axios
      .get(productUrl)
      .then((res) => {
        setcategotyIdArray(res?.data?.categoryArray);
        setiHeaderId(res?.data?.data.iHeaderId)
        setSubCategory(res?.data?.SubCategory);
        setProduct(res?.data?.data?.vProductName);
        setDesc(res?.data?.data?.iDescription);
        setMoredesc(res?.data?.data?.tMoreInformation);
        setColorId(res?.data?.data?.iColorId);
        setiFabricId(res?.data?.data?.iFabricId);
        // setQty(res?.data?.data?.vQty);
        // setPrice(res?.data?.data?.vPrice);
        setStatus(res?.data?.data?.eStatus);
        setiCategoryId(res?.data?.data?.iCategoryId);
        // setiMaterialId(res?.data?.data?.iMaterialId);
        setSubcategory(res?.data?.data?.iSubcategoryId);
        setStatusHomepage(res?.data?.data?.vHomePageDisplay);
        setProduct_v(res?.data?.product_variant);
        setVariantsListData(res?.data?.variantsListData);
        setProduct_variantid(res?.data?.product_variant[0]?.iVariantId);
      })
      .catch((err) => {});
  }, []);


  var urls = `${apiUrl}/get_category`;
  useEffect(() => {
    axios
      .get(urls)
      .then((res) => {
        setHeaderMenuArray(res?.data?.data);
        // setMaterialArray(res?.data?.material);
        setcategotyIdArray(res?.data?.categoryArray);
        setCategory(res?.data?.data);
        setColor(res?.data?.color);
        setFabric(res?.data?.fabric);
      })
      .catch((err) => {});
  }, []);


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

  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header border-0 d-flex">
                  <div className="row align-items-center">
                    <div className="col">
                      <Link to={`/admin/product/edit/${iProductId}`}>
                        <button
                          className={`btn genBtn ${
                            p == "edit" ? "Active" : ""
                          }`}
                        >
                          Product Edit
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="row align-items-center">
                    <div className="col ml-4">
                      <Link to={`/admin/product-image/${iProductId}`}>
                        <button className="btn genBtn">Product Image</button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <input type="hidden" name="iProductId" value={iProductId} />
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
                              value={Product}
                            />
                            <span className="red">{errorProduct}</span>
                          </div>
                        </div>
                        {/* <div className="col-lg-6"></div> */}

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
                                { return <option selected={
                                  cat.iHeaderId == iHeaderId ? "selected" : ""
                                }   value={cat.iHeaderId}>
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
                                            <option
                                            selected={
                                              fabric.iFabricId == iFabricId ? "selected" : "" }
                                            value={fabric.iFabricId}> {fabric.vTitle} </option>
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
                              <label className="form-control-label" for="vTitle">
                              Material <span style={{color:'red'}}>*</span></label>
                              <select  name="iSubcategoryId"  className="form-control"  onChange={(e) => setSubcategory(e.target.value)}
                              >
                                <option value="">Please select Material</option>
                                {   
                                  SubCategory.map((subcat, index) => (
                                  <option selected={
                                    subcat.iSubcategoryId == SubCategory_id ? "selected" : "" }  value={subcat.iSubcategoryId}>
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
                              <label className="form-control-label" for="vTitle"> Category  <span style={{color:'red'}}>*</span></label>
                              <select name="iCategoryId" className="form-control" onChange={(e)=>setiCategoryId(e.target.value)}>
                                <option value="">Select Category</option>
                                {   
                                  categotyIdArray.map((v, i) => (
                                  <option selected={
                                    v.iCategoryId == iCategoryId ? "selected" : "" }  value={v.iCategoryId}>
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
                              <label className="form-control-label" for="vTitle">Material<span style={{color:'red'}}>*</span></label>
                              <select name="iMaterialId" className="form-control" onChange={(e)=>setiMaterialId(e.target.value)}>
                                <option value="">Please Material</option>
                                {   
                                
                                  materialArray.map((v, i) => (
                                  <option 
                                  selected={
                                    v.iMaterialId == iMaterialId ? "selected" : "" }
                                  value={v.iMaterialId}>
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
                                  {
                                      Color.map((color, index) => (
                                          <option selected={
                                            ColorId == color.iColorId ?
                                                'selected' : ''} value={color.iColorId}>{color.vColor} </option>
                                      ))}
                              </select>
                              <span className="red">{Colorerror}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Variants
                          Product_variantid={Product_variantid}
                          iProductId={iProductId}
                          data={Product_v}
                          Color={Color}
                          Fabric={Fabric}
                          Colorerror={Colorerror}
                          Fabricerror={Fabricerror}
                          ColorId={ColorId}
                          FabricId={iFabricId}
                          VariantsListData={VariantsListData}
                        />

                        <div className="col-lg-6 mt-4">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              Description <span style={{color:'red'}}>*</span>
                            </label>
                            <textarea
                              onChange={(e) => setDesc(e.target.value)}
                              className="form-control"
                              value={Desc}
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
                              value={Moredesc}
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
                              <option
                                selected={
                                  Status == "Inactive" ? "selected" : ""
                                }
                                value="inActive"
                              >
                                Inactive
                              </option>
                              <option
                                selected={Status == "Active" ? "selected" : ""}
                                value="Active"
                              >
                                Active
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              HomePage Display
                            </label>
                            <select
                              className="form-control"
                              name="vHomePageDisplay"
                              onChange={(e) =>
                                setStatusHomepage(e.target.value)
                              }
                            >
                              <option
                                selected={
                                  StatusHomepage == "1" ? "selected" : ""
                                }
                                value="1"
                              >
                                HomePage Show
                              </option>
                              <option
                                selected={
                                  StatusHomepage == "2" ? "selected" : ""
                                }
                                value="2"
                              >
                                Default
                              </option>
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

export default Product_edit;
