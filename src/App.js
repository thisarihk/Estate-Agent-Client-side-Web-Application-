// Import necessary modules and components from React and react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";

// Define the main App component
function App() {
  return (
    // Set up BrowserRouter component to enable routing functionality
    <BrowserRouter>
      {/* Include the Header component */}
      <Header />
      {/* Define routes using the Routes component */}
      <Routes>
        {/* Define a Route for the root path "/" to render the Home component */}
        <Route path="/" element={<Home />} />
        {/* Define a Route for the "/about" path to render the About component */}
        <Route path="/about" element={<About />} />
      </Routes>
      {/* Include the Footer component */}
      <Footer />
    </BrowserRouter>
  );
}

// Export the App component as the default export
export default App;
