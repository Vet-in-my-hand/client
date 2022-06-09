import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HospitalRegister from './components/auth/hospitalRegister';
import UserRegister from './components/auth/userRegister';
import Login from './components/auth/login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/hospital' element={<HospitalRegister />}></Route>
          <Route path='/user' element={<UserRegister />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
