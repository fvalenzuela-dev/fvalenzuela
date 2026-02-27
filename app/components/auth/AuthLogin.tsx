"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const AuthLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", formData);
  };

  // Validación progresiva sutil
  const isUsernameValid = formData.username.length >= 3;
  const isPasswordValid = formData.password.length >= 6;

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      {/* Username Field */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="username"
            className="text-sm font-semibold text-dark dark:text-white"
          >
            Username
          </label>
          {formData.username && (
            <span className="text-xs text-success flex items-center gap-1">
              {isUsernameValid && (
                <>
                  <Icon icon="solar:check-circle-bold" width={14} />
                  Valid
                </>
              )}
            </span>
          )}
        </div>
        <div className="relative">
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            onFocus={() => setFocusedField("username")}
            onBlur={() => setFocusedField(null)}
            className="ui-form-control rounded-md py-3 px-4 pr-10 transition-all duration-150"
            placeholder="Enter your username"
          />
          {formData.username && isUsernameValid && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Icon
                icon="solar:check-circle-bold"
                className="text-success"
                width={20}
              />
            </div>
          )}
        </div>
      </div>

      {/* Password Field */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-dark dark:text-white"
          >
            Password
          </label>
          {formData.password && (
            <span className="text-xs text-success flex items-center gap-1">
              {isPasswordValid && (
                <>
                  <Icon icon="solar:check-circle-bold" width={14} />
                  Valid
                </>
              )}
            </span>
          )}
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            className="ui-form-control rounded-md py-3 px-4 pr-20 transition-all duration-150"
            placeholder="Enter your password"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {formData.password && isPasswordValid && (
              <Icon
                icon="solar:check-circle-bold"
                className="text-success"
                width={20}
              />
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-darklink hover:text-primary transition-colors"
            >
              <Icon
                icon={
                  showPassword
                    ? "solar:eye-bold"
                    : "solar:eye-closed-bold"
                }
                width={20}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Remember & Forgot */}
      <div className="flex justify-between items-center my-6">
        <div className="flex items-center gap-2.5">
          <input
            id="remember"
            type="checkbox"
            checked={formData.remember}
            onChange={(e) =>
              setFormData({ ...formData, remember: e.target.checked })
            }
            className="ui-checkbox"
          />
          <label
            htmlFor="remember"
            className="text-sm font-medium cursor-pointer text-link dark:text-darklink select-none"
          >
            Remember this Device
          </label>
        </div>
        <Link
          href="/auth/auth1/forgot-password"
          className="ui-link text-sm"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full rounded-md bg-primary hover:bg-primaryemphasis text-white py-3.5 px-5 font-semibold transition-all duration-150 shadow-sm hover:shadow-md"
      >
        Sign in
      </button>
    </form>
  );
};

export default AuthLogin;
