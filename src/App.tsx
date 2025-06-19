import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from "./components/Banner";
import Contact from "./components/Contact";
import Feature from "./components/Feature";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Projects from "./components/Missions";
import Resume from "./components/Resume";
import Testimonial from "./components/Testimonial";
import AdminSignIn from "./components/admin/AdminSignIn";
import AdminConsole from "./components/admin/AdminConsole";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Main website component
const MainSite = () => {
  return (
    <main className="font-bodyFont w-full h-auto bg-bodyColor text-lightText">
      <Navbar />
      <div className="px-4">
        <div className="max-w-screen-xl mx-auto">
          <Banner />
          <Feature />
          <Projects />
          <Resume />
          <Testimonial />
          {/* <Contact /> */}
          {/* <Footer /> */}
        </div>
      </div>
    </main>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Main website route */}
        <Route path="/" element={<MainSite />} />
        
        {/* Test route to verify routing works */}
        <Route path="/test" element={<div className="min-h-screen bg-red-500 flex items-center justify-center text-white text-4xl">ROUTING WORKS!</div>} />
        
        {/* Admin routes */}
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route 
          path="/admin/console" 
          element={
            <ProtectedRoute>
              <AdminConsole />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect any admin route without specific path to signin */}
        <Route path="/admin" element={<AdminSignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
