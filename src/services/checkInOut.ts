import http from "./axios";

function getCheckInOutsByEmpId(id: number) {
  return http.get(`/check-in-outs/employee/${id}`);
}

function getCheckInOut(params: any) {
  return http.get("/check-in-outs", { params: params });
}
function saveCheckInOut(username: string, password: string) {
  return http.post("/check-in-outs", { username, password });
}

function updateCheckInOut(id: number, username: string, password: string) {
  return http.patch(`/check-in-outs/${id}`, { username, password });
}

export default {
  getCheckInOut,
  saveCheckInOut,
  updateCheckInOut,
  getCheckInOutsByEmpId,
};
