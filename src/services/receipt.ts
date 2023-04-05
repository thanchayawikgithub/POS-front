import type Reciept from "@/types/RecieptDetail";
import http from "./axios";
function getReciept() {
  return http.get("/reciepts");
}
function getLastReceipt() {
  return http.get("/reciepts/lastReceipt");
}
function saveReciept(reciept: {
  recieptDetails: {
    productId: number;
    rcd_amount: number;
    rcd_price: number;
  }[];
  rec_queue: number;
  rec_time: number;
  rec_discount: number;
  rec_total: number;
  rec_changed: number;
  rec_received: number;
  rec_payment: string;
  employeeId: number;
  customerId: number;
  storeId: number;
}) {
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
  getLastReceipt,
};
