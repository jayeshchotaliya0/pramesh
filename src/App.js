import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
require("es6-promise").polyfill();
require("isomorphic-fetch");

// FRONT DESIGN
// const HomePage = React.lazy(() =>
//   import("./components/Front/HomePage/HomePage")
// );

const Addtocart = React.lazy(() =>
  import("./components/Front/Addtocart/Addtocart")
);
const PageNotFound = React.lazy(() =>
  import("./components/Front/Errorpage/Errorpage")
);
const Checkout = React.lazy(() =>
  import("./components/Front/Checkout/Checkout")
);
const Verifyotp = React.lazy(() =>
  import("./components/Front/Verifyotp/Verifyotp")
);
const Viewcart = React.lazy(() =>
  import("./components/Front/Viewcart/Viewcart")
);
const Stories = React.lazy(() => import("./components/Front/Srories/Stories"));
const FirstStories = React.lazy(() =>
  import("./components/Front/Srories/FirstStories")
);
const SecondPage = React.lazy(() =>
  import("./components/Front/Srories/SecondStories")
);
const ThirdStories = React.lazy(() =>
  import("./components/Front/Srories/ThirdStories")
);
const FourthStories = React.lazy(() =>
  import("./components/Front/Srories/FourthStories")
);
const FifthStories = React.lazy(() =>
  import("./components/Front/Srories/FifthStories")
);

const ContactUs = React.lazy(() =>
  import("./components/Front/Contactus/ContactUs")
);
const Wishlist = React.lazy(() =>
  import("./components/Front/Wishlist/Wishlist")
);
const About = React.lazy(() => import("./components/Front/AboutUs/AboutUs"));

const ReturnExchange = React.lazy(() =>
  import("./components/Front/ReturnExchange/ReturnExchange")
);
const TermsConditions = React.lazy(() =>
  import("./components/Front/TermsConditions/TermsConditions")
);
const PaymentSuccess = React.lazy(() =>
  import("./components/Front/PaymentSuccess/PaymentSuccess")
);

// ******************Language************
const Language = React.lazy(() =>
  import("./components/Front/Language/Language")
);

const Color_listing = React.lazy(() =>
  import("./components/Admin/Color/Color_listing")
);
const Color_add = React.lazy(() =>
  import("./components/Admin/Color/Color_add")
);
const Color_edit = React.lazy(() =>
  import("./components/Admin/Color/Color_Edit")
);

const Fabric_listing = React.lazy(() =>
  import("./components/Admin/Fabric/Fabric_listing")
);
const Fabric_add = React.lazy(() =>
  import("./components/Admin/Fabric/Fabric_add")
);
const Fabric_Edit = React.lazy(() =>
  import("./components/Admin/Fabric/Fabric_Edit")
);

const Terms = React.lazy(() => import("./components/Admin/Termspage/Listing"));
const TermsAdd = React.lazy(() => import("./components/Admin/Termspage/Add"));
const TermsEdit = React.lazy(() => import("./components/Admin/Termspage/Edit"));

const Newsletter_listing = React.lazy(() =>
  import("./components/Admin/Newsletter/Newsletter_listing")
);
const News_Edit = React.lazy(() =>
  import("./components/Admin/Newsletter/News_Edit")
);

const Register = React.lazy(() =>
  import("./components/Front/Register/Register")
);
const Login = React.lazy(() => import("./components/Front/Login/Login"));
const GuestCheckout = React.lazy(() => import("./components/Front/Login/GuestCheckout"));

const MainCategory  = React.lazy(() => import("./components/Front/HomePage/Maincategory"));
const HomePage      = React.lazy(() => import("./components/Front/HomePage/HomePage"));


const AllProduct = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("./components/Front/Product/AllProduct")),
      10
    );
  });
});

const Product_listing = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("./components/Front/Product/Product_listing")),
      10
    );
  });
});

var x = () => {
  return (
    <div className="parentLoader">
      <div className="loader">
        <svg
          width="283"
          height="283"
          viewBox="0 0 283 283"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group 10">
            <g id="flower">
              <path
                id="&#60;Compound Path&#62;"
                d="M118.1 75.4C101 70.5 102.8 49.1 103 46.7C103.067 46.6333 103.1 46.5667 103.1 46.5C101.033 30.7 106.033 21.1 118.1 17.7C130.167 14.2333 137.933 8.33333 141.4 0C144.867 8.33333 152.633 14.2333 164.7 17.7C176.767 21.1 181.8 30.7 179.8 46.5C179.8 46.5667 179.8 46.6333 179.8 46.7C180 49.1 181.8 70.5 164.7 75.4C152.633 78.8667 144.867 84.7667 141.4 93.1C137.933 84.7667 130.167 78.8667 118.1 75.4ZM75.4 164.7C70.5 181.8 49.1 180 46.7 179.8C46.6333 179.8 46.5667 179.8 46.5 179.8C30.7 181.8 21.1 176.767 17.7 164.7C14.2333 152.633 8.33333 144.867 0 141.4C8.33333 138 14.2333 130.267 17.7 118.2C21.1 106.133 30.7 101.1 46.5 103.1C46.5667 103.1 46.6333 103.067 46.7 103C49.1 102.8 70.5 101 75.4 118.2C78.8667 130.267 84.7667 138 93.1 141.4C84.7667 144.867 78.8667 152.633 75.4 164.7ZM207.4 118.2C212.3 101 233.8 102.8 236.1 103C236.167 103.067 236.233 103.1 236.3 103.1C252.1 101.1 261.733 106.133 265.2 118.2C268.6 130.267 274.467 138 282.8 141.4C274.467 144.867 268.6 152.633 265.2 164.7C261.733 176.767 252.1 181.8 236.3 179.8C236.233 179.8 236.167 179.8 236.1 179.8C233.8 180 212.3 181.8 207.4 164.7C204 152.633 198.133 144.867 189.8 141.4C198.133 138 204 130.267 207.4 118.2ZM164.7 207.4C181.8 212.3 180 233.8 179.8 236.1C179.8 236.167 179.8 236.233 179.8 236.3C181.8 252.1 176.767 261.733 164.7 265.2C152.633 268.667 144.867 274.567 141.4 282.9C137.933 274.567 130.167 268.667 118.1 265.2C106.033 261.733 101.033 252.1 103.1 236.3C103.1 236.233 103.067 236.167 103 236.1C102.8 233.8 101 212.3 118.1 207.4C130.167 204 137.933 198.133 141.4 189.8C144.867 198.133 152.633 204 164.7 207.4Z"
                fill="#FF3618"
              />
              <g id="&#60;Clip Group&#62;">
                <g id="&#60;Group&#62;">
                  <path
                    id="&#60;Path&#62;"
                    d="M40.4004 141.4C40.4004 85.7999 85.8004 40.3999 141.4 40.3999C197.1 40.3999 242.4 85.7999 242.4 141.4C242.4 197.1 197.1 242.4 141.4 242.4C85.8004 242.4 40.4004 197.1 40.4004 141.4Z"
                    fill="#FF3618"
                  />
                </g>
              </g>
              <path
                id="&#60;Compound Path&#62;_2"
                d="M111.2 204.6C119.8 220.1 103.4 234 101.6 235.5C101.533 235.567 101.467 235.6 101.4 235.6C91.6666 248.2 81.3332 251.467 70.3999 245.4C59.3999 239.267 49.7332 237.933 41.3999 241.4C44.8666 233.067 43.5332 223.433 37.3999 212.5C31.3332 201.5 34.5999 191.133 47.1999 181.4C47.1999 181.333 47.2332 181.267 47.2999 181.2C48.7999 179.4 62.6999 163 78.2999 171.6C89.2332 177.733 98.8665 179.067 107.2 175.6C103.8 183.933 105.133 193.6 111.2 204.6ZM78.2999 111.2C62.6999 119.8 48.7999 103.4 47.2999 101.6C47.2332 101.533 47.1999 101.5 47.1999 101.5C34.5999 91.6999 31.3332 81.3332 37.3999 70.3999C43.5332 59.3999 44.8666 49.7332 41.3999 41.3999C49.7332 44.8666 59.3999 43.5666 70.3999 37.4999C81.3332 31.3666 91.6666 34.5999 101.4 47.1999C101.467 47.2666 101.533 47.2999 101.6 47.2999C103.4 48.7999 119.8 62.6999 111.2 78.2999C105.133 89.2332 103.8 98.8666 107.2 107.2C98.8665 103.8 89.2332 105.133 78.2999 111.2ZM171.6 78.2999C163 62.6999 179.4 48.7999 181.2 47.2999C181.267 47.2999 181.333 47.2666 181.4 47.1999C191.133 34.5999 201.5 31.3666 212.5 37.4999C223.433 43.5666 233.067 44.8666 241.4 41.3999C237.933 49.7332 239.267 59.3999 245.4 70.3999C251.467 81.3332 248.2 91.6999 235.6 101.5C235.6 101.5 235.567 101.533 235.5 101.6C234 103.4 220.1 119.8 204.5 111.2C193.567 105.133 183.933 103.8 175.6 107.2C179.067 98.9332 177.733 89.2999 171.6 78.2999V78.2999ZM204.5 171.6C220.1 163 234 179.4 235.5 181.2C235.567 181.267 235.6 181.333 235.6 181.4C248.2 191.133 251.467 201.5 245.4 212.5C239.267 223.433 237.933 233.067 241.4 241.4C233.067 237.933 223.433 239.267 212.5 245.4C201.5 251.467 191.133 248.2 181.4 235.6C181.333 235.6 181.267 235.567 181.2 235.5C179.4 234 163 220.1 171.6 204.6C177.733 193.6 179.067 183.933 175.6 175.6C183.933 179.067 193.567 177.733 204.5 171.6V171.6Z"
                fill="#B71E25"
              />
              <g id="&#60;Clip Group&#62;_2">
                <g id="&#60;Group&#62;_2">
                  <path
                    id="&#60;Path&#62;_2"
                    d="M41.3994 141.4C41.3994 86.2999 86.2994 41.3999 141.399 41.3999C196.499 41.3999 241.399 86.2999 241.399 141.4C241.399 196.5 196.499 241.4 141.399 241.4C86.2994 241.4 41.3994 196.5 41.3994 141.4Z"
                    fill="#B71E25"
                  />
                </g>
              </g>
              <path
                id="&#60;Path&#62;_3"
                d="M47.7002 141.4C47.7002 89.8002 89.8002 47.7002 141.4 47.7002C193 47.7002 235.1 89.8002 235.1 141.4C235.1 193 193 235.1 141.4 235.1C89.8002 235.1 47.7002 193 47.7002 141.4Z"
                fill="#FF3618"
              />
              <path
                id="&#60;Path&#62;_4"
                d="M59 141.4C59 96 96 59 141.4 59C186.8 59 223.9 96 223.9 141.4C223.9 186.8 186.8 223.9 141.4 223.9C96 223.9 59 186.8 59 141.4Z"
                fill="#FDB64F"
              />
              <path
                id="&#60;Path&#62;_5"
                d="M82.2998 141.4C82.2998 108.9 108.9 82.2998 141.4 82.2998C174 82.2998 200.5 108.9 200.5 141.4C200.5 174 174 200.5 141.4 200.5C108.9 200.5 82.2998 174 82.2998 141.4Z"
                fill="#B71E25"
              />
            </g>
            <path
              id="&#60;Path&#62;_6"
              d="M153.1 154.7C143.9 154.7 139.4 149.6 139.4 143.6C139.4 138.3 142 135 146.2 135C150.5 135 152.2 137.2 152.2 140.1C152.2 142.9 150.5 145.2 147.9 145.2C144.5 145.2 143.7 142.7 143.7 141.8C143.1 147 145.1 149.6 149.7 149.6C157.1 149.6 159.1 138.3 159.1 129.8C159.1 117.1 153.3 111 145.9 111C141.233 111 137.633 112.133 135.1 114.4V170.9C137.367 173.167 139.067 176.033 140.2 179.5C136.8 177.167 133.1 176 129.1 176C125.1 176 121.4 177.167 118 179.5C119.067 176.033 120.767 173.167 123.1 170.9V113.5C120.767 111.233 119.067 108.4 118 105C121.4 107.267 125.1 108.4 129.1 108.4C134.2 108.4 137.7 105 145.9 105C163.4 105 171.9 114.9 171.9 129.8C171.9 146.9 164 154.7 153.1 154.7V154.7Z"
              fill="white"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

// ***************Product Listing*******************
// const Product_listing = React.lazy(() =>
//   import("./components/Front/Product/Product_listing")
// );

const LazyLogin = React.lazy(() => import("./components/Admin/Login"));
const LazyDashboard = React.lazy(() => import("./components/Admin/Dashboard"));
// ***************USER Components*******************
const LazyListing = React.lazy(() => import("./components/Admin/User/Listing"));
const LazyUseradd = React.lazy(() => import("./components/Admin/User/Useradd"));
const LazyUser_Edit = React.lazy(() =>
  import("./components/Admin/User/User_Edit")
);
// ***************BANNER Components*******************
const LazyAdd = React.lazy(() => import("./components/Admin/Banner/add"));
const LazyBanner_listing = React.lazy(() =>
  import("./components/Admin/Banner/Banner_listing")
);
const LazyBanner_edit = React.lazy(() =>
  import("./components/Admin/Banner/Banner_edit")
);
// ***************IMAGE CONTENT Components*******************
const LazyContentlisting = React.lazy(() =>
  import("./components/Admin/Image_content/Contentlisting")
);
const LazyAddImage = React.lazy(() =>
  import("./components/Admin/Image_content/Addimage")
);
const LazyImage_content_edit = React.lazy(() =>
  import("./components/Admin/Image_content/Image_content_edit")
);
// ***************Stories Components*******************
const LazySrorieslisting = React.lazy(() =>
  import("./components/Admin/Srories/Srorieslisting")
);
const LazyStories_edit = React.lazy(() =>
  import("./components/Admin/Srories/Stories_edit")
);
const LazyAddstories = React.lazy(() =>
  import("./components/Admin/Srories/Addstories")
);

const FirstPage_image = React.lazy(() =>
  import("./components/Admin/Srories/FirstPage_image")
);
const SecondePage = React.lazy(() =>
  import("./components/Admin/Srories/SecondePage")
);

// ***************Product Components*******************
const LazyProductlisting = React.lazy(() =>
  import("./components/Admin/Product/Productlisting")
);
const LazyAddproduct = React.lazy(() =>
  import("./components/Admin/Product/Addproduct")
);
const LazyProduct_edit = React.lazy(() =>
  import("./components/Admin/Product/Product_edit")
);
const LazyVariant = React.lazy(() =>
  import("./components/Admin/Product/Variants")
);
const LazyProductImage = React.lazy(() =>
  import("./components/Admin/Product/Product_image")
);
// ***************Header Menu Components *******************
const LazyHeader_listing = React.lazy(() =>import("./components/Admin/Header_menu/Header_menu_listing"));
const LazyHeader_menuadd_listing = React.lazy(() =>import("./components/Admin/Header_menu/add"));
const LazyHeader_menuedit_listing = React.lazy(() =>import("./components/Admin/Header_menu/Header_menu_edit"));

// ***************Header Menu Components END****************

// ***************Materials Components *******************
const LazyMaterial_listing      = React.lazy(() =>import("./components/Admin/Material/Matirial_listing"));
const LazyMaterialadd_listing   = React.lazy(() =>import("./components/Admin/Material/add"));
const LazyMaterialedit_listing  = React.lazy(() =>import("./components/Admin/Material/Matirial_edit"));

// ***************Materials Components END****************





// ***************Category Components*******************
const LazyCategory_listing = React.lazy(() =>
  import("./components/Admin/Category/Category_listing")
);
const LazyCategory_add = React.lazy(() =>
  import("./components/Admin/Category/add")
);
const LazyCategory_edit = React.lazy(() =>
  import("./components/Admin/Category/Category_edit")
);
// ***************Sub Category Components*******************
const LazySubcategory_listing = React.lazy(() =>
  import("./components/Admin/Subcategory/Subcategory_listing")
);
const LazySubcategoryadd = React.lazy(() =>
  import("./components/Admin/Subcategory/add")
);
const LazySubcategory_edit = React.lazy(() =>
  import("./components/Admin/Subcategory/Subcategory_edit")
);
// ***************Order Components*******************
const LazyOrder_listing = React.lazy(() =>
  import("./components/Admin/Order/Order_Listing")
);
const OrderView = React.lazy(() =>
  import("./components/Admin/Order/OrderView")
);
const OrderNote = React.lazy(() =>
  import("./components/Admin/Order/OrderNote")
);
const OrderPdf = React.lazy(() => import("./components/Admin/Order/OrderPdf"));

// ***************Variant Components*******************
const LazyVariants_listing = React.lazy(() =>
  import("./components/Admin/Variants/Variants_listing")
);
const LazyVariants_add = React.lazy(() =>
  import("./components/Admin/Variants/add")
);
const LazyVariants_edit = React.lazy(() =>
  import("./components/Admin/Variants/Variants_edit")
);
// ***************Variant option Components*******************
const LazyVariant_option_listing = React.lazy(() =>
  import("./components/Admin/Variants_option/Variants_option_listing")
);
const LazyVariant_option_add = React.lazy(() =>
  import("./components/Admin/Variants_option/add")
);
const LazyVariant_option_edit = React.lazy(() =>
  import("./components/Admin/Variants_option/Option_edit")
);

class App extends React.Component {
  render() {
    //admin login

    const iAdminId = localStorage.getItem("iAdminId");
    const vUserName = localStorage.getItem("vUserName");
    const iUserId = localStorage.getItem("iUserId");
    const GuestcheckoutId = localStorage.getItem("GuestcheckoutId");
    
    const hours = 10;
    const now = new Date().getTime();

    var setupTime = localStorage.getItem("setupTime");
    if (setupTime === null) {
      localStorage.setItem("setupTime", now);
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.removeItem("iAdminId");
        localStorage.removeItem("vUserName");
        localStorage.removeItem("GuestcheckoutId");
        localStorage.setItem("setupTime", now);
      }
    }
    // *****************Cookie data Store *************************************
    var cookie = localStorage.getItem("cookie");
    if (cookie === null) {
      localStorage.setItem("cookie", now);
    }
    
    return (
      <Router>
        {/* **********************************FRONT********************************************************** */}
        <Suspense fallback={x()}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/lan" component={Language} />

            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/login"
              component={iUserId ? HomePage : Login}
            />
            <Route exact path="/typeofsarees" component={MainCategory} />
            <Route exact path="/product-listing" component={AllProduct} />
            <Route exact path="/product-listing/:id" component={AllProduct} />
            <Route
              exact
              path="/product-listing/:name/:id"
              component={Product_listing}
            />
            <Route exact path="/addtocart/:id/:id" component={Addtocart} />
            <Route exact path="/wishlist" component={Wishlist} />
            <Route exact path="/aboutus" component={About} />
            <Route exact path="/returnexchange" component={ReturnExchange} />
            <Route exact path="/termscondition" component={TermsConditions} />
            <Route exact path="/paymentsuccess" component={PaymentSuccess} />
            <Route exact path="/loginType" component={iUserId ? HomePage : GuestCheckout} />
            

            <Route
              exact
              path="/checkout"
              component={iUserId>0 || GuestcheckoutId ? Checkout : GuestCheckout}
            />
            <Route
              exact
              path="/verifyotp"
              component={iUserId ? PageNotFound : Verifyotp}
            />
            <Route exact path="/viewcart" component={Viewcart} />

            {/* *************************Stories Page ****************************************** */}
            <Route exact path="/stories" component={Stories} />
            <Route exact path="/FirstStories" component={FirstStories} />
            <Route exact path="/SecondStories" component={SecondPage} />
            <Route exact path="/ThirdStories" component={ThirdStories} />
            <Route exact path="/FourthStories" component={FourthStories} />
            <Route exact path="/FifthStories" component={FifthStories} />

            <Route exact path="/contactus" component={ContactUs} />

            <Route exact path="/admin/login" component={LazyLogin} />
            <Route
              exact
              path="/admin/"
              component={LazyDashboard}
              iAdminId={iAdminId}
              vUserName={vUserName}
            />

            {/* *********************************USER COMPONENT************************************ */}

            <Route exact path="/admin/listing" component={LazyListing} />
            <Route
              exact
              path="/admin/listing/useradd"
              component={LazyUseradd}
            />
            <Route
              exact
              path="/admin/user/edit/:id"
              component={LazyUser_Edit}
            />

            {/* *********************************BANNER COMPONENT************************************ */}
            <Route exact path="/admin/banner" component={LazyBanner_listing} />
            <Route exact path="/admin/banner/add" component={LazyAdd} />
            <Route
              exact
              path="/admin/banner/edit/:id"
              component={LazyBanner_edit}
            />

            {/* *********************************IMAGE CONTENT COMPONENT************************************ */}
            <Route
              exact
              path="/admin/image-content"
              component={LazyContentlisting}
            />
            <Route exact path="/admin/image-add" component={LazyAddImage} />
            <Route
              exact
              path="/admin/image-content/edit/:id"
              component={LazyImage_content_edit}
            />

            {/* *********************************STORIES COMPONENT************************************ */}

            <Route exact path="/admin/stories" component={LazySrorieslisting} />
            <Route exact path="/admin/stories/add" component={LazyAddstories} />
            <Route
              exact
              path="/admin/stories/edit/:id"
              component={LazyStories_edit}
            />
            <Route
              exact
              path="/admin/firstpage/image/:id"
              component={FirstPage_image}
            />
            <Route
              exact
              path="/admin/second/image/:id"
              component={SecondePage}
            />

            {/* *********************************PRODUCT COMPONENT************************************ */}

            <Route
              exact
              path="/admin/product/listing"
              component={LazyProductlisting}
            />
            <Route exact path="/admin/product/add" component={LazyAddproduct} />
            <Route
              exact
              path="/admin/product/edit/:id"
              component={LazyProduct_edit}
            />
            <Route
              exact
              path="/admin/product/variants"
              component={LazyVariant}
            />
            <Route
              exact
              path="/admin/product-image/:id"
              component={LazyProductImage}
            />
            {/* **********************************Header COMPONENT************************************ */}
            <Route exact path="/admin/header_menu/listing" component={LazyHeader_listing}/>
            <Route exact path="/admin/header_menu/add" component={LazyHeader_menuadd_listing}/>
            <Route exact path="/admin/header_menu/edit/:id" component={LazyHeader_menuedit_listing}/>

            <Route exact path="/admin/material/listing" component={LazyMaterial_listing}/>
            <Route exact path="/admin/material/add" component={LazyMaterialadd_listing}/>
            <Route exact path="/admin/material/edit/:id" component={LazyMaterialedit_listing}/>


            {/* **********************************CATEGORY COMPONENT************************************ */}
            <Route
              exact
              path="/admin/category/listing"
              component={LazyCategory_listing}
            />
            <Route
              exact
              path="/admin/category/add"
              component={LazyCategory_add}
            />
            <Route
              exact
              path="/admin/category/edit/:id"
              component={LazyCategory_edit}
            />

            {/* *********************************SUB CATEGORY COMPONENT************************************ */}

            <Route
              exact
              path="/admin/subcategory/listing/:id"
              component={LazySubcategory_listing}
            />
            <Route
              exact
              path="/admin/subcategory/add"
              component={LazySubcategoryadd}
            />
            <Route
              exact
              path="/admin/subcategory/edit/:id"
              component={LazySubcategory_edit}
            />

            {/* *********************************Order COMPONENT************************************ */}
            <Route
              exact
              path="/admin/order/listing"
              component={LazyOrder_listing}
            />
            <Route exact path="/admin/order_view/:id" component={OrderView} />
            <Route exact path="/admin/order_note/:id" component={OrderNote} />
            <Route exact path="/admin/pdf/:id" component={OrderPdf} />

            {/* *********************************News Lette COMPONENT************************************ */}
            <Route
              exact
              path="/admin/newsletter"
              component={Newsletter_listing}
            />
            <Route
              exact
              path="/admin/news_letter/edit/:id"
              component={News_Edit}
            />

            {/* *********************************Variant Option COMPONENT************************************ */}

            <Route
              exact
              path="/admin/variants/listing"
              component={LazyVariants_listing}
            />
            <Route
              exact
              path="/admin/variants/add"
              component={LazyVariants_add}
            />
            <Route
              exact
              path="/admin/variants/edit/:id"
              component={LazyVariants_edit}
            />

            {/* *********************************Variant Option COMPONENT************************************ */}

            <Route
              exact
              path="/admin/variant_option/listing"
              component={LazyVariant_option_listing}
            />
            <Route
              exact
              path="/admin/option/add"
              component={LazyVariant_option_add}
            />
            <Route
              exact
              path="/admin/option/edit/:id"
              component={LazyVariant_option_edit}
            />
            {/* *********************************Variant Option COMPONENT************************************ */}
            <Route
              exact
              path="/admin/color/listing"
              component={Color_listing}
            />
            <Route exact path="/admin/color/add" component={Color_add} />
            <Route exact path="/admin/color/edit/:id" component={Color_edit} />

            <Route exact path="/admin/terms/listing" component={Terms} />
            <Route exact path="/admin/terms/add" component={TermsAdd} />
            <Route exact path="/admin/terms/edit/:id" component={TermsEdit} />

            <Route
              exact
              path="/admin/fabric/listing"
              component={Fabric_listing}
            />
            <Route exact path="/admin/fabric/add" component={Fabric_add} />
            <Route
              exact
              path="/admin/fabric/edit/:id"
              component={Fabric_Edit}
            />

            <Route component={PageNotFound} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
export default App;
