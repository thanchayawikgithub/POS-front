import type CheckMaterial from "@/types/checkMaterial";
import http from "./axios";
function getCheckMaterials() {
  return http.get("/check_materials");
}
function saveCheckMaterial(check_material: CheckMaterial) {
  return http.post("/check_materials", check_material);
}

function updateCheckMaterial(id: number, check_material: CheckMaterial) {
  return http.patch(`/check_materials/${id}`, check_material);
}

function deleteCheckMaterial(id: number) {
  return http.delete(`/check_materials/${id}`);
}

export default {
  getCheckMaterials,
  saveCheckMaterial,
  updateCheckMaterial,
  deleteCheckMaterial,
};
