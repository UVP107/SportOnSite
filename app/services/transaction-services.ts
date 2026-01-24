import { Transactions } from "../types";
import { fetchAPI } from "../lib/api";

export const transactionCheckout = async (
  form: FormData,
): Promise<Transactions> => {
  return await fetchAPI<Transactions>("/transactions/checkout", {
    method: "POST",
    body: form,
  });
};

export const getTransactionStatusById = async (id: string): Promise<Transactions> => {
  return await fetchAPI<Transactions>(`/transactions/${id}`);
};
