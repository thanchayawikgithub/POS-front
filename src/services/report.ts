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

function getProductSalesQtyBakery() {
  return http.get("/reports/getSalesQtyBakery");
}

function getProductSalesQtyFood() {
  return http.get("/reports/getSalesQtyFood");
}
function getDayOfWeekTotalSales() {
  return http.get("/reports/getDayOfWeekTotalSales");
}

function getDailySales() {
  return http.get("/reports/getDailySales");
}

export default {
  getDailySales,
  getStoreRep,
  getMatirial,
  getProductSalesQtyDrink,
  getProductSalesQtyBakery,
  getProductSalesQtyFood,
  getDayOfWeekTotalSales,
};
