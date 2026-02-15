import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
    const { user, loading, logOutUser } = UseAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {


                if (loading || !user) {
                    return Promise.reject(new axios.Cancel("Auth not ready"));
                }


                const token = await user.getIdToken(true);

                config.headers.Authorization = `Bearer ${token}`;
                return config;
            }
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {


                if (axios.isCancel(error)) {
                    return Promise.reject(error);
                }

                const status = error.response?.status;


                if (status === 401 ) {
                    await logOutUser();
                    navigate("/login");
                }

                if (status === 403) {
                    navigate("/forbidden");
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user, loading, logOutUser, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;