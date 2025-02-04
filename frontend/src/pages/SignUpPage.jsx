import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePatter";
import { Toaster, toast } from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required.");
    if (!formData.email.trim()) return toast.error("Email is required.");
    if (!formData.password.trim()) return toast.error("Password is required.");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters long.");
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-base-300 to-base-100">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 translate-x-15">
        <div className="w-full max-w-md">
          <div className="bg-base-300 rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-primary/10 border border-base-content/20">
            <div className="mb-8 text-center">
              <div className="mx-auto w-16 h-16 mb-6 rounded-2xl bg-base-content flex items-center justify-center transform transition-all duration-300 hover:rotate-6 hover:bg-gradient-to-r from-secondry to-primary ">
                <MessageSquare className="w-8 h-8 text-base-300" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="mt-2 text-base-content/60">Join us and start your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-base-content/80" htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="w-full px-4 py-3 rounded-xl border border-base-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-base-content bg-base-200 hover:bg-base-200 placeholder-base-content/50"
                  placeholder="Luke skywalker"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-base-content/80" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-xl border border-base-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-base-content bg-base-200 hover:bg-base-200 placeholder-base-content/50"
                  placeholder="type the noncence email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-base-content/80" htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full px-4 py-3 rounded-xl border border-base-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-base-content bg-base-200 hover:bg-base-200 placeholder-base-content/50"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content/80 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6">
              <p className="text-center text-sm text-base-content/60">
                Already have an account? {" "}
                <Link to="/login" className="text-primary hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-full max-w-md justify-center items-center translate-x-10">
        <AuthImagePattern 
          title="Join our Community"
          subtitle="Connect with friends and family around the world"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
