import {Link} from 'react-router-dom';

export function Dashboard() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#09090b]">
      <Link
        className="text-sm font-medium text-[#fafafa] hover:font-semibold hover:text-[#ffffff] hover:underline"
        to="/login"
      >
        Back to Login
      </Link>
    </div>
  );
}
