import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePatter";
import { Toaster, toast } from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required.");
    if (!formData.password.trim()) return toast.error("Password is required.");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) login(formData);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gradient-to-br from-base-300 to-base-100">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="bg-base-300 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-base-content/20">
            <div className="mb-6 text-center">
              <div className="mx-auto w-16 h-16 mb-4 rounded-2xl bg-base-content flex items-center justify-center hover:rotate-6 hover:bg-gradient-to-r from-secondary to-primary transition-transform duration-300">
                <MessageSquare className="w-8 h-8 text-base-300" />
              </div>
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-base-content/60">Log in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-base-content/80" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-xl border border-base-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-base-200 placeholder-base-content/50"
                  placeholder="type the noncense email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-base-content/80" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full px-4 py-3 rounded-xl border border-base-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-base-200 placeholder-base-content/50"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content/80 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center">
        <AuthImagePattern
          title="Welcome Back"
          subtitle="Reconnect with your community and start a conversation."
        />
      </div>
    </div>
  );
};

export default LoginPage;
