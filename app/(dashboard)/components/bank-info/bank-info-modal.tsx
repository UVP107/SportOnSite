import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import { Bank } from "@/app/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createBank, updateBank } from "@/app/services/bank-services";

type TBankInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  bank: Bank | null;
  onSuccess: () => void;
};

const BankInfoModal = ({
  isOpen,
  onClose,
  bank,
  onSuccess,
}: TBankInfoModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Bank>>({
    accountName: "",
    accountNumber: "",
    bankName: "",
  });

  const isEditMode = !!bank;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateBank(bank._id, formData);
      } else {
        await createBank(formData);
      }

      setFormData({
        accountName: "",
        accountNumber: "",
        bankName: "",
      });
      onSuccess?.();
      onClose();
      toast.success(
        isEditMode
          ? "Bank info updated successfully"
          : "Bank info created succesfully",
      );
    } catch (error) {
      console.error(
        isEditMode
          ? "Failed to update bank info"
          : "Failed to create bank info",
        error,
      );
      toast.error(
        isEditMode
          ? "Failed to update bank info"
          : "Failed to create bank info",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        accountName: bank.accountName,
        accountNumber: bank.accountNumber,
        bankName: bank.bankName,
      });
    } else if (isOpen) {
      setFormData({
        accountName: "",
        accountNumber: "",
        bankName: "",
      });
    }
  }, [bank, isEditMode, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Bank Account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 w-full">
          <div className="input-group-admin">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="e. g. Mandiri, BCA, BRI"
            />
          </div>
          <div className="input-group-admin">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="123124344234234"
            />
          </div>
          <div className="input-group-admin">
            <label htmlFor="accountName">Account Name / Holder</label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              placeholder="Holder Name as registered on the account"
            />
          </div>
        </div>
        <Button
          className="ml-auto mt-3 rounded-lg"
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isEditMode ? "Update Bank Info" : "Create Bank Info"}
        </Button>
      </form>
    </Modal>
  );
};

export default BankInfoModal;
