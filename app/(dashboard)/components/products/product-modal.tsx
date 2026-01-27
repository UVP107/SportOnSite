"use client";

import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import { useEffect, useState } from "react";
import ImageUploadPreview from "../ui/image-upload-review";
import { Category, Product } from "@/app/types";
import { toast } from "react-toastify";
import { createProduct, updateProduct } from "@/app/services/product-services";
import { getAllCategories } from "@/app/services/category-services";
import { getImageUrl } from "@/app/lib/api";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
};

type ProductFormData = {
  name: string;
  price: string;
  stock: string;
  categoryId: string;
  description: string;
};

const ProductModal = ({
  isOpen,
  onClose,
  onSuccess,
  product,
}: TProductModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!product;

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
    description: "",
  });

  // Fetch categories for the dropdown
  useEffect(() => {
    let isMounted = true;
    const fetchCats = async () => {
      try {
        const data = await getAllCategories();
        if (isMounted) setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    if (isOpen) fetchCats();
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Sync form data when editing
  useEffect(() => {
    if (isEditMode && isOpen && product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        categoryId: product.category?._id || "",
        description: product.description,
      });
      setImagePreview(product.imageUrl ? getImageUrl(product.imageUrl) : null);
    } else if (isOpen) {
      setFormData({
        name: "",
        price: "",
        stock: "",
        categoryId: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [product, isEditMode, isOpen]);

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
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("category", formData.categoryId);
      data.append("description", formData.description);

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditMode && product) {
        await updateProduct(product._id, data);
      } else {
        await createProduct(data);
      }

      toast.success(isEditMode ? "Product updated" : "Product created");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Product" : "Add New Product"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-7">
          {/* Left Side: Image Upload */}
          <div className="min-w-[200px]">
            <ImageUploadPreview
              label="Product Image"
              value={imagePreview}
              onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </div>

          {/* Right Side: Form Fields */}
          <div className="flex flex-col gap-4 w-full">
            <div className="input-group-admin">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Running Shoes"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="input-group-admin w-full">
                <label htmlFor="price">Price (IDR)</label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  required
                />
              </div>
              <div className="input-group-admin w-full">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  required
                />
              </div>
            </div>

            <div className="input-group-admin">
              <label htmlFor="categoryId">Category</label>
              <select
                id="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bottom: Description */}
        <div className="input-group-admin">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Details..."
            required
          ></textarea>
        </div>

        <Button
          className="ml-auto rounded-lg px-8"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Processing..."
            : isEditMode
              ? "Update Product"
              : "Create Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ProductModal;
