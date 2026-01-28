"use client";

import TransactionTable from "../../components/transactions/transaction-table";
import TransactiontModal from "../../components/transactions/transaction-modal";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import {
  getAllTransactions,
  updateTransaction,
} from "@/app/services/transaction-services";
import { Transaction } from "@/app/types";

const TransactionManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async () => {
    try {
      const data = await getAllTransactions();
      if (data) {
        setTransactions(data);
      }
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (
    id: string,
    status: "paid" | "rejected",
  ) => {
    try {
      const formData = new FormData();
      formData.append("status", status);
      await updateTransaction(id, formData);

      toast.success("Transaction status updated");
      await fetchTransactions();
    } catch (err) {
      console.error("Failed to update transaction status", err);
      toast.error("Failed to update transaction status");
    } finally {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await getAllTransactions();
        if (isMounted && data) {
          setTransactions(data);
        }
      } catch (err) {
        console.error("Initial load failed:", err);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Transaction Management</h1>
          <p className="opacity-50">
            Verify incoming payments and manage orders.
          </p>
        </div>
      </div>
      <TransactionTable
        transactions={transactions}
        onViewDetails={handleViewDetails}
      />
      <TransactiontModal
        transaction={selectedTransaction}
        onStatusChange={handleStatusChange}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default TransactionManagement;
