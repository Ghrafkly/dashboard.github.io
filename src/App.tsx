import './App.css'
import Navbar from "./components/common/Navbar.tsx";
import Footer from "./components/common/Footer.tsx";
import { HashRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Backend from "./pages/Backend.tsx";
import Home from "./pages/Home.tsx";
import Release from "./pages/Release.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Testing from "./pages/Testing.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Navbar />
                    <Routes>
                        <Route path="/" element={ <Home/> }/>
                        <Route path="/backend" element={ <Backend/> }/>
                        <Route path="/release" element={ <Release/> }/>
                        <Route path="/testing" element={ <Testing/> }/>
                    </Routes>
                <Footer/>
            </Router>
        </QueryClientProvider>
    )
}

export default App
