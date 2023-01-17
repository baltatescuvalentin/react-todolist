import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signin from './components/Signin';
import SharedLayout from './components/SharedLayout';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='react-todolist' element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path='signup' element={<Signup />} />
          <Route path='signin' element={<Signin />} />
          <Route path='resetpassword' element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;