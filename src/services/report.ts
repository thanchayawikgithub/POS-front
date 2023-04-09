import http from "./axios";

function getStoreRep() {
  return http.get("/reports/storeview");
}

function getMatirial() {
  return http.get("/reports/getmat");
}

function getProductSalesQtyDrink() {
  return http.get("/reports/getSalesQtyDrink");
}

export default {
  getStoreRep,
  getMatirial,
  getProductSalesQtyDrink,
};
