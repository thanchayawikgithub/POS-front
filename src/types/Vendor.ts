import type VendorMat from "./VendorMat";

export default interface Vendor {
  vendor_id: number;
  vendor_name: string;
  vendorMat: VendorMat[];
}
