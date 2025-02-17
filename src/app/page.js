"use client";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // For navigation arrows
import { topics } from "./data/topics"; // Import topics data

// Function to convert English numbers to Bangla numerals
const convertToBanglaNumerals = (num) => {
  const banglaNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().split("").map(digit => banglaNumerals[parseInt(digit)]).join("");
};

export default function HomePage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // To track the current image

  const handleNextImage = () => {
    if (currentImageIndex < selectedTopic.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleImageSelect = (index) => {
    setCurrentImageIndex(index);
  };

  // Default profile picture URL (use a placeholder image)
  const defaultProfilePic = "/images/profile-pic.jpeg"; // Replace with your default image URL
  const [profilePic, setProfilePic] = useState(null); // Track the uploaded profile picture

  // Reset current image index when selectedTopic changes
  useEffect(() => {
    if (selectedTopic) {
      setCurrentImageIndex(0); // Reset to the first image of the new topic
    }
  }, [selectedTopic]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-100 to-green-50 p-4 sm:p-6" style={{ backgroundImage: 'url(/images/islamic-pattern.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex-grow w-full max-w-[1200px] mx-auto bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-lg p-4 sm:p-6">
        {/* Display Topic List or Topic Details */}
        {!selectedTopic ? (
          <>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-green-900 text-center mb-6">
              <span className="text-lg text-gray-500 block">بِسْمِ ٱللَّهِ</span>
              📖 বয়ান ড্রাইভ
            </h1>
            <p className="text-center text-gray-600 mb-6">
              ইসলামের আলোতে জীবন গড়ুন, সঠিক জ্ঞান অর্জন করুন।
            </p>

            {/* Profile Picture Section */}
            <div className="flex justify-center items-center mt-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-green-700">
                <img
                  src={profilePic || defaultProfilePic} // Display the uploaded pic or default pic
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Topic List */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-4 bg-green-900 rounded-lg shadow-md cursor-pointer hover:bg-green-900 hover:shadow-lg transition-all"
                  onClick={() => setSelectedTopic(topic)}
                >
                  <h2 className="text-2xl font-semibold text-white mb-2">{topic.title}</h2>
                  <p className="text-gray-300 text-sm">বিস্তারিত পড়তে ক্লিক করুন</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            {/* Back Button */}
            <button
              className="flex items-center text-green-700 mb-4 hover:text-green-900"
              onClick={() => setSelectedTopic(null)}
            >
              <FaArrowLeft className="mr-2" /> ফিরে যান
            </button>

            {/* Topic Title (Updated Header) */}
            <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-green-900 text-center">
              {selectedTopic.title}
            </h2>

            {/* Image Carousel */}
            <div className="mt-6 relative">
              <div className="w-full min-h-[400px] sm:h-[600px] overflow-auto rounded-lg shadow-md">
                <img
                  src={selectedTopic.images[currentImageIndex]}
                  alt={`Topic ${selectedTopic.id} - Image ${currentImageIndex + 1}`}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Navigation Arrows - Moved Below the Image */}
              <div className="flex justify-center mt-4 gap-4">
                <button
                  onClick={handlePreviousImage}
                  className="bg-green-700 text-white px-4 py-2 flex items-center gap-2 rounded-full shadow-md hover:bg-green-800 disabled:opacity-50 transition-all"
                  disabled={currentImageIndex === 0}
                >
                  <FaArrowLeft />
                  পূর্ববর্তী
                </button>

                <button
                  onClick={handleNextImage}
                  className="bg-green-700 text-white px-4 py-2 flex items-center gap-2 rounded-full shadow-md hover:bg-green-800 disabled:opacity-50 transition-all"
                  disabled={currentImageIndex === selectedTopic.images.length - 1}
                >
                  পরবর্তী
                  <FaArrowRight />
                </button>
              </div>
            </div>

            {/* Show current image number dynamically in the format "1 of 8" in Bangla */}
            <p className="mt-4 text-gray-700 text-center">
              বর্তমানে আপনি দেখছেন {convertToBanglaNumerals(currentImageIndex + 1)} / {convertToBanglaNumerals(selectedTopic.images.length)} পৃষ্ঠা।
            </p>
          </div>
        )}
      </div>

      {/* Bottom Section - Displaying a Popular Hadith */}
      {!selectedTopic && (
        <div className="flex justify-center items-center mt-6 bg-white py-4 shadow-md rounded-b-lg">
          <blockquote className="text-center text-gray-700 text-lg italic px-6">
            "একজন মুমিন কখনো অন্য মুমিনকে ঠকাতে পারে না, সে কখনো মিথ্যা বলবে না এবং তার প্রতিশ্রুতি কখনো ভঙ্গ করবে না।"
            <footer className="mt-2 text-gray-500 text-sm">
              - হাদিস <br />
              <span className="text-xs">সাহিহ মুসলিম, হাদিস নং ৩৭৭৫</span>
            </footer>
          </blockquote>
        </div>
      )}
    </div>
  );
}
