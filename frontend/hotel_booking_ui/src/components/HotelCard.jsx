function HotelCard({ prediction_time, cancellation_probability, onDelete }) {
    // Determine color class based on cancellation probability
    let colorClass = '';
    if (cancellation_probability <= 30) colorClass = 'text-green-700';
    else if (cancellation_probability <= 70) colorClass = 'text-orange-700';
    else colorClass = 'text-red-700';

    return (
        <div className='relative bg-amber-100 border border-amber-200 shadow-md p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-wrap'>
            {/* Delete Button */}
            <button
                onClick={onDelete}
                className='absolute top-2 right-2 text-red-600 hover:text-red-900 hover:font-extrabold font-bold'
            >
                ×
            </button>

            <div className='w-full sm:w-2/3'>
                {/* Prediction Time */}
                <h3 className='text-base sm:text-lg font-semibold text-blue-700 break-words'>
                    Prediction Time: <span className='font-normal'>{new Date(prediction_time).toLocaleString()}</span>
                </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {/* Cancellation Probability */}
                <span className="text-black font-semibold break-words">Cancellation Probability:</span>
                <span className={`text-lg sm:text-xl font-bold ${colorClass} break-words`}>
                    {cancellation_probability}%
                </span>
            </div>
        </div>
    );
}

export default HotelCard;

