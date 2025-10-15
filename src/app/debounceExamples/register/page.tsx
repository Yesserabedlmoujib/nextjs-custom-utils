"use client";

import { useState, useMemo } from "react";
import { debounce } from "@/lib/utils";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const validateFields = async (u: string, e: string) => {
    if (!u && !e) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (u) params.append("username", u);
      if (e) params.append("email", e);

      const res = await fetch(`api/validate?${params.toString()}`);
      const data = await res.json();

      // Username feedback
      if (u) {
        setUsernameValid(data.usernameAvailable);
        setUsernameMsg(
          data.usernameAvailable ? "✅ Username available" : "❌ Username taken"
        );
      }

      // Email feedback
      if (e) {
        setEmailValid(data.emailAvailable);
        setEmailMsg(
          data.emailAvailable ? "✅ Email available" : "❌ Email already used"
        );
      }
    } catch (err) {
      setUsernameMsg("Error checking fields.");
      setEmailMsg("Error checking fields.");
    }
    setLoading(false);
  };

  const debouncedValidate = useMemo(() => debounce(validateFields, 700), []);

  // Handlers
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setUsername(value);
    debouncedValidate(value, email);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    debouncedValidate(username, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Form submitted successfully!");
  };

  const canSubmit = usernameValid && emailValid && !loading;

  return (
    <section
      id="register"
      className="flex flex-col items-center justify-center h-full pt-34 px-4 xl:px-0 mb-6"
    >
      {/* Header Section */}
      <div className="w-full max-w-2xl text-center mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-3 sm:mb-4">
          Register
        </h1>

        {/* Educational Description */}
        <div className="p-3 sm:p-4 md:p-5  ">
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            <strong>Live Form Validation with Debouncing:</strong>
            This form uses a 700ms debounce delay to validate username and email
            availability. Instead of validating on every keystroke, it waits
            until you pause typing, reducing API calls while providing instant
            feedback without overwhelming the server during rapid input.
          </p>
          <p className="text-gray-700 text-xs sm:text-sm mt-2 sm:mt-3 font-medium">
            <strong>Test credentials:</strong> username:
            <span className="text-green-600">john</span>, email:{" "}
            <span className="text-green-600">john@gmail.com</span>
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-stone-100 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-500 border border-gray-200"
        >
          {/* Username Field */}
          <div className="mb-4 sm:mb-6">
            <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={handleUsername}
              placeholder="Choose a username"
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <div className="flex items-center justify-between mt-2 min-h-[1.25rem]">
              <p
                className={`text-xs sm:text-sm ${
                  usernameMsg.includes("✅")
                    ? "text-green-600"
                    : usernameMsg.includes("❌")
                    ? "text-red-500"
                    : loading
                    ? "text-gray-500"
                    : "text-transparent"
                }`}
              >
                {usernameMsg || (loading && "Checking...")}
              </p>
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4 sm:mb-6">
            <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmail}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <div className="flex items-center justify-between mt-2 min-h-[1.25rem]">
              <p
                className={`text-xs sm:text-sm ${
                  emailMsg.includes("✅")
                    ? "text-green-600"
                    : emailMsg.includes("❌")
                    ? "text-red-500"
                    : loading
                    ? "text-gray-500"
                    : "text-transparent"
                }`}
              >
                {emailMsg || (loading && "Checking...")}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
              canSubmit
                ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
