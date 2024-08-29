


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
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
    localStorage.removeItem("username");
    window.location.reload(); // Reloading the page to reset the state
  };

  return (
    <div className={styles.main_container}>
      <nav className={`${styles.navbar} navbar navbar-expand-lg navbar-light`}>
        <h1 className="navbar-brand logo">TryIt</h1>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/wishlist" className={`nav-link ${styles.link}`}>
                Wishlist
              </Link>
            </li>
          </ul>
        </div>
        <button className={`btn  ${styles.white_btn}`} onClick={handleLogout}>
          Logout
        </button>
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
    </div>
  );
};

export default Main;

