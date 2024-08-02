import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
// import { Services } from "./components/services";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import PixPlate from "./components/pix";
import PixFridge from "./components/pixfridge";
import PixLogin from "./components/login";
import "./App.css";
import PixSignup from "./components/signup";
import PrivateRoute from "./routes/PrivateRoute";
import { Profile } from "./components/profile";

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
          <Route
            path="/"
            element={
              <div>
                <Header data={landingPageData.Header} />
                <Features data={landingPageData.Features} />
                <About data={landingPageData.About} />
                {/* <Services data={landingPageData.Services} /> */}
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
            element={
              <PrivateRoute
                element={<PixPlate data={landingPageData.Playground} />}
              />
            }
          />
          <Route
            path="/pix-fridge"
            element={
              <PrivateRoute
                element={<PixFridge data={landingPageData.Playground} />}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute
                element={<Profile data={landingPageData.Playground} />}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
