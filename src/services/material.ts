import http from "./axios";
function getMaterials() {
  return http.get("/materials");
}

export default { getMaterials };
