import './App.css'
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { HashRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Backend from "./pages/Backend.tsx";
import Home from "./pages/Home.tsx";
import Release from "./pages/Release.tsx";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="wrapper">
                <Routes>
                    <Route path="/" element={ <Home/> }/>
                    <Route path="/backend" element={ <Backend/> }/>
                    <Route path="/release" element={ <Release/> }/>
                </Routes>
            </div>
            <Footer/>
        </Router>
    )
}

export default App
