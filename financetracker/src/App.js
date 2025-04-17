import React from 'react'
// import Header from './components/Header'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Signup from './Pages/Signup'
import DashboardPage from './Pages/DashboardPage'
import {ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <>
    <ToastContainer />
   <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
   </Router>
   </>
  )
}

export default App;