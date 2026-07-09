"use client";

import { useState, useRef, DragEvent } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  placeholder?: string;
}

export default function ImageUpload({ value, onChange, label, placeholder }: ImageUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, WEBP, etc.)");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        alert("Image upload failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-1.5 text-left w-full font-poppins text-xs font-normal text-neutral-700">
      <label className="text-[10px] uppercase font-normal text-neutral-400 tracking-wider">{label}</label>

      {/* Main Drag-and-Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative w-full h-[180px] rounded-2xl border border-dashed flex flex-col items-center justify-center gap-3 transition-all duration-300 overflow-hidden cursor-pointer ${
          isDragActive 
            ? "border-indigo-500 bg-indigo-50/30 scale-[1.01]" 
            : value 
              ? "border-neutral-200 bg-neutral-50/20" 
              : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 hover:border-neutral-300"
        }`}
        onClick={value ? undefined : onButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            <span className="text-[11px] text-neutral-400 font-light">Uploading your image...</span>
          </div>
        ) : value ? (
          // Preview state
          <div className="absolute inset-0 w-full h-full group">
            <img 
              src={value} 
              alt="Uploaded cover" 
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Dark glassmorphic hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={onButtonClick}
                className="bg-white/95 hover:bg-white text-slate-800 rounded-xl px-4 py-2 text-[10px] font-normal uppercase tracking-wider transition-all shadow-sm"
              >
                Change Image
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="bg-rose-500 hover:bg-rose-600 text-white rounded-xl p-2 transition-all shadow-sm"
              >
                <X size={14} />
              </button>
            </div>
            {/* Quick action corner button for ease of use */}
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-3 right-3 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white rounded-full p-1.5 transition-all z-10"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          // Upload Prompt State
          <div className="flex flex-col items-center gap-2.5 p-6 text-center">
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shadow-inner">
              <Upload size={16} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-normal text-slate-800">
                Drag and drop your image here, or <span className="text-indigo-600 font-medium hover:underline">browse</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-light">
                Supports PNG, JPG, WEBP, SVG up to 10MB
              </span>
            </div>
          </div>
        )}
      </div>

      {/* URL fallback field (integrated seamlessly below) */}
      <div className="mt-1 flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={placeholder || "Or paste a custom image URL path..."}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-neutral-50/50 focus:bg-white border border-neutral-200 rounded-xl outline-none text-neutral-900 text-xs font-normal transition-all"
          />
          {value && (
            <div className="absolute right-3.5 top-[50%] -translate-y-[50%] flex items-center gap-1.5">
              <span className="text-[9px] font-normal text-emerald-600 bg-emerald-50 border border-emerald-100/30 px-2 py-0.5 rounded-md uppercase tracking-wider">Linked</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
