import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import PixPlate from "./components/pix";
import PixFridge from "./components/pixfridge";
import PixLogin from "./components/login";
import "./App.css";
import PixSignup from "./components/signup";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          {/* <Route
            path="#features"
            element={<Features data={landingPageData.Features} />}
          />
          <Route
            path="#about"
            element={<About data={landingPageData.About} />}
          />
          <Route
            path="#services"
            element={<Services data={landingPageData.Services} />}
          />
          <Route path="/team" element={<Team data={landingPageData.Team} />} />
          <Route
            path="/contact"
            element={<Contact data={landingPageData.Contact} />}
          /> */}
          <Route
            path="/"
            element={
              <div>
                <Header data={landingPageData.Header} />
                <Features data={landingPageData.Features} />
                <About data={landingPageData.About} />
                <Services data={landingPageData.Services} />
                {/* <Team data={landingPageData.Team} /> */}
                <Contact data={landingPageData.Contact} />
              </div>
            }
          />
          <Route
            path="/login"
            element={<PixLogin data={landingPageData.login} />}
          />
          <Route
            path="/signup"
            element={<PixSignup data={landingPageData.signup} />}
          />
          <Route
            path="/pix"
            element={<PixPlate data={landingPageData.Playground} />}
          />
          <Route
            path="/pix-fridge"
            element={<PixFridge data={landingPageData.Playground} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
