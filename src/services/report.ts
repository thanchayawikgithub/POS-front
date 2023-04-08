import http from "./axios";

function getStoreRep() {
  return http.get("/reports/storeview");
}

function getMatirial() {
  return http.get("/reports/getmat");
}

export default {
  getStoreRep,
  getMatirial,
};
