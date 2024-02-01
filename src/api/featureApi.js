import { axiosInstance } from "../api/baseUrl";

const featureApi = {
  addFeature: (data) => {
    return axiosInstance.post("/features", data);
  },
  getAllFeatures: () => {
    return axiosInstance.get("/features");
  },
  getFeatureById: (featureId) => {
    return axiosInstance.get(`/features/${featureId}`);
  },
  updateFeatureById: (featureId, obj) => {
    const url = `/features/${featureId}`;
    return axiosInstance.put(url, obj);
  },
  deleteFeatureById: (featureId) => {
    return axiosInstance.delete(`/features/${featureId}`);
  },
};

export default featureApi;
