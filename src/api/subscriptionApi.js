import { axiosInstance } from "../api/baseUrl";

const subscriptionApi = {
    getSubscription: () => {
        return axiosInstance.get('/subscription');
    },
    addSubscription: (obj) => {
        return axiosInstance.post('/subscription', obj);
    },
    getSubscription:() => {

    }
    
}