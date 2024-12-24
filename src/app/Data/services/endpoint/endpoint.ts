
export const ENDPOINT = {
  MAIN_HOST: 'https://apieke.ekestore.net/api',
  urlApiFile: 'https://apieke.ekestore.net/',
  GENERAL: {
    UPLOAD_IMG_WITH_FOLDER_NAME: 'https://apieke.ekestore.net/api/General/UploadImages?FolderName=',

    FOLDER_NAME: {
      CATEGORY: 'CATEGORIES',
      PRODUCTS: 'PRODUCTS',
      BRAND: 'BRANDS',
      COUPONS: 'COUPONS',
      SUB_CATEGORY: 'SUB_CATEGORY',
      PROFILE:"profile",
      FOLDER_NAME: {
        CATEGORY: 'CATEGORIES',
        PRODUCTS: 'PRODUCTS',
        BRAND: 'BRANDS',
        COUPONS: 'COUPONS',
        SUB_CATEGORY: 'SUB_CATEGORY',
      }
    }
  },
  AUTH: {
    LOGIN: '/Auth/login',
    FORGOT_PASSWORD: '/Auth/ForgotPassword',
    CHECK_OTP: '/Auth/CheckOTPCode',
    RESET_PASSWORD: '/Auth/ResetPassword',
    GET_ALL_COUNTRIES: '/Country/GetAllCountries',
    REGISTER_STORE_ADMIN: '/Auth/registerStoreAdmin',
  },
  BRANDS: {
    GET_ALL_BRANDS: '/Brands/GetAllBrands',
    GET_BRAND_BY_ID: '/Brands/GetBrandById?Id=',
    ADD_BRAND: '/Brands/AddBrand',
    UPDATE_BRAND: '/Brands/UpdateBrand/',
    DELETE_BRAND: '/Brands?Id=',
  },
  CUSTOMERS: {
    GET_ALL_CUSTOMERS: '/Users/GetStoreCustomers',
    GET_CUSTOMER_BY_ID: '/Users/GetCustomerById?CustomerId=',
    GET_CUSTOMER_HISTORY: '/OrderAdmin/GetCutsomerOrderHistory',
    LOCK_CUSTOMER: '/Users/LockUser?CustomerId=',
    UNLOCK_CUSTOMER: '/Users/UnLockUser?CustomerId=',
  },
  COUPONS: {
    GET_ALL_COUPONS: '/Coupon/getAllCoupons',
    GET_COUPON_BY_ID: '/Coupon/getCouponById?Id=',
    ADD_COUPON: '/Coupon/AddCoupon',
    UPDATE_COUPON: '/Coupon/UpdateCoupon/',
    DELETE_COUPON: '/Coupon?Id=',
    GENERATE_CODE: '/Coupon/GetGenerateCode',
    GET_ALL_DISCOUNT_TYPE: '/Coupon/GetAllDiscountType'
  },
  CATEGORIES: {
    GET_ALL_CATEGORIES: '/Categories/GetAllCategories',
    GET_ALL_STORE_CATEGORIES: '/Categories/GetStoreCategories',
    GET_ALL_CATEGORIES_LIST_OF_VALUE: '/ListOfValues/getCategories',
    GET_CATEGORIES_TREE_LIST: '/Categories/GetAllCategoriesTree',
    GET_CATEGORY_BY_ID: '/Categories/GetCategoryById?Id=',
    ADD_CATEGORY: '/Categories/AddCategory',
    UPDATE_CATEGORY: '/Categories/UpdateCategory/',
    DELETE_CATEGORY: '/Categories?Id=',

  },
  SUB_CATEGORY: {
    GET_SUB_CATEGORIES_BY_CATEGORY_ID: '/SubCategories/GetSubCategoryByCategoryId',
    GET_SUB_CATEGORIES_LIST_OF_VIEW: '/ListOfValues/getSubCategories',
    GET_SUB_CATEGORY_BY_ID: '/SubCategories/GetSubCategoryById?Id=',
    ADD_SUB_CATEGORY: '/SubCategories/AddSubCategory',
    UPDATE_SUB_CATEGORY: '/SubCategories/UpdateSubCategory/',
    DELETE_SUB_CATEGORY: '/SubCategories?Id=',
  },
  PRODUCTS: {
    GET_ALL_PRODUCTS: '/Products/GetAllProducts',
    GET_PRODUCT_BY_ID: '/Products/GetProductById?Id=',
    ADD_PRODUCT: '/Products/AddProduct',
    UPDATE_PRODUCT: '/Products/UpdateProduct/',
    UPDATE_PRODUCT_STATUS: '/SetProductStatus',
    DELETE_PRODUCT: '/Products?Id=',
    UPDATE_PRODUCT_MAIN_IMG: '/Products/updateMainImage?productImageId=',
    DELETE_PRODUCT_IMG: '/Products/ProductImages?Id='
  },
  ORDERS: {
    GET_ALL_ORDERS: '/OrderAdmin/GetAllOrders',
    GET_ORDER_BY_ID: "/OrderAdmin/getOrderById?Id=",
    GET_ORDER_HISTORY: "/OrderAdmin/GetOrderHistory?OrderId=",
    CHANGE_ORDER_STATUS: "/OrderAdmin/UpdateOrderStatus?OrderId=",
    GET_SHIPMENT_METHODS: "/Order/GetShipmentMethod",
    SHIPPING_WITH_OTO: "/OTO/CreateOrder",
    UPDATE_ORDER_DELIVERY_ESTIMATION: "/order/UpdateOrderDeliveryEstimation"
  },
  LIST_OF_VALUES: {
    PRODUCTS: "/ListOfValues/getProducts",
    CATEGORIES: '/Categories/GetAllCategories?limit=999&page=1',
    BRANDS: '/ListOfValues/getBrands',
    CITIES: "/City/GetAllCities",
    COUPONS: "/COUPON/GetAllCOUPONS"
  },
  REPORTS: {
    PRODUCT_SALE: "/ReportOrder/GetProductSales",
    CATEGORY_SALE: "/ReportOrder/GetCategorySales",
    CITY_SALE: "/ReportOrder/GetCitySales",
    BRANDS_SALE: "/ReportOrder/GetBrandSales",
    COUPON_SALE: "/ReportOrder/GetCOUPONSales"
  },
  THEME_BUILDER: {
    GET_ALL_PAGES: "/Pages",
    UPDATE_ALL_PAGES: "/Pages?pageId=",
    ADD_SECTION: "/Sections",
    DELETE_SECTION: "/Sections?SectionId=",
    UPDATE_SECTION_TYPE_TOP_CATEGORY:"/SectionMultiTypes/UpdatSectionTypeTopCategory",
    UPDATE_SECTION_TYPE_BRANDS:"/SectionMultiTypes/UpdatSectionTypeTopBrand",
    UPDATE_SECTION_TITLE:"/Sections/updateTitle",
    UPDATE_SECTION_TYPE_BIG_BANNER:"/SectionMultiTypes/UpdateSectionTypeBigBanners",
    UPDATE_SECTION_TYPE_IMAGES:"/SectionMultiTypes/UpdatSectionTypeImage",
    UPDATE_SECTION_TYPE_SITE_FEATURES:"/SectionMultiTypes/UpdateSectionTypeSiteFeatuers",
    UPDATE_SECTION_TYPE_PRODUCTS:"/SectionMultiTypes/UpdatSectionTypeProduct",
    GET_PAGE_SECTION_DETAILS:"/SectionMultiTypes/GetPageSectionDetailsAdmin?SectionId=",
    ADD_SECTION_TYPE_TOP_CATEGORY:"/SectionMultiTypes/AddSectionTypeTopCategory"
  },
  UNITS: {
    GET_ALL_UNITS: '/Units/GetAllUnits'
  },
  PROFILE: {
    GET_STORE_PROFILE: "/StoreProfile/GetStoreProfile",
    GET_STORE_ADDRESS: "/StoreProfile/GetStoreProfileAddress",
    UPDATE_STORE_PROFILE: "/StoreProfile/UpdateStoreProfile",
    UPDATE_STORE_ADDRESS: "/StoreProfile/UpdateStoreAddress",
    CITIES_BY_ID:"/City/GetCitiesByCountryId?Id="
  }
};
