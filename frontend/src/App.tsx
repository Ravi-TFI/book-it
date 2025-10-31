// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import DetailsPage from './pages/DetailsPage';
// import CheckoutPage from './pages/CheckoutPage';
// import ResultPage from './pages/ResultPage';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <header className="bg-white shadow-sm sticky top-0 z-10">
//         <nav className="container mx-auto p-4 flex justify-between items-center">
//             <Link to="/">
//                 <img src="/HDlogo 1.jpg" alt="Highway Delite" className="h-10" />
//             </Link>
//             <div className="flex items-center border rounded-md">
//                 <input type="text" placeholder="Search experiences" className="px-4 py-2 outline-none"/>
//                 <button className="bg-yellow-400 font-bold px-4 py-2">Search</button>
//             </div>
//         </nav>
//       </header>
//       <main className="bg-gray-50 min-h-screen">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/details/:id" element={<DetailsPage />} />
//           <Route path="/checkout" element={<CheckoutPage />} />
//           <Route path="/result" element={<ResultPage />} />
//         </Routes>
//       </main>
//     </Router>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import ResultPage from './pages/ResultPage';
import SearchPage from './pages/SearchPage'; 

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto p-4 flex justify-between items-center">
            <Link to="/">
                <img src="/HDlogo 1.jpg" alt="Highway Delite" className="h-10" />
            </Link>
            <form onSubmit={handleSearch} className="flex items-center border rounded-md">
                <input 
                  type="text" 
                  placeholder="Search experiences" 
                  className="px-4 py-2 outline-none w-48 md:w-64"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="bg-yellow-400 font-bold px-4 py-2 hover:bg-yellow-500">Search</button>
            </form>
        </nav>
      </header>
      <main className="bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} /> {/* Add route for search results */}
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </main>
    </>
  );
};

// We need to wrap App in Router for the useNavigate hook to work
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;