import type Product from "./Product";

export default interface Category {
  category_id: number;

  category_name: string;

  products: Product[];
}
