import type CheckMaterialDetail from "@/types/CheckMaterialDetail";
import http from "./axios";
function getCheckMaterialDetails() {
  return http.get("/check_material_detials");
}
function saveCheckMaterialDetail(material: CheckMaterialDetail) {
  return http.post("/check_material_detials", material);
}

function updateCheckMaterialDetail(id: number, material: CheckMaterialDetail) {
  return http.patch(`/check_material_detials/${id}`, material);
}

function deleteCheckMaterialDetail(id: number) {
  return http.delete(`/check_material_detials/${id}`);
}

export default {
  getCheckMaterialDetails,
  saveCheckMaterialDetail,
  updateCheckMaterialDetail,
  deleteCheckMaterialDetail,
};
