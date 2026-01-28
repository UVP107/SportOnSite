"use client";

import { FiPlus } from "react-icons/fi";
import { useEffect, useState, useCallback } from "react";
import Button from "@/app/(landing)/components/ui/button";
import ProductTable from "../../components/products/product-table";
import ProductModal from "../../components/products/product-modal";
import { deleteProduct, getAllProducts } from "@/app/services/product-services";
import { toast } from "react-toastify";
import { Product } from "@/app/types";
import DeleteModal from "../../components/ui/delete-modal";

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDeleteId, setProductToDeleteId] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getAllProducts();
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProductToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDeleteId) return;
    try {
      await deleteProduct(productToDeleteId);
      toast.success("Product deleted successfully");
      setProductToDeleteId("");
      setIsDeleteModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Failed to delete product");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await getAllProducts();
        if (isMounted && data) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    }; // cleanup to prevent memory leaks and cascading render errors
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Product Management</h1>
          <p className="opacity-50">Manage your inventory, prices and stock.</p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={24} />
          Add Product
        </Button>
      </div>
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ProductModal
        product={selectedProduct}
        onSuccess={fetchProducts}
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

export default ProductManagement;
