import http from "./axios";

function getStores() {
  return http.get("/Stores");
}

export default { getStores };
