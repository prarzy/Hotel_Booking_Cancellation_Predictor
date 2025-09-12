from flask import Flask, jsonify, request, send_from_directory
from datetime import datetime
from encoders import FrequencyEncoder
import joblib
import pandas as pd
from flask_cors import CORS
#from sklearn.base import BaseEstimator, TransformerMixin
import os

# Initialize Flask app
base_dir = os.path.dirname(os.path.abspath(__file__))
build_path = os.path.join(base_dir, 'frontend', 'hotel_booking_ui', 'dist')
app = Flask(__name__, static_folder=build_path, static_url_path="")
CORS(app)

@app.route('/debug')
def debug_path():
    import os
    static_path = app.static_folder
    exists = os.path.exists(static_path)
    
    response = {
        'static_folder': static_path,
        'absolute_path': os.path.abspath(static_path) if static_path else None,
        'exists': exists,
    }
    
    if exists:
        response['files'] = os.listdir(static_path)
        # Check if index.html exists
        index_path = os.path.join(static_path, 'index.html')
        response['has_index'] = os.path.exists(index_path)
    
    return jsonify(response)


# Load pre-trained model
model = joblib.load('models/model.pkl')

columns = [
    'lead_time', 'arrival_date_year', 'arrival_date_week_number', 'arrival_date_day_of_month', 
    'stays_in_weekend_nights', 'stays_in_week_nights', 'adults', 'children', 'is_repeated_guest', 
    'booking_changes', 'agent', 'adr', 'required_car_parking_spaces', 'total_of_special_requests', 
    'prev_cancellation_ratio', 'has_waiting_list', 'room_honored', 'engagement_score',
    'risk_segment_cancel_rate','hotel', 'meal', 'deposit_type', 'customer_type', 'arrival_season',
    'country', 'room_pair', 'market_pair', 'arrival_date_month'
]

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        if data is None:
            raise ValueError("No JSON received from frontend")

        features = data.get('features', {})

        # Yes/No to 1/0
        yes_no_map = {'Yes': 1, 'No': 0}
        for col in ['is_repeated_guest', 'has_waiting_list']:
            features[col] = yes_no_map.get(features.get(col), 0)

        # Numeric conversion
        numeric_cols = [
            'lead_time', 'arrival_date_year', 'arrival_date_week_number', 'arrival_date_day_of_month',
            'stays_in_weekend_nights', 'stays_in_week_nights', 'adults', 'children',
            'booking_changes', 'agent', 'adr', 'required_car_parking_spaces', 'total_of_special_requests',
            'arrival_date_month'
        ]
        for col in numeric_cols:
            try:
                features[col] = float(features.get(col, 0))
            except (ValueError, TypeError):
                features[col] = 0

        # Derived features
        features['engagement_score'] = features.get('booking_changes', 0) * features.get('total_of_special_requests', 0)

        # Arrival season
        season_map = {
            '1': 'Winter', '2': 'Winter', '3': 'Spring', '4': 'Spring', '5': 'Spring',
            '6': 'Summer', '7': 'Summer', '8': 'Summer', '9': 'Fall',
            '10': 'Fall', '11': 'Fall', '12': 'Winter'
        }
        arrival_month = features.get('arrival_date_month', 0)
        features['arrival_season'] = season_map.get(str(int(arrival_month)), 'Unknown')

        # Always-defaulted features
        features['prev_cancellation_ratio'] = 0
        features['country'] = 'Unknown'
        features['risk_segment_cancel_rate'] = 0

        # Room & market features
        reserved = features.get('reserved_room_type')
        assigned = features.get('assigned_room_type')
        features['room_honored'] = int(reserved == assigned) if reserved and assigned else 0
        features['room_pair'] = f"{reserved}_{assigned}" if reserved and assigned else 'Unknown_Unknown'

        market_segment = features.get('market_segment')
        distribution_channel = features.get('distribution_channel')
        features['market_pair'] = f"{market_segment}_{distribution_channel}" if market_segment and distribution_channel else 'Unknown_Unknown'

        # Ensure all columns exist
        for col in columns:
            if col not in features:
                features[col] = 0 if col not in ['hotel', 'meal', 'deposit_type', 'customer_type', 'arrival_season', 'country', 'room_pair', 'market_pair'] else 'Unknown'

        input_df = pd.DataFrame([[features[col] for col in columns]], columns=columns)

        # Predict
        proba = model.predict_proba(input_df)[0][1]
        proba_percent = round(proba * 100, 2)
        prediction_time = datetime.now().isoformat()

        return jsonify({'cancellation_probability': proba_percent, 'prediction_time': prediction_time})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Serve React frontend
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    static_folder = app.static_folder
    
    # Check if the requested path is a static file
    if path != "" and os.path.exists(os.path.join(static_folder, path)):
        return send_from_directory(static_folder, path)
    else:
        # For all other routes, serve index.html (React Router will handle it)
        return send_from_directory(static_folder, "index.html")
print("Serving static folder:", os.path.abspath(app.static_folder))

# Run the app
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
