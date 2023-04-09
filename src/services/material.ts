import type Material from "@/types/Material";
import http from "./axios";
function getMaterials() {
  return http.get("/materials");
}
function getMaterialsImage() {
  return http.get("/materials/image");
}

function getMaterialsById() {
  return http.get("/materials/:id");
}
function saveMaterial(material: Material) {
  return http.post("/materials", material);
}

function getMaterialsByShopName(shopName: string) {
  return http.get(`/materials/shopName/${shopName}`);
}

function updateMaterial(id: number, material: Material) {
  return http.patch(`/materials/${id}`, material);
}

function deleteMaterial(id: number) {
  return http.delete(`/materials/${id}`);
}

export default {
  getMaterials,
  saveMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialsById,
  getMaterialsByShopName,
};
