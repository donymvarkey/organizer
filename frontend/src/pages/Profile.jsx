import React, { useState } from "react";
import Layout from "../layout/Layout";
import { useSelector } from "react-redux";
import Avatar from "../components/Avatar";
import Input from "../components/Input";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { Link } from "react-router";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(user);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [errors, setErrors] = useState({
    currentPassword: null,
    newPassword: null,
    confirmNewPassword: null,
  });

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
    setErrors({
      ...errors,
      [key]: "",
    });
  };

  const handleBlur = (key, value) => {
    if (
      (key === "currentPassword" && value === "") ||
      value === null ||
      value === undefined
    ) {
      setErrors({
        ...errors,
        currentPassword: "Please enter current password",
      });
    } else if (
      (key === "newPassword" && value === "") ||
      value === null ||
      value === undefined
    ) {
      setErrors({
        ...errors,
        newPassword: "Please enter new password",
      });
    } else {
      if (formData["newPassword"] !== formData["confirmNewPassword"]) {
        setErrors({
          ...errors,
          confirmNewPassword: "Password do not match",
        });
      }
    }
  };

  const handleSubmit = () => {
    console.log(formData);
  };
  return (
    <Layout>
      <div>
        <Link
          className="border-indigo-600 border px-3 py-2 rounded text-indigo-600"
          to={"/dashboard"}
        >
          Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-3 mt-5">
        <Avatar size="xl" name={user?.name} />
        <span className="text-xl">{user?.name}</span>
      </div>
      <div className="my-10 space-y-3">
        <Input disabled={true} defaultValue={userData?.name} />
        <Input type="email" defaultValue={userData?.email} disabled={true} />
      </div>
      <div className="flex items-center justify-end">
        <Button
          onClick={() => setShowChangePasswordModal(true)}
          btnStyle="w-[210px]"
          titleStyle="text-sm"
          title="Change Password"
        />
      </div>
      {showChangePasswordModal && (
        <Modal
          title="Change Password"
          isOpen={showChangePasswordModal}
          onClose={() => setShowChangePasswordModal(false)}
        >
          <div className="flex flex-col gap-y-5">
            <Input
              type="password"
              label="Current Password"
              onBlur={(e) => handleBlur("currentPassword", e.target.value)}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              error={errors["currentPassword"]}
            />
            <Input
              type="password"
              label="New Password"
              onBlur={(e) => handleBlur("newPassword", e.target.value)}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              error={errors["newPassword"]}
            />
            <Input
              type="password"
              label="Confirm New Password"
              onBlur={(e) => handleBlur("confirmNewPassword", e.target.value)}
              onChange={(e) =>
                handleChange("confirmNewPassword", e.target.value)
              }
              error={errors["confirmNewPassword"]}
            />
          </div>
          <Button
            onClick={handleSubmit}
            btnStyle="my-5"
            title="Update Password"
          />
        </Modal>
      )}
    </Layout>
  );
};

export default Profile;
