import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import Select from 'react-select'
import { SketchPicker } from 'react-color';

const Editvariants = (props) =>
{
    const [Variants, setVariants] = useState([]);

    
    var product_v =  props.data;

    
    function click_addmore()
    {
        setVariants('1');
        // product_v.push('10');
    }
    
        return (
            <>
                <div className="row clearfix">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label className="form-control-label" for="vTitle">Variants Name</label>
                            {/* <Select
                                name="VariantsId"
                                onChange={this.Change_variants}
                                options={ArrayVariant}
                                value={
                                    ArrayVariant.filter(option => option.label === 'size')
                                }
                                isOptionDisabled={(option) => option.disabled}
                            /> */}
                            <select>
                                <option>kl</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-12 column">
                        <table
                            className="table table-bordered table-hover"
                            id="tab_logic">
                            <thead>
                                <tr>
                                    <th className="text-center"> Id  </th>
                                    <th className="text-center"> Option Name </th>
                                    <th className="text-center"> Price</th>
                                    <th className="text-center"> Quantity</th>
                                    <th className="text-center"> SKU </th>
                                    <th className="text-center"> Action</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {product_v.map((item, idx) => (
                                    <tr id="addr0" key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>
                                            {/* <Select name="OptionName[]" options={OptionArray}></Select> */}
                                            <select>
                                                <option>kl</option>
                                            </select>
                                        </td>

                                        <td>
                                            <input
                                                type="number"
                                                name="price[]"
                                                placeholder="Price"
                                                className="form-control"
                                            />
                                        </td>

                                        <td>
                                            <input
                                                type="text"
                                                name="Qty[]"
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="sku[]"
                                                className="form-control"
                                            />
                                        </td>

                                        <td>
                                            <a id={`${idx}`} onClick={click_addmore} className="btn btn-outline-primary btn-sm">Add Row</a>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                
                                            > Remove</button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    {/* <div className="col-md-5"></div>
                        <div className="col-md-5 mt-5">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div> */}


                </div>

            </>
        );
    
}

export default Editvariants;