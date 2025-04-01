// API Configuration using environment variables
const apiConfig = {
    productList: import.meta.env.VITE_API_BASE_URL + '/getProducts',
    uomList: import.meta.env.VITE_API_BASE_URL + '/getUOM',
    productSave: import.meta.env.VITE_API_BASE_URL + '/insertProduct',
    productDelete: import.meta.env.VITE_API_BASE_URL + '/deleteProduct',
    orderList: import.meta.env.VITE_API_BASE_URL + '/getAllOrders',
    orderSave: import.meta.env.VITE_API_BASE_URL + '/insertOrder',
    fakeStoreProducts: import.meta.env.VITE_FAKE_STORE_API_URL
  };
  
  export default apiConfig;