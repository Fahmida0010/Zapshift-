import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';


const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000'
  
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    // Response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      response => response,
      error => {
       // console.log(error);
        
        const statusCode = error?.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate('/login');
          });
        }

        return Promise.reject(error);
      }
    );

    // cleanup
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
