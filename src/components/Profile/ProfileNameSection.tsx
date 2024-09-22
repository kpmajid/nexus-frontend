import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useCallback, useState } from "react";
import { updateName } from "@/apis/userApi";
import { updateName as updateNameInSlice } from "@/app/features/auth/authSlice";

const ProfileNameSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector((state: RootState) => state.auth.user);
  if (!authUser) {
    throw new Error("User is not logged in");
  }

  const [name, setName] = useState(authUser.name);
  const [validationError, setValidationError] = useState("");

  const validateName = useCallback((name: string) => {
    if (!name.trim()) {
      return "Name is required";
    }

    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(name)) {
      return "Name must contain only letters and spaces";
    }

    return "";
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setValidationError(validateName(newName));
  };

  const handleSaveName = async () => {
    const error = validateName(name);
    if (error) {
      setValidationError(error);
      return;
    }

    try {
      const result = await updateName(name);
      if (result.success) {
        console.log("Name updated successfully", result.user);
        dispatch(updateNameInSlice({ name }));
      } else {
        setValidationError("Failed to update name. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setValidationError("An error occurred while updating the name.");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Name</h2>
        <p className="text-gray-600 mb-4">
          Please enter your full name, or a display name you are comfortable
          with.
        </p>
        <div className="flex items-center">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className={`flex-grow px-3 py-2 border ${
              validationError ? "border-gray-500" : "border-gray-300"
            }  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2`}
          />
          <button
            className={`${
              validationError || name === authUser.name
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-black hover:bg-slate-900"
            } text-white rounded-md px-4 py-2 transition duration-300`}
            type="button"
            onClick={handleSaveName}
            disabled={!!validationError || name === authUser.name}
          >
            Save
          </button>
        </div>
        {validationError && (
          <p className="text-red-500 text-sm mt-1">{validationError}</p>
        )}
      </div>
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center">
        <p className="text-sm text-gray-500 italic">
          Please use 32 characters at maximum. Avoid using numbers.
        </p>
      </div>
    </div>
  );
};
export default ProfileNameSection;
