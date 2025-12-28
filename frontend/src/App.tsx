import { SignIn } from '@/features/sign-in/SignIn';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SignUp } from '@/features/sign-up/SignUp';

function App() {
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </TooltipProvider>
  );
}

export default App;
