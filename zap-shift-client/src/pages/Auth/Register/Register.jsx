
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = async (data) => {
    try {
      const profileImg = data.photo[0];

      // 1. Create user in Firebase
      const result = await registerUser(data.email, data.password);
      console.log(result.user);

      // 2. Upload profile image to imgbb
      const formData = new FormData();
      formData.append('image', profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      // 3. Store user in your database
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL: photoURL
      };

      const res = await axiosSecure.post('/users', userInfo);
      if (res.data.insertedId) {
        console.log('User created in the database');
      }

      // 4. Update Firebase user profile
      const userProfile = {
        displayName: data.name,
        photoURL: photoURL
      };

      await updateUserProfile(userProfile);
      console.log('User profile updated');

      navigate(location.state || '/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already registered. Please login.');
       }
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome to Zap Shift</h3>
      <p className='font-bold mt-6 text-center'>Please Register</p>

      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">

          {/* Name field */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === 'required' && (
            <p className="text-red-500">Name is required.</p>
          )}

          {/* Photo field */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register('photo', { required: true })}
            className="file-input"
            placeholder="Your photo"
          />
          {errors.photo?.type === 'required' && (
            <p className="text-red-500">Photo is required.</p>
          )}

          {/* Email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && (
            <p className="text-red-500">Email is required.</p>
          )}

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && (
            <p className="text-red-500">Password is required.</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="text-red-500">
              Password must be 8 characters or longer
            </p>
          )}
          {errors.password?.type === 'pattern' && (
            <p className="text-red-500">
              Password must contain one uppercase, one lowercase,
              one number and one special character
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>

        <p>
          Already have an account?{' '}
          <Link
            state={location.state}
            className='text-blue-500 underline'
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Register;
