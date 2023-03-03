export default interface Store {
  store_id: number;
  store_name: string;
  store_province: string;
  store_district: string;
  store_sub_district: string;
  store_tel: string;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
}
