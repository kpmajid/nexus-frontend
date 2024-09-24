import React, { useState } from "react";
import { updateAvatar } from "@/apis/userApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";

import { updateAvatar as updateAvatarInSlice } from "@/app/features/auth/authSlice";

const ProfileAvatarSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector((state: RootState) => state.auth.user);
  if (!authUser) {
    throw new Error("User is not logged in");
  }

  const [avatarSrc, setAvatarSrc] = useState(authUser.avatar);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsUploading(true);
    setError(null);
    try {
      const result = await updateAvatar(file);
      const avatar = result.user.avatar;
      dispatch(updateAvatarInSlice(avatar));
      setAvatarSrc(avatar);
    } catch (err) {
      setError("Failed to update avatar. Please try again.");
      console.error("Error updating avatar:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden mb-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-3">
        <div className="mb-4 md:mb-0 md:mr-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Avatar</h2>
          <p className="text-gray-600 mb-1">This is your avatar.</p>
          <p className="text-gray-600">
            Click on the avatar to upload a custom one from your files.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="avatar-upload" className="cursor-pointer ">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-2 hover:opacity-80 transition duration-300">
              <img
                src={avatarSrc}
                alt="Current avatar"
                className="w-full h-full object-cover"
              />
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
            </div>
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
            disabled={isUploading}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="text-sm text-gray-500 italic">
          An avatar is optional but strongly recommended.
        </div>
      </div>
    </div>
  );
};

export default ProfileAvatarSection;
