import {
  validateEmail,
  validateName,
  validatePassword,
  validateUrl,
} from "../helpers";

// Email Validation Regex
export const emailRegex = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,6}$/;
export const nameRegex = /^[a-zA-Z]{2,30}$/;
export const urlRegex =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;

export const VALIDATION_RULES = {
  name: {
    validate: validateName,
    errorMessage: "Invalid Name",
  },
  url: {
    validate: validateUrl,
    errorMessage: "Invalid URL",
  },
  email: {
    validate: validateEmail,
    errorMessage: "Invalid Email Address",
  },
  password: {
    validate: validatePassword,
    errorMessage:
      "Password must contain at least 8 characters including uppercase, lowercase, number and special character",
  },
};

export const sampleData = [
  {
    id: 1,
    name: "Funny Videos",
    description: "Funny Videos collection",
    total_links: 10,
    total_videos: 10,
    createdAt: "2024-04-17T03:15:07.795+00:00",
  },
  {
    id: 2,
    name: "Study Videos",
    description: "Funny Videos collection",
    total_links: 10,
    total_videos: 10,
    createdAt: "2024-04-17T03:15:07.795+00:00",
  },
  {
    id: 3,
    name: "Nodejs Documentation",
    description: "Funny Videos collection",
    total_links: 10,
    total_videos: 10,
    createdAt: "2024-04-17T03:15:07.795+00:00",
  },
  {
    id: 4,
    name: "Funny Videos",
    description: "Funny Videos collection",
    total_links: 10,
    total_videos: 10,
    createdAt: "2024-04-17T03:15:07.795+00:00",
  },
  {
    id: 5,
    name: "Funny Videos",
    description: "Funny Videos collection",
    total_links: 10,
    total_videos: 10,
    createdAt: "2024-04-17T03:15:07.795+00:00",
  },
];

export const collections = [
  {
    id: 1,
    name: "Nodejs Documentation",
    url: "https://nodejs.org",
    type: "url",
    typeId: 1,
    createdAt: "2024-04-17T03:15:07.795+00:00",
  },
  {
    id: 2,
    name: "Nodejs Documentation",
    url: "https://nodejs.org",
    type: "url",
    typeId: 1,
    createdAt: "2024-04-17T03:15:07.795+00:00",
  },
  {
    id: 3,
    name: "Nodejs Documentation",
    url: "https://nodejs.org",
    type: "url",
    typeId: 1,
    createdAt: "2024-04-17T03:15:07.795+00:00",
  },
  {
    id: 4,
    name: "Nodejs Documentation",
    url: "https://nodejs.org",
    type: "url",
    typeId: 1,
    createdAt: "2024-04-17T03:15:07.795+00:00",
  },
  {
    id: 5,
    name: "Nodejs Documentation",
    url: "https://nodejs.org",
    type: "url",
    typeId: 1,
    createdAt: "2024-04-17T03:15:07.795+00:00",
  },
  {
    id: 6,
    name: "Nodejs Documentation",
    url: "https://nodejs.org",
    type: "url",
    typeId: 1,
    createdAt: "2024-04-17T03:15:07.795+00:00",
  },
];
