import type CheckMaterial from "@/types/CheckMaterial";
import http from "./axios";
function getCheckMaterials() {
  return http.get("/check_materials");
}
function saveCheckMaterial(check_material: {
  checkMaterialDetails: {
    MaterialId: number;
    cmd_qty_remain: number;
    cmd_qty_expire: number;
  }[];
  EmployeeId: number;
}) {
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
