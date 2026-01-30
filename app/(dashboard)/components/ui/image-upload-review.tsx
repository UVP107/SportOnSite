"use client";

import Image from "next/image";
import { useRef, useCallback } from "react";
import { FiEdit, FiUploadCloud } from "react-icons/fi";

type TImageUploadPreviewProps = {
  label?: string;
  value?: string | null;
  onChange: (file: File) => void;
  className?: string;
};

const ImageUploadPreview = ({
  label,
  value,
  onChange,
  className,
}: TImageUploadPreviewProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        onChange(file);
      }
    },
    [onChange],
  );

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-700">
          {label}
        </label>
      )}

      <div
        onClick={handleImageClick}
        className="cursor-pointer border-2 border-dashed border-primary bg-primary/5 rounded-lg h-50 flex flex-col justify-center items-center overflow-hidden hover:bg-primary/10 transition-colors"
      >
        {value ? (
          <div className="w-full h-full relative group">
            <Image
              src={value}
              alt="preview product"
              className="w-full h-full object-cover"
              width={190}
              height={190}
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <FiEdit size={20} />
              <span className="text-xs mt-1">Change Image</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FiUploadCloud className="text-primary" size={24} />
            <span className="text-sm font-medium mt-2">Click to Upload</span>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUploadPreview;
