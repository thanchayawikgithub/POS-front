import type CheckMaterial from "./CheckMaterial";
import type Material from "./Material";

export default interface CheckMaterialDetail {
  cmd_id?: number;
  cmd_name: string;
  cmd_qty_last: number;
  cmd_qty_remain: number;
  cmd_qty_expire: Date;
  checkmaterial: CheckMaterial;
  material: Material;
}
