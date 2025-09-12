import { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

function Predict({ onPrediction }) {
  // Initial form state
  const initialState = {
    hotel: '', lead_time: '', arrival_date_year: '', arrival_date_week_number: '', arrival_date_day_of_month: '',
    stays_in_weekend_nights: '', stays_in_week_nights: '', adults: '', children: '', booking_changes: '',
    agent: '', total_of_special_requests: '', arrival_date_month: '', is_repeated_guest: '', has_waiting_list: '',
    adr: '', required_car_parking_spaces: '', meal: '', deposit_type: '', customer_type: '',
    reserved_room_type: '', assigned_room_type: '', market_segment: '', distribution_channel: ''
  };

  const [formData, setFormData] = useState(initialState);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send POST request to backend
      const res = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: formData })
      });
      // Parse JSON response
      const data = await res.json();

      if (data.error) {
        alert("Prediction failed: " + data.error);
      } else {
        alert("Prediction saved! Go to Home to see it.");
        
        // Notify parent component
        const stored = localStorage.getItem('predictions');
        const predictions = stored ? JSON.parse(stored) : [];
        localStorage.setItem('predictions', JSON.stringify([data, ...predictions]));
      }

    } catch (err) {
      console.error('Fetch failed:', err);
      alert('Prediction failed. Please check console.');
    }

    setFormData(initialState);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex justify-center items-start p-8">
      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full space-y-6 border border-gray-300">
        <h2 className="text-2xl font-semibold text-blue-600 text-center">New Prediction</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Hotel Type</label>
            <select
              name="hotel"
              value={formData.hotel}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-800"
            >
              <option value="">Select</option>
              <option value="City">City</option>
              <option value="Resort">Resort</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Lead Time</label>
            <input
              type="number"
              name="lead_time"
              value={formData.lead_time}
              onChange={handleChange}
              placeholder="Lead Time"
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Arrival Year</label>
            <input
              type="number"
              name="arrival_date_year"
              value={formData.arrival_date_year}
              onChange={handleChange}
              placeholder="Arrival Year"
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Week Number</label>
            <input
              type="number"
              name="arrival_date_week_number"
              value={formData.arrival_date_week_number}
              onChange={handleChange}
              placeholder="Week Number"
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Day of Month</label>
            <input
              type="number"
              name="arrival_date_day_of_month"
              value={formData.arrival_date_day_of_month}
              onChange={handleChange}
              placeholder="Day of Month"
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Weekend Nights</label>
            <input
              type="number"
              name="stays_in_weekend_nights"
              value={formData.stays_in_weekend_nights}
              onChange={handleChange}
              placeholder="Weekend Nights"
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Week Nights</label>
            <input
              type="number"
              name="stays_in_week_nights"
              value={formData.stays_in_week_nights}
              onChange={handleChange}
              placeholder="Week Nights"
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Adults</label>
            <input
              type="number"
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              placeholder="Adults"
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Children</label>
            <input
              type="number"
              name="children"
              value={formData.children}
              onChange={handleChange}
              placeholder="Children"
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Booking Changes</label>
            <input
              type="number"
              name="booking_changes"
              value={formData.booking_changes}
              onChange={handleChange}
              placeholder="Booking Changes"
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Agent</label>
            <input
              type="number"
              name="agent"
              value={formData.agent}
              onChange={handleChange}
              placeholder="Agent"
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Total Special Requests</label>
            <input
              type="number"
              name="total_of_special_requests"
              value={formData.total_of_special_requests}
              onChange={handleChange}
              placeholder="Total Special Requests"
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Arrival Month</label>
            <input
              type="number"
              name="arrival_date_month"
              value={formData.arrival_date_month}
              onChange={handleChange}
              placeholder="1-12"
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Is Repeated Guest</label>
            <select
              name="is_repeated_guest"
              value={formData.is_repeated_guest}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-800"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Has Waiting List</label>
            <select
              name="has_waiting_list"
              value={formData.has_waiting_list}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-800"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">ADR</label>
            <input
              type="number"
              step="0.01"
              name="adr"
              value={formData.adr}
              onChange={handleChange}
              placeholder="ADR"
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Required Parking Spaces</label>
            <select
              name="required_car_parking_spaces"
              value={formData.required_car_parking_spaces}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-800"
            >
              <option value="">Select</option>
              {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Meal</label>
            <select
              name="meal"
              value={formData.meal}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-800"
            >
              <option value="">Select</option>
              <option value="BB">BB</option>
              <option value="HB">HB</option>
              <option value="FB">FB</option>
              <option value="SC">SC</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Reserved Room Type</label>
            <select
              name="reserved_room_type"
              value={formData.reserved_room_type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-800"
            >
              <option value="">Select</option>
              {['C','A','D','E','G','F','H','L','P','B'].map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Assigned Room Type</label>
            <select
              name="assigned_room_type"
              value={formData.assigned_room_type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-800"
            >
              <option value="">Select</option>
              {['C','A','D','E','G','F','I','B','H','P','L','K'].map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Market Segment</label>
            <select
              name="market_segment"
              value={formData.market_segment}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-800"
            >
              <option value="">Select</option>
              {['Direct','Corporate','Online TA','Offline TA/TO','Complementary','Groups','Undefined','Aviation'].map(seg => <option key={seg} value={seg}>{seg}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Distribution Channel</label>
            <select
              name="distribution_channel"
              value={formData.distribution_channel}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-800"
            >
              <option value="">Select</option>
              {['Direct','Corporate','TA/TO','Undefined','GDS'].map(ch => <option key={ch} value={ch}>{ch}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Deposit Type</label>
            <select
              name="deposit_type"
              value={formData.deposit_type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-800"
            >
              <option value="">Select</option>
              <option value="No Deposit">No Deposit</option>
              <option value="Non Refundable">Non Refundable</option>
              <option value="Refund">Refund</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Customer Type</label>
            <select
              name="customer_type"
              value={formData.customer_type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-gray-800"
            >
              <option value="">Select</option>
              <option value="Transient">Transient</option>
              <option value="Contract">Contract</option>
              <option value="Transient Party">Transient Party</option>
              <option value="Group">Group</option>
            </select>
          </div>

        </div>
        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Predict
        </button>
      </form>
    </div>
  );
}

export default Predict;
