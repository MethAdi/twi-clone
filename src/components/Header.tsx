"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { TbPhoto } from "react-icons/tb";
import Cropper from "react-easy-crop";

export default function Header() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setPreviewUrl(storedImage);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowCropper(true);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const getCroppedImg = async (imageSrc: string, crop: any, size = 400) => {
    const image = new window.Image();
    image.src = imageSrc;

    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = size;
    canvas.height = size;

    ctx?.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      size,
      size,
    );

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9);
    });
  };

  const handleCrop = async () => {
    if (!selectedFile || !croppedAreaPixels) return;
    const croppedBlob = await getCroppedImg(
      URL.createObjectURL(selectedFile),
      croppedAreaPixels,
      400,
    );
    if (croppedBlob) {
      const croppedUrl = URL.createObjectURL(croppedBlob);
      setPreviewUrl(croppedUrl);
      localStorage.setItem("profileImage", croppedUrl);
    }
    setShowCropper(false);
  };
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <label className="cursor-pointer flex items-center gap-2">
          <TbPhoto size={20} />
          <span>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <div className="cursor-pointer" onClick={handleImageClick}>
          <Image
            src={previewUrl || "/default-profile.png"}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        </div>
      </div>

      {/* Cropper Modal */}
      {showCropper && selectedFile && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-[400px] h-[400px] bg-white rounded">
            <Cropper
              image={URL.createObjectURL(selectedFile)}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(croppedArea, croppedAreaPixels) =>
                setCroppedAreaPixels(croppedAreaPixels)
              }
            />

            <button
              onClick={handleCrop}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Crop
            </button>
          </div>
        </div>
      )}
    </>
  );
}
