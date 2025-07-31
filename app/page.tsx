"use client";
import { useState } from "react";

export default function Home() {
  const [content , setContent] = useState<string>("");
  const [contentType, setContentType] = useState<string>("Blog Post Outline");
  const [tone, setTone] = useState<string>("Professional");
  const [keywords, setKeywords] = useState<string>("");
  const [length, setLength] = useState<string>("Medium");

  const handleSubmit = async () => {
    console.log(content,contentType,tone,keywords,length)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">ContentGenius AI</h1>
            <p className="text-blue-100 mt-2">Generate compelling content with the power of AI</p>
          </div>

          <div className="p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="w-2 h-8 bg-blue-600 rounded mr-3"></span>
                Generate New Content
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Content Description */}
                <div className="md:col-span-2">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    What content do you need?
                  </label>
                  <textarea 
                    id="content" 
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="e.g., Write a blog post about the benefits of remote work for small businesses."
                  />
                </div>

                {/* Content Type */}
                <div>
                  <label htmlFor="content-type" className="block text-sm font-medium text-gray-700 mb-2">
                    Content Type
                  </label>
                  <select 
                    name="content-type" 
                    id="content-type"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="Blog Post Outline">Blog Post Outline</option>
                    <option value="Social Media Caption">Social Media Caption</option>
                    <option value="Product Description">Product Description</option>
                    <option value="Short Story Idea">Short Story Idea</option>
                  </select>
                </div>

                {/* Tone */}
                <div>
                  <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
                    Tone
                  </label>
                  <select 
                    name="tone" 
                    id="tone"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
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
                  <label htmlFor="Keywords" className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords (comma-separated)
                  </label>
                  <input 
                    type="text" 
                    id="Keywords"
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., remote work, flexibility, productivity"
                  />
                </div>

                {/* Length */}
                <div>
                  <label htmlFor="Length" className="block text-sm font-medium text-gray-700 mb-2">
                    Content Length
                  </label>
                  <select 
                    name="Length" 
                    id="Length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="Short">Short (100-300 words)</option>
                    <option value="Medium">Medium (300-600 words)</option>
                    <option value="Long">Long (600+ words)</option>
                  </select>
                </div>
              </div>

              <button onClick={handleSubmit} className="mt-8 w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Content
                </span>
              </button>
            </section>

            <section className="border-t pt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="w-2 h-8 bg-green-600 rounded mr-3"></span>
                Generated Content
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 min-h-32 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>Your generated content will appear here</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
