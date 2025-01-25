import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import CreateForm from './components/CreateForm';
import LandingPage from './components/Landingpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="signup" element={<SignupForm />} />
        <Route path="createform" element={<CreateForm />} />
        <Route index element={<LoginForm />} />
        <Route path="landingpage" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
