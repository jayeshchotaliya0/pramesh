import React, { useState ,useEffect } from "react";

class Table_Listing extends React.Component 
{
    
    render() 
    {   
        var banners = this.props.data;
        const readerList = banners.map((banner) => {
            const { iBannerId, vTitle, vImage, tDescription, eStatus } = banner;
            return (
                <tr>
                    <th>{iBannerId}</th>
                    <td><img className="h-101 w-101" src={vImage} /></td>
                    <td>{vTitle}</td>
                    <td>{tDescription}</td>
                    <td>{eStatus}</td>
                    <td>
                        <button data-id={`/product/${iBannerId}`} className="btn btn-primary btn-sm">Edit</button>
                        <button className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            )
        })

        return(
            <table id="example" className="table align-items-center table-flush">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Descption</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {readerList}

                </tbody>
            </table>
        )
    }
}

export default Table_Listing;