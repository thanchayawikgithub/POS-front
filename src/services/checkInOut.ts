import http from "./axios";
function getCheckInOut() {
  return http.get("/check-in-outs");
}
function saveCheckInOut(username: string, password: string) {
  return http.post("/check-in-outs", { username, password });
}

function updateCheckInOut(username: string, password: string) {
  return http.patch("/check-in-outs", { username, password });
}

export default {
  getCheckInOut,
  saveCheckInOut,
  updateCheckInOut,
};