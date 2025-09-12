import Home from './pages/Home';
import Predict from './pages/Predict';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
        {/* Header */}
        <header className="bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 shadow-md p-4 text-center">
          <h2 className="text-xl font-medium tracking-wide">Hotel Booking Cancellation Predictor</h2>
        </header>

        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm p-3 flex justify-center space-x-8">
          <Link to='/' className="text-blue-600 hover:underline font-medium">Home</Link>
          <Link to='/predict' className="text-blue-600 hover:underline font-medium">Predict</Link>
        </nav>

        {/* Main Content */}
        <main className="p-6">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/predict' element={<Predict />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

