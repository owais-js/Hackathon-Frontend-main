import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import CreateForm from './components/CreateForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="signup" element={<SignupForm />} />
        <Route path="createform" element={<CreateForm />} />
        <Route index element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
