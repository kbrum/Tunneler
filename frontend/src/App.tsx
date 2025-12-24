import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Tunneler App</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
