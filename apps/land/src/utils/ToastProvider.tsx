'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider() {
  return (
    <ToastContainer
      autoClose={2000}
      hideProgressBar
      theme="dark"
      limit={8}
      className="pt-16"
    />
  );
}
