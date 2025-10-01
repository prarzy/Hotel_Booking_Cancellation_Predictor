# Hotel Booking Cancellation Predictor 🏨❌

Predict the likelihood of a hotel booking being cancelled using a smart machine learning-powered web application. This project helps hotel managers and travel businesses optimize operations and reduce revenue loss.

---

## Features 

* Predict cancellation chances for individual bookings based on:

  * Lead time
  * Stay duration (weekend and week nights)
  * Number of guests (adults, children)
  * Booking changes, special requests, and more

* Scrollable dashboard displaying multiple hotels and their cancellation risk

* Interactive React frontend with clean, user-friendly interface

* Real-time predictions powered by a machine learning pipeline developed in Jupyter Notebooks

---

## Tech Stack 

* **Frontend:** React
* **Backend:** Flask
* **Machine Learning:** Python (scikit-learn) with Jupyter Notebooks

---

## Demo 

For images, refer to 'media' folder
For full demo, watch the video: [Demo Video](https://youtu.be/sqDbB4TbxKc)

---

## Getting Started 

1. **Clone the repository**

```bash
git clone https://github.com/prarzy/Hotel_Booking_Cancellation_Predictor.git
cd Hotel_Booking_Cancellation_Predictor
```

2. **Set up Python environment**

* Create a virtual environment:

```bash
python -m venv venv
```

* Activate the environment:

  * **Linux/Mac**

```bash
source venv/bin/activate
```

* **Windows**

```bash
venv\Scripts\activate
```

* Install Python dependencies:

```bash
pip install -r requirements.txt
```

3. **Run the Flask backend**

```bash
python app.py
```

The API will usually run on `http://127.0.0.1:5000`.

4. **Run the React frontend**

```bash
cd frontend/hotel_booking_ui
npm install
npm start
```

5. **Access Jupyter Notebooks (optional)**
   All ML experiments and model training were done in Jupyter Notebooks.

```bash
jupyter notebook
```

Then open the notebooks in the `notebooks/` folder.

6. **Using the App**

* Enter hotel booking features in the Predict form
* Submit to get a **cancellation probability**
* View the scrollable dashboard to see predictions for multiple hotels

---


## License 📄

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.


