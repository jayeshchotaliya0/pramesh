import { Actiontype } from "../contants/action-types";

export const setProducts = (products) => {
    return {
        type: Actiontype.SET_BANNER,
        payload: products

    }
}

export const setMinibanner = (banner) => {
    return {
        type: Actiontype.MINI_BANNER,
        payload: banner

    }
}
export const setFirstImage =(image) => {
    return {
        type: Actiontype.FIRST_IMAGE_HOMEPAGE,
        payload: image
    }
}
export const setSecondImage = (image) => {
    return {
        type: Actiontype.SECOND_IMAGE_HOMEPAGE,
        payload: image
    }
}
export const setThirdImage = (thirdImage) => {
    // console.log("Action File " , thirdImage);
    return {
        type: Actiontype.THIRD_IMAGE_HOMEPAGE,
        payload: thirdImage
    }
}

export const setHomepagedata = (homepageproduct) => {
    return {
        type: Actiontype.HOMEPAGE_PRODUCT,
        payload: homepageproduct
    }
}
// *************************SECOND PAGE ALL FUNCTION*****************************************
export const setMainproductdata = (mainproductdata) => {
    return {
        type: Actiontype.MAIN_PRODUCT_LISTING,
        payload: mainproductdata
    }
}
export const setMainproductimage = (mainproductimage) => {
    return {
        type: Actiontype.MAIN_PRODUCT_LISTING_IMAGE,
        payload: mainproductimage
    }
}
export const setMainheader = (header) => {
    return {
        type: Actiontype.HEADER,
        payload: header
    }
}
export const setProductListing= (product) => {
    return {
        type: Actiontype.PRODUCT_LISTING,
        payload: product
    }
}
export const setAddtocartpage =(singleproduct) => {
    return {
        type: Actiontype.ADDTOCARTPAGE,
        payload: singleproduct
    }
}

export const setAddtocartsavedata = (cartdata) => {
    return {
        type: Actiontype.ADDTOCARTSAVEDATA,
        payload: cartdata
    }
}

export const setAddtocartsubtotal = (total) => {
    return {
        type: Actiontype.ADDTOCARTSUBTOTAL,
        payload: total
    }
}

export const setAllstories = (stories) => {
    return {
        type: Actiontype.AllSRORIES,
        payload: stories
    }
}

export const setAllfabric = (fabricdata) => {
    return {
        type: Actiontype.FABRICDATA,
        payload: fabricdata
    }
}

export const setSearchdata = (searchdata) => {
    return {
        type: Actiontype.SEARCHDATA,
        payload: searchdata
    }
}
export const setWishlist = (wishlist) => {
    return {
        type: Actiontype.WISHLIST,
        payload: wishlist
    }
}
export const setTermsCondition = (terms) => {
    return {
        type: Actiontype.TERMS_CONDITION,
        payload: terms
    }
}


