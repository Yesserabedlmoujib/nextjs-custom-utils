"use client";

import { useState, useMemo } from "react";
import { debounce } from "@/lib/utils";

export default function RegisterPage() {
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
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6 text-blue-500 text-center">
        Register
      </h1>
      {/* Educational description about debounced validation */}
      <p className="text-gray-600 text-center max-w-2xl mb-6 text-sm leading-relaxed mx-auto">
        <strong>Live Form Validation with Debouncing:</strong> This form uses a
        700ms debounce delay to validate username and email availability.
        Instead of validating on every keystroke, it waits until you pause
        typing, reducing API calls while providing instant feedback without
        overwhelming the server during rapid input.
      </p>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-stone-100 p-8 rounded-xl shadow-lg shadow-blue-500 w-full max-w-md"
        >
          {/* Username Field */}
          <label className="block mb-2 font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={handleUsername}
            placeholder="Choose a username"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center justify-between mt-2 min-h-[1.25rem]">
            <p
              className={`text-sm ${
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

          {/* Email Field */}
          <label className="block mt-4 mb-2 font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmail}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center justify-between mt-2 min-h-[1.25rem]">
            <p
              className={`text-sm ${
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${
              canSubmit
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
