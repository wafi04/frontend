import React, { useState, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { api } from "@/lib/axios";

interface ImageUploadProps {
  onUpload?: (file: File) => Promise<string>;
  onUrlChange: (url: string) => void;
  currentUrl?: string;
  setCurrentImage?: (image: string) => void;
  className?: string;
  maxSize?: number;
  acceptedTypes?: string[];
}

export interface UploadResponse {
  success: boolean;
  message: string;
  filename: string;
  size: number;
  mimeType: string;
  url: string;
  etag: string;
}

// Convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const uploadImage = async (file: File): Promise<string> => {
  try {
    const base64Data = await fileToBase64(file);

    const response = await api.post<UploadResponse>("/uploads", {
      file: base64Data,
      filename: file.name,
    });

    if (response.data.success) {
      return response.data.url;
    } else {
      throw new Error(response.data.message || "Upload failed");
    }
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export function ImageUpload({
  onUpload = uploadImage,
  onUrlChange,
  currentUrl,
  setCurrentImage,
  className = "",
  maxSize = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileValidation = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type not supported. Please upload: ${acceptedTypes
        .map((t) => t.split("/")[1])
        .join(", ")}`;
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `File too large. Maximum size is ${maxSize}MB`;
    }
    return null;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const validationError = handleFileValidation(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setSelectedFile(file);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        const validationError = handleFileValidation(file);
        if (validationError) {
          setError(validationError);
          return;
        }

        setError(null);
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        setSelectedFile(file);
      }
    },
    [onUpload]
  );

  const handleUpload = async (fileToUpload?: File) => {
    const file = fileToUpload || selectedFile;
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);

      const uploadedUrl = await onUpload(file);

      onUrlChange(uploadedUrl);

      setPreview(uploadedUrl);

      if (setCurrentImage) {
        setCurrentImage(uploadedUrl);
      }

      setSelectedFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setSelectedFile(null);
    setError(null);
    onUrlChange("");

    if (setCurrentImage) {
      setCurrentImage("");
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        className={`
          relative border-2 border-dashed rounded-lg transition-all duration-200
          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }
          ${preview ? "p-4" : "p-8"}
        `}
      >
        {!preview && (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <Upload className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <label className="text-blue-600 hover:text-blue-500 cursor-pointer underline">
                Choose file or drag here
                <input
                  type="file"
                  className="hidden"
                  accept={acceptedTypes.join(",")}
                  onChange={handleFileSelect}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              PNG, JPG, WebP, GIF up to {maxSize}MB
            </p>
          </div>
        )}

        {preview && (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md"
            />
            {!isUploading && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                <div className="flex flex-col items-center text-white">
                  <Loader2 className="w-6 h-6 animate-spin mb-2" />
                  <span className="text-sm">Uploading...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
          {error}
        </div>
      )}

      {/* Manual upload button (if auto-upload is disabled) */}
      {selectedFile && !isUploading && !preview?.startsWith("http") && (
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={() => handleUpload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Upload Image
          </button>
        </div>
      )}
    </div>
  );
}
