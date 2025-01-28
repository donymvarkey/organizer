import axiosInstance from "./axiosConfig";

const signUpApi = async (data) => {
  try {
    const apiRes = await axiosInstance.post("/auth/signup", data);

    return apiRes.data;
  } catch (error) {
    return error;
  }
};

const signInApi = async (data) => {
  try {
    const apiRes = await axiosInstance.post("/auth/login", data);

    return apiRes.data;
  } catch (error) {
    return error;
  }
};

const userProfileApi = async () => {
  try {
    const apiRes = await axiosInstance.get("/user/me");
    return apiRes.data;
  } catch (error) {
    return error;
  }
};

const createCollectionApi = async (data) => {
  try {
    const apiRes = await axiosInstance.post("/collection", data);
    return apiRes.data;
  } catch (error) {
    return error;
  }
};

const getAllCollections = async () => {
  try {
    const apiRes = await axiosInstance.get("/collection");
    return apiRes.data;
  } catch (error) {
    return error;
  }
};

const createNewLinkApi = async (data, collectionId) => {
  try {
    const apiRes = await axiosInstance.post(`/link/new/${collectionId}`, data);
    return apiRes.data;
  } catch (error) {
    return error;
  }
};

const getAllLinksByCollectionApi = async (collectionId) => {
  try {
    const apiRes = await axiosInstance.get(`/link/list/${collectionId}`);
    return apiRes?.data;
  } catch (error) {
    return error;
  }
};

const getCollectionByIdApi = async (collectionId) => {
  try {
    const apiRes = await axiosInstance.get(`/collection/${collectionId}`);
    return apiRes?.data;
  } catch (error) {
    return error;
  }
};

const updateLinkApi = async (linkId, update) => {
  try {
    const apiRes = await axiosInstance.put(`/link/${linkId}`, update);
    return apiRes.data;
  } catch (error) {
    return error;
  }
};

const deleteLinkApi = async (linkId) => {
  try {
    const apiRes = await axiosInstance.delete(`/link/${linkId}`);
    return apiRes?.data;
  } catch (error) {
    return error;
  }
};

export {
  signUpApi,
  signInApi,
  userProfileApi,
  createCollectionApi,
  getAllCollections,
  createNewLinkApi,
  getAllLinksByCollectionApi,
  getCollectionByIdApi,
  updateLinkApi,
  deleteLinkApi,
};
