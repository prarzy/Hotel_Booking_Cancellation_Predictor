import { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';

function Home() {
  // Load predictions from localStorage on initial render
  const [predictions, setPredictions] = useState(() => {
    const stored = localStorage.getItem('predictions');
    return stored ? JSON.parse(stored) : [];
  });

  // Save predictions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('predictions', JSON.stringify(predictions));
  }, [predictions]);

  // Handle deletion of a prediction
  const handleDelete = (indexToDelete) => {
    setPredictions(predictions.filter((_, idx) => idx !== indexToDelete));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex flex-col items-center p-6">
      <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">Cancellation Predictions</h2>

      {/* Display message if no predictions, else display grid of prediction cards */}
      {predictions.length === 0 ? (
        <p className="text-gray-600 text-center">No predictions yet. Visit Predict page to create one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {predictions.map((pred, index) => (
            <HotelCard
              key={index}
              prediction_time={pred.prediction_time}
              cancellation_probability={pred.cancellation_probability}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;


