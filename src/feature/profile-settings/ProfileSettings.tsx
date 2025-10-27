import { useState, useEffect } from "react";
import { FaUserEdit, FaSave } from "react-icons/fa";
import type { UserInfo } from "../../models/User";
import { InputField } from "./InputField";
import { submitUserInfo } from "../../api/user/user-info-service";
import { mapUserInfoToRequest } from "../../utils/mappers";


interface ProfileSettingsProps {
  user: { userInfo: UserInfo };
}

export const ProfileSettings = ({ user }: ProfileSettingsProps) => {

  const formatDateForInput = (isoDate: string) => isoDate.split("T")[0];

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<UserInfo>({...user.userInfo,   birth_date: formatDateForInput(user.userInfo.birth_date),});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    console.log(user.userInfo.birth_date)
    const hasErrors = Object.values(errors).some(e => e);
    setIsFormValid(!hasErrors);
  }, [errors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;
    let error = "";

    switch (name) {
      case "tax_code":
        newValue = value.toUpperCase().slice(0, 16);
        if (newValue.length !== 16) error = "Tax code must be exactly 16 characters.";
        break;
      case "phone":
        newValue = value.replace(/\D/g, "").slice(0, 15);
        if (newValue.length < 8) error = "Phone number seems too short.";
        break;
      case "postal_code":
        newValue = value.slice(0, 10);
        if (newValue.length < 4) error = "Postal code is too short.";
        break;
      case "name":
      case "surname":
        newValue = value.replace(/[^a-zA-Z\s]/g, "").slice(0, 30);
        if (newValue.length < 2) error = `${name === "name" ? "Name" : "Surname"} is too short.`;
        break;
      case "mail":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format.";
        break;
      case "birth_date":
        newValue= formatDateForInput(value)
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    setForm(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSave = () => {
    if (!isFormValid) return;

    console.log("Saving profile data:", form);
    submitUserInfo(mapUserInfoToRequest(form))
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Profile Settings</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <FaUserEdit /> Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            <FaSave /> Save Changes
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Username" name="username" value={form.username} onChange={handleChange} disabled />
        <InputField label="Name" name="name" value={form.name} onChange={handleChange} disabled={!isEditing} error={errors.name} />
        <InputField label="Surname" name="surname" value={form.surname} onChange={handleChange} disabled={!isEditing} error={errors.surname} />
        <InputField label="Tax Code" name="tax_code" value={form.tax_code} onChange={handleChange} disabled={!isEditing} error={errors.tax_code} />
        <InputField label="Phone" name="phone" value={form.phone} onChange={handleChange} disabled={!isEditing} error={errors.phone} />
        <InputField label="Birth Date" type="date" name="birth_date" value={form.birth_date} onChange={handleChange} disabled={!isEditing} />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
          <select
            name="gender"
            value={form.gender || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>

        <InputField label="Address Line 1" name="residence_address_1" value={form.residence_address_1 || ""} onChange={handleChange} disabled={!isEditing} />
        <InputField label="Address Line 2" name="residence_address_2" value={form.residence_address_2 || ""} onChange={handleChange} disabled={!isEditing} />
        <InputField label="City" name="city" value={form.city || ""} onChange={handleChange} disabled={!isEditing} />
        <InputField label="Province" name="province" value={form.province || ""} onChange={handleChange} disabled={!isEditing} />
        <InputField label="Postal Code" name="postal_code" value={form.postal_code || ""} onChange={handleChange} disabled={!isEditing} error={errors.postal_code} />
        <InputField label="Country" name="country" value={form.country || ""} onChange={handleChange} disabled={!isEditing} />
      </div>
    </div>
  );
};


