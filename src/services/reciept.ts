import type Reciept from "@/types/RecieptDetail";
import http from "./axios";
function getReciept() {
  return http.get("/reciepts");
}
function saveReciept(reciept: Reciept) {
  return http.post("/reciepts", reciept);
}

function updateReciept(id: number, reciept: Reciept) {
  return http.patch(`/reciepts/${id}`, reciept);
}

function deleteReciept(id: number) {
  return http.delete(`/reciepts/${id}`);
}

export default {
  getReciept,
  saveReciept,
  updateReciept,
  deleteReciept,
};
