// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Main from "./components/Main";
// import Signup from "./components/Singup";
// import Login from "./components/Login";
// import RecipeFinder from "./components/RecipeFinder";
// import CategoryPage from "./components/Category/CategoryPage";
// import Meal from "./components/Meal/meal";

// function App() {
//   const user = localStorage.getItem("token");

//   return (
//     <Router>
//       <Routes>
//         {user && <Route path="/" element={<Main />} />}
//         {user && <Route path="/recipes" element={<RecipeFinder />} />}
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/category/:categoryName" element={<CategoryPage />} />
//         <Route path="/meal/:mealId" element={<Meal />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Navigate replace to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// import { Route, Routes, Navigate } from "react-router-dom";
// import Main from "./components/Main";
// import Signup from "./components/Singup";
// import Login from "./components/Login";
// import RecipeFinder from "./components/RecipeFinder";
// import CategoryPage from './components/Category/CategoryPage';
// import Meal from "./components/Meal/meal";
// import WishlistPage from "./components/WishList/WishListPage";

// function App() {
//   const user = localStorage.getItem("token");

//   return (
//     <Routes>
//       {user && <Route path="/" element={<Main />} />}
//       {user && <Route path="/recipes" element={<RecipeFinder />} />}
//       <Route path="/signup" element={<Signup />} />
// 	  <Route path="/meal/:id" element={<Meal />} />
//       <Route path="/category/:categoryName" element={<CategoryPage />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/" element={<Navigate replace to="/login" />} />
// 	  <Route path="/wishlist" element={<WishlistPage/>}></Route>
//     </Routes>
//   );
// }

// export default App;


// import { Route, Routes, Navigate } from "react-router-dom";
// import { useState } from "react";
// import Main from "./components/Main";
// import Signup from "./components/Singup";
// import Login from "./components/Login";
// import RecipeFinder from "./components/RecipeFinder";
// import CategoryPage from './components/Category/CategoryPage';
// import Meal from "./components/Meal/meal";
// import WishlistPage from "./components/WishList/WishListPage";

// function App() {
//   const [user, setUser] = useState(localStorage.getItem("token"));

//   const handleLogin = (token) => {
//     localStorage.setItem("token", token);
//     setUser(token);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <Routes>
//       {!user && <Route path="/login" element={<Login onLogin={handleLogin} />} />}
//       {!user && <Route path="/" element={<Navigate to="/login" />} />}
//       {user && <Route path="/" element={<Main onLogout={handleLogout} />} />}
//       {user && <Route path="/recipes" element={<RecipeFinder />} />}
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/recipe/:id" element={<Meal />} />
//       <Route path="/category/:categoryName" element={<CategoryPage />} />
//       {user && <Route path="/wishlist" element={<WishlistPage />} />}
//     </Routes>
//   );
// }

// export default App;

import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import RecipeFinder from "./components/RecipeFinder";
import CategoryPage from './components/Category/CategoryPage';
import Meal from "./components/Meal/meal";
import WishlistPage from "./components/WishList/WishListPage";

function App() {
  const [user, setUser] = useState(localStorage.getItem("token"));

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setUser(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Routes>
      {!user && <Route path="/" element={<Login onLogin={handleLogin} />} />}
      {!user && <Route path="/login" element={<Login onLogin={handleLogin} />} />}
      {!user && <Route path="/signup" element={<Signup />} />}
      {user && <Route path="/" element={<Main onLogout={handleLogout} />} />}
      {user && <Route path="/recipes" element={<RecipeFinder />} />}
      {user && <Route path="/meal/:id" element={<Meal />} />}
      {user && <Route path="/category/:categoryName" element={<CategoryPage />} />}
      {user && <Route path="/wishlist" element={<WishlistPage />} />}
      {user && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  );
}

export default App;
