"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { TbPhoto } from "react-icons/tb";
import Cropper from "react-easy-crop";
import { IoClose } from "react-icons/io5";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface User {
  id: number;
  username: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [saving, setSaving] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      fetchUser();
      const storedImage = localStorage.getItem("profileImage");
      if (storedImage) {
        setPreviewUrl(storedImage);
      }
    }
  }, [isOpen]);

  const fetchUser = async () => {
    const username = localStorage.getItem("userUsername");
    if (!username) return;

    try {
      const response = await fetch(
        `/api/user?username=${encodeURIComponent(username)}`,
      );
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setFormData({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          email: data.user.email || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const response = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        onClose();
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };
  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="bg-background border border-border rounded-lg p-6 w-80 shadow-2xl pointer-events-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Profile</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <IoClose size={24} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border-b">
            <label className="cursor-pointer flex items-center gap-2">
              <TbPhoto size={20} />
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
          {/* User Info - Editable */}
          {user ? (
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">First Name</p>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full bg-background border border-border rounded px-2 py-1 text-white"
                />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Last Name</p>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full bg-background border border-border rounded px-2 py-1 text-white"
                />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full bg-background border border-border rounded px-2 py-1 text-white"
                />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Username</p>
                <p className="text-white font-semibold bg-gray-800 px-2 py-1 rounded">
                  @{user.username}
                </p>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveChanges}
                disabled={saving}
                className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <p className="text-gray-400">Loading...</p>
          )}
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
