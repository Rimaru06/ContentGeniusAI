"use client";
import { useState } from "react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

export default function Home() {
  const [content, setContent] = useState<string>("");
  const [contentType, setContentType] = useState<string>("Blog Post Outline");
  const [tone, setTone] = useState<string>("Professional");
  const [keywords, setKeywords] = useState<string>("");
  const [length, setLength] = useState<string>("Medium");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    const id = Date.now();
    const newToast = { id, message, type };
    console.log("Adding toast:", newToast); // Debug log
    setToasts((prev) => {
      console.log("Previous toasts:", prev); // Debug log
      const updated = [...prev, newToast];
      console.log("Updated toasts:", updated); // Debug log
      return updated;
    });

    // Auto remove toast after 5 seconds
    setTimeout(() => {
      console.log("Removing toast with id:", id); // Debug log
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Test function to verify toasts work
  const testToast = () => {
    showToast("Test toast message!", "info");
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      showToast("Please enter the content description", "error");
      return;
    }

    setIsLoading(true);
    setGeneratedContent("");

    // Improved prompt for better AI output
    const prompt = `You are a professional content writer. Create a ${length.toLowerCase()} ${contentType.toLowerCase()} with the following specifications:

**Topic:** ${content}
**Tone:** ${tone}
**Target Length:** ${
      length === "Short"
        ? "100-300 words"
        : length === "Medium"
        ? "300-600 words"
        : "600+ words"
    }
**Keywords to include:** ${keywords || "No specific keywords"}

**Requirements:**
- Make the content engaging and well-structured
- Use clear headings and subheadings where appropriate
- Include actionable insights or takeaways
- Ensure the tone is consistently ${tone.toLowerCase()}
- Naturally incorporate the keywords: ${keywords}
- Format the content with proper spacing and structure

Please provide high-quality, original content that meets these specifications.`;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.content) {
        setGeneratedContent(data.content);
        showToast("Content generated successfully!", "success");
      } else {
        throw new Error("No content received from server");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to generate content. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopySuccess(true);
      showToast("Content copied to clipboard!", "success");
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      showToast("Failed to copy content. Please try again.", "error");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 px-4">
      {/* Toast Container - Mobile optimized */}
      <div className="fixed top-4 right-4 left-4 sm:left-auto z-[9999] space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`w-full sm:max-w-sm shadow-xl rounded-lg pointer-events-auto transform transition-all duration-300 ease-in-out animate-in slide-in-from-right ${
              toast.type === "success"
                ? "bg-green-500 text-white border-l-4 border-green-600"
                : toast.type === "error"
                ? "bg-red-500 text-white border-l-4 border-red-600"
                : "bg-blue-500 text-white border-l-4 border-blue-600"
            }`}
          >
            <div className="p-3 sm:p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {toast.type === "success" && (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {toast.type === "error" && (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  {toast.type === "info" && (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </div>
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm font-medium">{toast.message}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="inline-flex text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 transition ease-in-out duration-150"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-8 py-4 sm:py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              ContentGenius AI
            </h1>
            <p className="text-blue-100 mt-1 sm:mt-2 text-sm sm:text-base">
              Generate compelling content with the power of AI
            </p>
          </div>

          <div className="p-4 sm:p-8">
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <span className="w-2 h-6 sm:h-8 bg-blue-600 rounded mr-3"></span>
                Generate New Content
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Content Description */}
                <div className="lg:col-span-2">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    What content do you need?
                  </label>
                  <textarea
                    id="content"
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                    placeholder="e.g., Write a blog post about the benefits of remote work for small businesses."
                  />
                </div>

                {/* Content Type */}
                <div>
                  <label
                    htmlFor="content-type"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Content Type
                  </label>
                  <select
                    name="content-type"
                    id="content-type"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm sm:text-base"
                  >
                    <option value="Blog Post Outline">Blog Post Outline</option>
                    <option value="Social Media Caption">
                      Social Media Caption
                    </option>
                    <option value="Product Description">
                      Product Description
                    </option>
                    <option value="Short Story Idea">Short Story Idea</option>
                  </select>
                </div>

                {/* Tone */}
                <div>
                  <label
                    htmlFor="tone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tone
                  </label>
                  <select
                    name="tone"
                    id="tone"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm sm:text-base"
                  >
                    <option value="Professional">Professional</option>
                    <option value="Casual">Casual</option>
                    <option value="Humorous">Humorous</option>
                    <option value="Formal">Formal</option>
                    <option value="Friendly">Friendly</option>
                  </select>
                </div>

                {/* Keywords */}
                <div>
                  <label
                    htmlFor="Keywords"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="Keywords"
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="e.g., remote work, flexibility, productivity"
                  />
                </div>

                {/* Length */}
                <div>
                  <label
                    htmlFor="Length"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Content Length
                  </label>
                  <select
                    name="Length"
                    id="Length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm sm:text-base"
                  >
                    <option value="Short">Short (100-300 words)</option>
                    <option value="Medium">Medium (300-600 words)</option>
                    <option value="Long">Long (600+ words)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="mt-6 sm:mt-8 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
              >
                <span className="flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Generate Content
                    </>
                  )}
                </span>
              </button>
            </section>

            <section className="border-t pt-6 sm:pt-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <span className="w-2 h-6 sm:h-8 bg-green-600 rounded mr-3"></span>
                Generated Content
              </h2>

              {isLoading ? (
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600 text-sm sm:text-base">
                    Generating content...
                  </p>
                </div>
              ) : generatedContent ? (
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 relative">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                    <span className="text-sm text-gray-600 font-medium">
                      Generated Content
                    </span>
                    <button
                      onClick={handleCopy}
                      className={`flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        copySuccess
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200"
                      }`}
                    >
                      {copySuccess ? (
                        <>
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-gray-800 font-sans leading-relaxed text-sm sm:text-base overflow-x-auto">
                      {generatedContent}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 min-h-24 sm:min-h-32 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <svg
                      className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-sm sm:text-base">
                      Your generated content will appear here
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
