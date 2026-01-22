import {SignIn} from '@/features/auth/components/SignIn';
import {Route, HashRouter as Router, Routes} from 'react-router-dom';
import {TooltipProvider} from '@/components/ui/tooltip';
import {SignUp} from '@/features/auth/components/SignUp';
import {Dashboard} from '@/features/dashboard/Dashboard';
import {Toaster} from '@/components/ui/sonner';
import {RequireAuth} from '@/features/auth/components/RequireAuth';
import {ForgotPassword} from '@/features/auth/components/ForgotPasswrod';

function App() {
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </TooltipProvider>
  );
}

export default App;
