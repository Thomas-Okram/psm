import Home from "./pages/Home"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import MyCodes from "./pages/MyCodes"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import Order from "./pages/Order"
import AdminDashboard from "./pages/adminPages/AdminDashboard"
import AdminProduct from "./pages/adminPages/AdminProduct"


import { Navigate, Routes, Route } from "react-router-dom"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import EmailVerification from "./pages/EmailVerification"
import ForgotPassword from "./pages/ForgotPassword"
import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster, toast } from "react-hot-toast"
// import toast from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import AdminViewCodes from "./pages/adminPages/AdminViewCodes"
import AdminUsers from "./pages/adminPages/AdminUsers"

// Admin  routes
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    toast.success("Please login first");
		return <Navigate to='/login' replace />;
	}
  if (!user.isVerified) {
    toast.success("Please verify your email");
		return <Navigate to='/verify-email' replace />;
	}
  if (user.role === 'user') {
    toast.success("You are not Admin");
		return <Navigate to='/' replace />;
  }

  return children;
}
// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
    toast.success("Please login first");
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
    toast.success("Please verify your email");
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};
function App() { 
  const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <>
      <Routes>
        <Route path="/" 
          element={
            <>
              <Header />
              <Home/>
            </>
          } 
        />

        <Route path="/signUp" 
          element={
            <RedirectAuthenticatedUser>
              <SignUp/>
            </RedirectAuthenticatedUser>
          } 
        />
        <Route path="/login" 
          element={
            <RedirectAuthenticatedUser>
              <Login/>
            </RedirectAuthenticatedUser>
          } 
        />
        <Route path='/verify-email' element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />

        <Route path="/products/:id" 
          element={
            <>
              <Header />
              <Products/>
            </>
          } 
        />
        <Route path="/cart" 
          element={
            <ProtectedRoute>
              <Header />
              <Cart/>
            </ProtectedRoute>
          } 
        />
        <Route path="/order" 
          element={
            <ProtectedRoute>
              <Header />
              <Order/>
            </ProtectedRoute>
          } 
        />
        <Route path="/myCodes" 
          element={
            <ProtectedRoute>
              <Header />
              <MyCodes/>
            </ProtectedRoute>
          } 
        />
        {/* <Route path="/support" element={<Support/>} /> */}
        <Route path="/profile" 
          element={
            <ProtectedRoute>
              <Header />
              <Profile/>
            </ProtectedRoute>
          } 
        />



        <Route path="/adminPanel/dashboard" 
          element={
            <AdminRoute>
              <Header />
              <AdminDashboard/>
            </AdminRoute>
          } 
        />
        <Route path="/adminPanel/product" 
          element={
            <AdminRoute>
              <Header />
              <AdminProduct/>
            </AdminRoute>
          } 
        />
        <Route path="/adminPanel/viewCode" 
          element={
            <AdminRoute>
              <Header />
              <AdminViewCodes/>
            </AdminRoute>
          } 
        />
        <Route path="/adminPanel/users" 
          element={
            <AdminRoute>
              <Header />
              <AdminUsers/>
            </AdminRoute>
          } 
        />
        
        
      </Routes>
      <Toaster />
    </>
  )
}

export default App
