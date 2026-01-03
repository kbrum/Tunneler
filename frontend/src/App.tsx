import { SignIn } from '@/features/auth/SignIn';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SignUp } from '@/features/auth/SignUp';
import { ForgotPassword } from '@/features/auth/ForgotPasswrod';

function App() {
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </TooltipProvider>
  );
}

export default App;
