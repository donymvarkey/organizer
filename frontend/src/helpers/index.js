import { getItemFromLocalStorage } from "../api/LocalStorage";
import { emailRegex, urlRegex } from "../constants";

export const validateName = (name) => {
  if (!name || typeof name !== "string") return false;
  if (name.length < 2 || name.length > 30) return false;

  return name.trim();
};

export const validateEmail = (email) => {
  // Check length first to prevent long string attacks
  if (email.length > 254) return false;

  // Basic structural validation
  if (!email.includes("@")) return false;

  // Split and validate parts
  const [local, domain] = email.split("@");

  if (!local || !domain) return false;
  if (local.length > 64 || domain.length > 255) return false;

  // Basic format check
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Check length first
  if (password.length < 8 || password.length > 128) return false;

  // Check each requirement separately
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);

  return hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Add leading zeros if needed
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

export const validateUrl = (url) => {
  if (!url || typeof url !== "string") return false;
  if (url.length < 2) return false;

  return urlRegex.test(url.trim());
};

export const checkIfAuthenticated = () => {
  const data = getItemFromLocalStorage("access_token");
  if (data !== null) {
    return true;
  }
  return false;
};
