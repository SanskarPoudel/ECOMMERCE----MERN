import "./App.css";
import Header from "./components/home/Header";
import Home from "./components/home/Home";
import WebFont from "webfontloader";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Home />
      </Router>
    </>
  );
}

export default App;
