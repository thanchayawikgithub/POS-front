import type RecieptDetail from "@/types/RecieptDetail";
import http from "./axios";
function getRecieptDetail() {
  return http.get("/reciept_details");
}
function saveRecieptDetail(recieptDetail: RecieptDetail) {
  return http.post("/reciept_details", recieptDetail);
}

function updateRecieptDetail(id: number, recieptDetail: RecieptDetail) {
  return http.patch(`/reciept_details/${id}`, recieptDetail);
}

function deleteRecieptDetail(id: number) {
  return http.delete(`/reciept_details/${id}`);
}

export default {
  getRecieptDetail,
  saveRecieptDetail,
  updateRecieptDetail,
  deleteRecieptDetail,
};
