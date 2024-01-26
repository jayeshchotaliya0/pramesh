import { combineReducers } from "redux";
import { 
    productReducer, 
    miniProductReducer,
    miniFirstimageReducer,
    miniSecondimageReducer,
    miniThirdimageReducer,
    miniHomepageproduct,
    miniMainproduct,
    miniMainproductimage,
    miniHeadertimage,
    miniProductListing,
    miniAddtocartproduct,
    miniAddtocartsavedata,  
    miniAddtocartsubtotal,
    allstoriesdata,
    allfabricdata,
    allsearchdata,
    allwishlistdata,
    alltermsdata,
}  from "./productReducer";

const reducers = combineReducers({
    allProducts             : productReducer,
    minibanner              : miniProductReducer,
    FirstimageData          : miniFirstimageReducer,
    SecondimageData         : miniSecondimageReducer,
    ThirdimageData          : miniThirdimageReducer,
    Homepageproduct         : miniHomepageproduct,
    Mainproductlisting      : miniMainproduct,
    Mainproductimage        : miniMainproductimage,
    Mainheader              : miniHeadertimage,
    MainProductListing      : miniProductListing,
    MainAddtocartPage       : miniAddtocartproduct,
    MainAddtocartsavedata   : miniAddtocartsavedata,
    MainAddtocartsubtotal   : miniAddtocartsubtotal,
    MainMiniallstoriesdata  : allstoriesdata,
    MainMiniallfabricdata   : allfabricdata,
    MainMiniallsearchdata   : allsearchdata,
    MainMiniallwishdata     : allwishlistdata,
    MainMiniTermsdata       : alltermsdata
});


export default reducers;