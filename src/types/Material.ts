export default interface Material {
  mat_id?: number;
  mat_name: string;
  mat_min_quantity: number;
  mat_quantity: number;
  mat_unit: string;
  mat_price_per_unit: number;
  mat_remain?: number;
  mat_shop_name?: string;
  mat_buy_amount?: number;
  mat_exp?: number;
  mat_check?: number;
  mat_image?: string;
}
