import http from "./axios";

function saveSalary(id: number) {
  return http.post(`/salaries/${id}`);
}

export default {
  saveSalary,
};
