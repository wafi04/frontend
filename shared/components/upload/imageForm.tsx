import React, { useState, useCallback } from 'react';
import { Upload, X, Image, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (file: File) => Promise<string>;
  onUrlChange: (url: string) => void;
  currentUrl?: string;
  className?: string;
  maxSize?: number; 
  acceptedTypes?: string[];
}

export function ImageUpload({
  onUpload,
  onUrlChange,
  currentUrl,
  className = "",
  maxSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);

  const handleFileValidation = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type not supported. Please upload: ${acceptedTypes.map(t => t.split('/')[1]).join(', ')}`;
    }
    
    if (file.size > maxSize * 1024 * 1024) {
      return `File too large. Maximum size is ${maxSize}MB`;
    }
    
    return null;
  };

  const handleFileUpload = async (file: File) => {
    const validationError = handleFileValidation(file);
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      setIsUploading(true);
      
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      
      const uploadedUrl = await onUpload(file);
      onUrlChange(uploadedUrl);
      
      URL.revokeObjectURL(previewUrl);
      setPreview(uploadedUrl);
      
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
      setPreview(currentUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onUrlChange('');
  };

  return (
    <div className={`relative ${className}`}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-lg transition-all duration-200
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${preview ? 'p-4' : 'p-8'}
        `}
      >
        {/* Upload Area */}
        {!preview && (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <Upload className="w-6 h-6 text-gray-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">
                Drop your image here, or{' '}
                <label className="text-blue-600 hover:text-blue-500 cursor-pointer underline">
                  browse
                  <input
                    type="file"
                    className="hidden"
                    accept={acceptedTypes.join(',')}
                    onChange={handleFileSelect}
                  />
                </label>
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, WebP, GIF up to {maxSize}MB
              </p>
            </div>
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div className="relative">
            <div className="relative group">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md"
              />
              
              {/* Loading Overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                  <div className="flex items-center space-x-2 text-white">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Uploading...</span>
                  </div>
                </div>
              )}

              {/* Remove Button */}
              {!isUploading && (
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Upload Different Image */}
            {!isUploading && (
              <div className="mt-3 text-center">
                <label className="text-sm text-blue-600 hover:text-blue-500 cursor-pointer underline">
                  Change image
                  <input
                    type="file"
                    className="hidden"
                    accept={acceptedTypes.join(',')}
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      {/* File Info */}
      {isUploading && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Uploading image...</span>
        </div>
      )}
    </div>
  );
}