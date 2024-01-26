import { Actiontype } from "../contants/action-types";
const initialState = {
    products : [],
    minibanner : [],
    FirstiamgeArray : [],
    SecondiamgeArray: [],
    ThirdiamgeArray: [],
    HomepageproductArray : [],
    MainproductArray: [],
    MainproductimageArray: [],
    MainheaderArray: [],
    MainProductListingArray: [],
    MainAddtocartArray: [],
    MainAddtocartsavedataArray: [],
    MainAddtocartsubtotalArray: [],
    AllstoriesdataArray       : [],
    AllFabricdataArray : [],
    AllSearchdataArray : [],
    AllWishlistArray   : [],
    AllTermsArray      : [],
}

export const productReducer = (state = initialState ,{type ,payload}) =>
{
    switch(type){
        case Actiontype.SET_BANNER:
            return { ...state, products:payload};
        default : 
        return state;
    }
};

export const miniProductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.MINI_BANNER:
            return {...state, minibanner: payload };
        default:
            return state;
    }
}
export const miniFirstimageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.FIRST_IMAGE_HOMEPAGE:
            return { ...state, FirstiamgeArray: payload };
        default:
            return state;
    }
}
export const miniSecondimageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.SECOND_IMAGE_HOMEPAGE:
            return { ...state, SecondiamgeArray: payload };
        default:
            return state;
    }
}

export const miniThirdimageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.THIRD_IMAGE_HOMEPAGE:
            return { ...state, ThirdiamgeArray: payload };
        default:
            return state;
    }
}

export const miniHomepageproduct = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.HOMEPAGE_PRODUCT:
            return { ...state, HomepageproductArray: payload };
        default:
            return state;
    }
}

// *************************SECOND PAGE ALL FUNCTION*****************************************
export const miniMainproduct = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.MAIN_PRODUCT_LISTING:
            return { ...state, MainproductArray: payload };
        default:
            return state;
    }
}

export const miniMainproductimage = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.MAIN_PRODUCT_LISTING_IMAGE:
            return { ...state, MainproductimageArray: payload };
        default:
            return state;
    }
}
export const miniHeadertimage = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.HEADER:
            return { ...state, MainheaderArray: payload };
        default:
            return state;
    }
}
export const miniProductListing = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.PRODUCT_LISTING:
            return { ...state, MainProductListingArray: payload };
        default:
            return state;
    }
}
export const miniAddtocartproduct = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.ADDTOCARTPAGE:
            return { ...state, MainAddtocartArray: payload };
        default:
            return state;
    }
}
export const miniAddtocartsavedata = (state = initialState, { type, payload }) => {
    switch (type) 
    {
        case Actiontype.ADDTOCARTSAVEDATA:
            return { ...state, MainAddtocartsavedataArray: payload };
        default:
            return state;
    }
}

export const miniAddtocartsubtotal = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.ADDTOCARTSUBTOTAL:
            return { ...state, MainAddtocartsubtotalArray: payload };
        default:
            return state;
    }
}
export const allstoriesdata = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.AllSRORIES:
            return { ...state, AllstoriesdataArray: payload };
        default:
            return state;
    }
}

export const allfabricdata = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.FABRICDATA:
            return { ...state, AllFabricdataArray: payload };
        default:
            return state;
    }
}

export const allsearchdata = (state = initialState, { type, payload }) => 
{
    switch (type) {
        case Actiontype.SEARCHDATA:
            return { ...state, AllSearchdataArray: payload };
        default:
            return state;
    }
}
export const allwishlistdata = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.WISHLIST:
            return { ...state, AllWishlistArray: payload };
        default:
            return state;
    }
}
export const alltermsdata = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actiontype.TERMS_CONDITION:
            return { ...state, AllTermsArray: payload };
        default:
            return state;
    }
}


