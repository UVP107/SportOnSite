"use client";
import { useRef, useState } from "react";
import { FiImage, FiTrash2, FiUploadCloud } from "react-icons/fi";

type TfileUpload = {
  onFileSelect?: (file: File | null) => void;
};

const FileUpload = ({ onFileSelect }: TfileUpload) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (selectedFile?: File) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    onFileSelect?.(selectedFile);
  };

  const removeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
    onFileSelect?.(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFileChange(e.dataTransfer.files?.[0]);
      }}
      className="flex flex-col items-center justify-center w-full border border-dashed border-primary py-10 bg-primary-light cursor-pointer rounded-lg hover:bg-blue-50 transition-colors"
    >
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e.target.files?.[0])}
        accept="image/*"
      />

      {!file ? (
        <div className="text-center">
          <FiUploadCloud className="text-primary mx-auto mb-4" size={32} />
          <p className="text-sm font-medium">
            Upload Your Payment Receipt Here
          </p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
        </div>
      ) : (
        <div className="text-center">
          <FiImage className="text-primary mx-auto mb-4" size={28} />
          <p className="text-sm font-bold text-primary truncate max-w-[200px]">
            {file.name}
          </p>
          <p className="text-xs text-gray-400 mb-3">
            {(file.size / 1024).toFixed(1)} KB
          </p>
          <button
            onClick={removeFile}
            className="flex items-center gap-2 mt-4 px-2 bg-primary/90 mx-auto text-xs text-white rounded"
          >
            <FiTrash2 size={14} className="self-center"/> Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
