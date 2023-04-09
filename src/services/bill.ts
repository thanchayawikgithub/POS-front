import http from "./axios";
function getBills(params: any) {
  return http.get("/bill", { params: params });
}

function saveBill(bill: {
  billDetails: { materialId: number; bill_detail_amount: number }[];
  bill_shop_name: string;
  bill_total: number;
  bill_buy: number;
  bill_change: number;
}) {
  return http.post("/bill", bill);
}

function deleteBill(id: number) {
  return http.delete(`/bill/${id}`);
}

export default {
  getBills,
  saveBill,
  deleteBill,
};
