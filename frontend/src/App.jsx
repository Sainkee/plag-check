import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post("http://localhost:4000/api/plag", { text });
      setResult(response.data); // Update with the response data
    } catch (error) {
      setError("Error checking plagiarism. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");      // Clear the textarea content
    setResult(null);  // Reset the result
    setError("");     // Reset the error message
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-3xl transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-4xl">
          Plagiarism Checker
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            rows={8}
            className="w-full p-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="flex justify-between">
            {/* Check Plagiarism Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-3/4 py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              {loading ? "Checking..." : "Check for Plagiarism"}
            </button>

            {/* Clear Text Button */}
            <button
              type="button"
              onClick={handleClear}
              className="w-1/4 py-3 px-6 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Clear Text
            </button>
          </div>
        </form>

        {/* Display errors */}
        {error && <p className="text-red-500 mt-6 text-center">{error}</p>}

        {/* Display the result */}
        {result && result.status === "duplicate_content_found" && (
          <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Duplicate content found on:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {result.duplicate_content_found_on_links.map((link, index) => (
                <li key={index} className="break-all">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* No duplicate content found */}
        {result && result.status !== "duplicate_content_found" && (
          <p className="mt-10 text-center text-lg font-medium text-green-600">
            No duplicate content found!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
