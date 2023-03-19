import type Customer from "@/types/Customer";
import http from "./axios";
function getCustomers() {
  return http.get("/customers");
}

function getCustomerByTel(tel: string) {
  return http.get(`/customers/tel/${tel}`);
}

function saveCustomers(customer: Customer) {
  return http.post("/customers", customer);
}
function updateCustomers(id: number, customer: Customer) {
  return http.patch(`/customers/${id}`, customer);
}
function deleteCustomers(id: number) {
  return http.delete(`/customers/${id}`);
}
export default {
  getCustomers,
  saveCustomers,
  updateCustomers,
  deleteCustomers,
  getCustomerByTel,
};
