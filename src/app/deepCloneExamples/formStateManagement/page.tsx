"use client";

import { deepClone } from "@/lib/utils";
import ResumeData from "@/types/resumeBuilder.types";
import { useState } from "react";

const initialResume: ResumeData = {
  personalInfo: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: {
      street: "123 Main St",
      city: "New York",
      country: "USA",
    },
  },
  education: [
    {
      id: "1",
      school: "University of Example",
      degree: "Computer Science",
      year: 2020,
      achievements: ["Graduated Summa Cum Laude", "Dean's List"],
    },
  ],
  experience: [],
};

export default function ResumeBuilder() {
  const [resume, setResume] = useState<ResumeData>(deepClone(initialResume));
  const [history, setHistory] = useState<ResumeData[]>([]);

  // Deep Clone in Action: Safe nested state updates
  const updatePersonalInfo = (field: string, value: string) => {
    console.log("📝 Updating field:", field, "to:", value);

    // WITHOUT deepClone (problematic):
    // const resumeCopy = { ...resume }; // Shallow copy - nested objects still referenced!
    // resumeCopy.personalInfo[field] = value; // MUTATES original nested object!

    // WITH deepClone (safe - completely new nested objects):
    const resumeCopy = deepClone(resume);

    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      (resumeCopy.personalInfo as any)[parent][child] = value;
    } else {
      (resumeCopy.personalInfo as any)[field] = value;
    }

    // Save current state to history before updating
    setHistory((prev) => [...prev, deepClone(resume)]);
    setResume(resumeCopy);

    console.log("✅ Personal info updated safely with deepClone");
  };

  // Deep Clone in Action: Adding to arrays safely
  const addEducation = () => {
    console.log("🎓 Adding new education entry");

    const resumeCopy = deepClone(resume);
    resumeCopy.education.push({
      id: Date.now().toString(),
      school: "",
      degree: "",
      year: new Date().getFullYear(),
      achievements: [],
    });

    setHistory((prev) => [...prev, deepClone(resume)]); // Save to history
    setResume(resumeCopy);
    console.log("✅ New education entry added with deepClone");
  };

  // Deep Clone in Action: Undo functionality
  const undo = () => {
    if (history.length > 0) {
      console.log("↩️ Undoing last change");
      const previousState = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setResume(deepClone(previousState));
      console.log("✅ State restored from history using deepClone");
    }
  };

  // Deep Clone in Action: Reset form
  const resetForm = () => {
    console.log("🔄 Resetting form to initial state");
    setHistory([]);
    setResume(deepClone(initialResume));
    console.log("✅ Form reset using deepClone");
  };

  return (
    <section
      id="Resume Builder"
      className="flex flex-col items-center justify-center min-h-screen pt-34 px-4 xl:px-0 mb-6"
    >
      <div className="w-full max-w-6xl text-center mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-3 sm:mb-4">
          📝 Resume Builder + DeepClone Demo
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base px-2 sm:px-4 max-w-4xl mx-auto leading-relaxed bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <strong>Educational Purpose:</strong> This demonstrates how
          <code>deepClone</code> enables complex state management with undo
          functionality. Each change creates a complete copy of the resume data,
          allowing safe history tracking and state restoration.
        </p>
      </div>

      <div className="space-y-6">
        {/* Personal Information Section */}
        <div className="border border-gray-200 p-4 rounded-lg bg-white">
          <h2 className="text-lg font-semibold mb-3">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={resume.personalInfo.name}
                onChange={(e) => updatePersonalInfo("name", e.target.value)}
                className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={resume.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={resume.personalInfo.address.street}
                onChange={(e) =>
                  updatePersonalInfo("address.street", e.target.value)
                }
                className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={resume.personalInfo.address.city}
                onChange={(e) =>
                  updatePersonalInfo("address.city", e.target.value)
                }
                className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="border border-gray-200 p-4 rounded-lg bg-white">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Education</h2>
            <button
              onClick={addEducation}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Add Education
            </button>
          </div>
          {resume.education.map((edu) => (
            <div
              key={edu.id}
              className="border-t border-gray-200 pt-4 mt-4 first:border-t-0 first:pt-0 first:mt-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School
                  </label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => {
                      const resumeCopy = deepClone(resume);
                      const education = resumeCopy.education.find(
                        (ed) => ed.id === edu.id
                      );
                      if (education) education.school = e.target.value;
                      setHistory((prev) => [...prev, deepClone(resume)]);
                      setResume(resumeCopy);
                    }}
                    className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const resumeCopy = deepClone(resume);
                      const education = resumeCopy.education.find(
                        (ed) => ed.id === edu.id
                      );
                      if (education) education.degree = e.target.value;
                      setHistory((prev) => [...prev, deepClone(resume)]);
                      setResume(resumeCopy);
                    }}
                    className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={undo}
            disabled={history.length === 0}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Undo ({history.length})
          </button>
          <button
            onClick={resetForm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Reset Form
          </button>
        </div>

        {/* DeepClone Explanation */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">
            How DeepClone Works Here:
          </h3>
          <ul className="text-yellow-700 list-disc list-inside space-y-1">
            <li>
              <strong>Nested State Updates:</strong> Safely modifies deeply
              nested address objects
            </li>
            <li>
              <strong>Array Operations:</strong> Adds education entries without
              mutating original array
            </li>
            <li>
              <strong>Undo Functionality:</strong> Stores complete state
              snapshots for restoration
            </li>
            <li>
              <strong>History Tracking:</strong> Each change preserves previous
              state independently
            </li>
            <li>
              <strong>Form Reset:</strong> Restores initial state without
              reference issues
            </li>
          </ul>
        </div>

        {/* Current State Preview */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">
            📊 Current State Preview:
          </h3>
          <pre className="text-sm text-blue-700 overflow-auto">
            {JSON.stringify(resume, null, 2)}
          </pre>
        </div>
      </div>
    </section>
  );
}
