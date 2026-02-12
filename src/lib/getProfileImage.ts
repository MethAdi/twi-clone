"use client";

import { useState, useEffect } from "react";

export function useProfileImage(): string {
  const [profileImage, setProfileImage] = useState<string>(
    "/images/profile.jpg",
  );

  useEffect(() => {
    const stored = localStorage.getItem("userProfileImage");
    if (stored) {
      setProfileImage(stored);
    }

    // Listen for storage changes from other tabs/components
    const handleStorageChange = () => {
      const updated = localStorage.getItem("userProfileImage");
      if (updated) {
        setProfileImage(updated);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return profileImage;
}
