import { BrowserRouter , Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import EntrancePage from "./pages/EntrancePage.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />  
        <Route path="/signUp" element={<SignUpPage />} />   
        <Route path="/entrance" element={<EntrancePage />} />        

      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
  );
}

export default App;
