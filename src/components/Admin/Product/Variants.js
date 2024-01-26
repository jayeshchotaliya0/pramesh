import React from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  getEnvironment  from '../../../components/environment';

class Variants extends React.Component {
    state = {
        rows: [{iOptionId:"", vPrice: 0, vQty:"",vSku:"",vWeight:""}],
        ArrayVariants: [],
        OptionArray: [],
        VariantsId: '',
        background: '#fff',
    };
    
    async componentDidMount() 
    {
        const envConfig = getEnvironment();
        const apiUrl    = envConfig.apiUrl;
        //*******************************variants data get ***************************** */
        const variant_url =  `${apiUrl}/get_variants`;
        const response = await fetch(variant_url);
        const data = await response.json();
        this.setState({ ArrayVariants: data.data }); 
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data){
        }
        if (prevProps.data !== this.props.data){
            if(this?.props?.data?.length>0)
            {
                this.setState({ rows: this?.props?.data });
            }
        }
    }

    Change_variants = (e) =>
    {
        this.setState({ OptionArray: []});
        var iVariantsId = e.target.value;
        if(iVariantsId==""){
            this.setState({
                rows: []
            });
        }
        this.option_create(iVariantsId);
        this.setState({ VariantsId: iVariantsId });
    }
    
    option_create(iVariantsId)
    {
        const envConfig = getEnvironment();
        const apiUrl    = envConfig.apiUrl;
        var urls = `${apiUrl}/get_variants_wise_option?iVariantsId=${iVariantsId}`;
    
        axios.get(urls)
            .then((res) => 
            {
                if (res.data.Status=='1')
                {
                    this.setState({ OptionArray: res.data.data });
                }
            });
    }

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
    };

    handleChange = idx => e => {
        const { name, value } = e.target;
        const rows = [...this.state.rows];
        rows[idx] = {
            [name]: value
        };
        this.setState({
            rows
        });
    };
    // handleAddRow = () => 
    // {
    //     const indexid = this.state.rows?.length-1;

    //     if(this.state.rows?.length>0)
    //     {
    //         const price      = document.getElementsByClassName("price_"+indexid);
    //         const optionName = document.getElementsByClassName("optionName_"+indexid);

    //         if(price[0].value>0 && optionName[0].value>0)
    //         {
    //             price[0].style.border= "";
    //             optionName[0].style.border= "";
    //             const item = { iOptionId:"", vPrice: 0, vQty:"",vSku:"",vWeight:"" };
    //             this.setState({ rows: [...this.state.rows, item] });
    //         }
    //         else
    //         { 
    //             if(price[0].value>0)
    //             {
    //                 price[0].style.border= "";
    //             }
    //             else
    //             {
    //                 price[0].style.border      = "1px solid red";
    //             }

    //             if(optionName[0].value>0)
    //             {
    //                 optionName[0].style.border = "";
    //             }
    //             else
    //             {
    //                 optionName[0].style.border = "1px solid red";
    //             }
    //         }
    //     }
        
    // };
   
    handleRemoveSpecificRow = (idx) => () => {
        const rows = [...this.state.rows]
        rows.splice(idx, 1)
        this.setState({ rows })
    }

    delete = (idx) => () => 
    {
        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') {
            var del = 'http://localhost/pramesh/backend/api/product_variyant_delete';
        }
        else {
            var del = 'https://prameshsilks.com/backend/api/product_variyant_delete';
        }
        const fd = new FormData();
        fd.append("iProduct_variantsId", idx);
        axios({
            method: "post",
            url: del,
            data: fd,
        })
        .then(function (res) {
            if (res.data.Status == '0') {
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
                    // history.push("/admin/product/listing");
                    window.location.reload(1);
                }, 1000);
            }
            
        })
        .catch(function (error) {
        });
    }
   
    render() {
        var ArrayVariant        = this.state.ArrayVariants;
        var OptionArray         = this.state.OptionArray;
        var background          = this.state.background;
        var VariantsId          = this.state.VariantsId;
        var Color               = this.state.ColorType;
        var product_v           = this.props.data;
        var iProductId          = this.props.iProductId;
        var Variantid_selected  = this.props.Product_variantid;

        if(this?.props?.VariantsListData?.length>0){
            var VariantsListDatas = this?.props?.VariantsListData;
        }else{
            var VariantsListDatas = OptionArray;
        }
                                                
        return (
           <>
                <div className="row clearfix ml-2">
                    <div className="col-lg-6">
                        <div className="form-group">
                        <label className="form-control-label" for="vTitle">Variants Name</label>
                        <select onChange={this.Change_variants}  name="iVariantId" className="form-control">
                                <option>Select Variant Name</option>
                                {
                                    ArrayVariant.map((namedata, index) => (
                                    <option selected={
                                                Variantid_selected == namedata.iVariantId ?
                                                    'selected' : ''}
                                        value={namedata.iVariantId}>
                                            {namedata.vLabel}
                                    </option>
                                ))}
                        </select>
                        </div>
                    </div>
                    
                    <div className="col-md-12 column">
                        <table
                            className="table table-bordered table-hover"
                            id="tab_logic">
                            <thead>
                                <tr>
                                <th className="text-center"> Id </th>
                                <th className="text-center"> Option Name </th>
                                    <th className="text-center"> Price <span style={{color:'red',fontSize:'15px'}}>*</span></th>
                                    <th className="text-center"> Quantity</th>
                                    <th className="text-center"> SKU </th>
                                    <th className="text-center"> Weight </th>
                                    <th className="text-center"> Action</th>
                                    <th />
                                </tr>
                            </thead>
                            {
                                <tbody>
                                {
                                    this.state.rows.map((item, idx) => (
                                        <tr id="addr0" key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>
                                            <select
                                            className={`form-control optionName_${idx}`}
                                            name="optionName[]"
                                            >
                                            <option value="">Select Option</option>
                                            {
                                                VariantsListDatas.map(function(v,i){
                                                    return <option selected={
                                                        item.iOptionId == v.iOptionId ? "selected" : ""
                                                      } value={v.iOptionId}>{v.vOptions}</option>
                                                })
                                            }
                                            </select>
                                                {/* <Select defaultValue={{label: `${item?.iOptionId}`, value: 15}} name="optionName[]" options={OptionArray}></Select> */}
                                            </td>
                                            <td>
                                                <input type="number"  name="price[]" placeholder="Price" value={item?.vPrice}
                                                    onChange={this.handleChange(idx)} className={`form-control price_${idx}`} />
                                                    
                                            </td>
                                            <td>
                                                <input
                                                    type="number" name="qty[]" value={this?.state?.rows[idx]?.vQty} onChange={this.handleChange(idx)}
                                                    className="form-control"/>
                                            </td>
                                            <td>
                                                <input type="text" name="sku[]" value={this?.state?.rows[idx]?.vSku}
                                                    onChange={this.handleChange(idx)} className="form-control" />
                                            </td>
                                            <td>
                                                <input type="text" name="weight[]" value={this?.state?.rows[idx]?.vWeight}
                                                    onChange={this.handleChange(idx)} className="form-control" />
                                            </td>
                                            <td>
                                                {/* { this?.state?.rows[idx]?.iVariantId != '0' ?
                                                        <a onClick={this.handleAddRow} id="click_add_row" className="btn btn-outline-primary btn-sm">Add Row</a>
                                                    :<></> }
                                                
                                                { idx!='0' ?  <button className="btn btn-outline-danger btn-sm" onClick={this.handleRemoveSpecificRow(idx)} > Remove</button> : "" } */}
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            }
                        </table>
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
            
           </>
        );
    }
}

export default Variants;