"use client";

import { FiPlus } from "react-icons/fi";
import { useEffect, useState, useCallback } from "react";
import Button from "@/app/(landing)/components/ui/button";
import CategoryTable from "../../components/categories/category-table";
import CategoryModal from "../../components/categories/category-modal";
import {
  deleteCategory,
  getAllCategories,
} from "@/app/services/category-services";
import { Category } from "@/app/types";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";

const CategoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categories, setCategories] = useState<Category[]>([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getAllCategories();
      if (data) {
        setCategories(data);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  }, []);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategoryToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDeleteId) return;
    try {
      await deleteCategory(categoryToDeleteId);
      toast.success("Category deleted successfully");
      setIsDeleteModalOpen(false);
      setCategoryToDeleteId("");
      fetchCategories(); 
    } catch (err) {
      console.error("Failed to delete category:", err);
      toast.error("Failed to delete category");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await getAllCategories();
        if (isMounted && data) {
          setCategories(data);
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
          <h1 className="font-bold text-2xl">Category Management</h1>
          <p className="opacity-50">Organize your products into categories.</p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={24} />
          Add Category
        </Button>
      </div>
      <CategoryTable
        categories={categories}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <CategoryModal
        category={selectedCategory}
        onSuccess={fetchCategories}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default CategoryManagement;
