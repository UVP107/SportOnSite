import { Product } from "../types";
import { fetchAPI } from "../lib/api";

export const getAllProducts = async (): Promise<Product[]> => {
  return await fetchAPI<Product[]>("/products");
};

export const getProductDetail = async (id: string): Promise<Product> => {
  return await fetchAPI<Product>(`/products/${id}`);
};