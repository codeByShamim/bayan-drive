"use client";

import { useRouter } from "next/router";
import { topics } from "../../data/topics"; // Import topics data

export default function TopicPage() {
  const router = useRouter();
  const { id } = router.query; // Get the topic id from the URL

  const topic = topics.find((topic) => topic.id.toString() === id); // Find the topic by id

  if (!topic) {
    return <p>Topic not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <button
          className="flex items-center text-green-700 mt-4 hover:text-green-900"
          onClick={() => router.back()} // Go back to the previous page
        >
          <FaArrowLeft className="mr-2" /> ফিরে যান
        </button>
        <h2 className="text-2xl font-bold mt-4 text-green-800">{topic.title}</h2>
        <p className="mt-2 text-gray-700">{topic.details}</p>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topic.images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Image ${index + 1} for ${topic.title}`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
