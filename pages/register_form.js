import { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import Swal from 'sweetalert2'; 

export default function RegisterForm({ onClose }) {
  const [form, setForm] = useState({
    email: '',
    phone_number: '',
    password: '',
    profile_image: null,
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, profile_image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    const formData = new FormData();
    formData.append('email', form.email);
    formData.append('phone_number', form.phone_number);
    formData.append('password', form.password);
    if (form.profile_image) {
      formData.append('profile_image', form.profile_image);
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/admins', {
        method: 'POST',
        body: formData, 
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        const errorMessage =
          data.errors && typeof data.errors === 'object'
            ? Object.values(data.errors)[0][0]
            : data.message || 'Failed to register.';
        throw new Error(errorMessage);
      }
  
      setSuccess('Admin registered successfully!');
      setForm({
        email: '',
        phone_number: '',
        password: '',
        profile_image: null,
      });


      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Admin registered successfully!',
      });
      onClose();

    } catch (err) {
      setError(err.message || 'An error occurred.');


      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message || 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="absolute min-w-screen min-h-screen backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <AiIcons.AiOutlineClose size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">REGISTER</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="profile_image" className="block text-sm font-medium text-gray-700">
              Profile Image (optional)
            </label>
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPass ? (
                  <AiIcons.AiFillEyeInvisible size={20} />
                ) : (
                  <AiIcons.AiFillEye size={20} />
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
          {loading && <p className="text-blue-600 text-sm">Registering...</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
          >
            {loading ? 'Please wait...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
