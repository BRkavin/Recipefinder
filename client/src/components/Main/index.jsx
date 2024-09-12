


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import styles from "./styles.module.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Main = () => {
//   const [categories, setCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch(
//           "https://www.themealdb.com/api/json/v1/1/categories.php"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch categories");
//         }
//         const data = await response.json();
//         setCategories(data.categories);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredCategories = categories.filter((category) =>
//     category.strCategory.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     window.location.reload(); // Reloading the page to reset the state
//   };

//   return (
//     <div className={styles.main_container}>
//       <nav className={`${styles.navbar} navbar navbar-expand-lg navbar-light`}>
//         <h1 className="navbar-brand logo">TryIt</h1>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link to="/wishlist" className={`nav-link ${styles.link}`}>
//                 Wishlist
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <button className={`btn  ${styles.white_btn}`} onClick={handleLogout}>
//           Logout
//         </button>
//       </nav>
//       <div className="container mt-4">
//         {/* Search Bar */}
//         <div className="mb-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search Categories..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </div>
//         <div className="row">
//           {filteredCategories.map((category) => (
//             <div key={category.idCategory} className="col-lg-4 col-md-6 mb-4">
//               <Link to={`/category/${category.strCategory}`} className={`card ${styles.category_item}`}>
//                 <img
//                   src={category.strCategoryThumb}
//                   alt={category.strCategory}
//                   className={`card-img-top ${styles.category_image}`}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title text-center">{category.strCategory}</h5>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;














import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Main = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false); // For profile edit modal
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const fetchUserDetails = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      try {
        const { data } = await axios.get(`https://recipefinder-52yd.onrender.com/api/users/${userEmail}`);
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        alert(`Error fetching user details: ${error.response ? error.response.data.message : error.message}`);
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.strCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.reload(); // Reloading the page to reset the state
  };

  const handleSaveProfile = async () => {
    try {
      const url = `https://recipefinder-52yd.onrender.com/api/users/${userDetails.email}`;
      await axios.put(url, userDetails);
      setShowProfileModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className={styles.main_container}>
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
    <div className="container-fluid">
        <Link className="navbar-brand" to="/">
            <h1>TryIt</h1>
        </Link>
        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link to="/wishlist" className={`nav-link ${styles.link}`}>
                        Wishlist
                    </Link>
                </li>
                <li className="nav-item dropdown">
                    <button
                        className="btn dropdown-toggle"
                        id="profileDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Profile
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                        <li>
                            <button className="dropdown-item" onClick={() => setShowProfileModal(true)}>
                                Edit Profile
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>


      <div className="container mt-4">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search Categories..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="row">
          {filteredCategories.map((category) => (
            <div key={category.idCategory} className="col-lg-4 col-md-6 mb-4">
              <Link to={`/category/${category.strCategory}`} className={`card ${styles.category_item}`}>
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className={`card-img-top ${styles.category_image}`}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{category.strCategory}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bootstrap Profile Modal */}
      <div
        className="modal fade"
        id="profileModal"
        tabIndex="-1"
        aria-labelledby="profileModalLabel"
        aria-hidden="true"
        style={{ display: showProfileModal ? 'block' : 'none', opacity: showProfileModal ? 1 : 0 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="profileModalLabel">Edit Profile</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowProfileModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group mb-3">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={userDetails.firstName}
                  onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                />
              </div>
              <div className="form-group mb-3">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={userDetails.lastName}
                  onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                />
              </div>
              <div className="form-group mb-3">
                <label>Email</label>
                <input type="email" className="form-control" value={userDetails.email} readOnly />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowProfileModal(false)}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSaveProfile}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;


