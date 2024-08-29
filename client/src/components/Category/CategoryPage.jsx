


import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CategoryPage.css'; // Import custom CSS file for additional styling

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/categories.php`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }
        const data = await response.json();
        const category = data.categories.find(
          (cat) => cat.strCategory === categoryName
        );
        if (category) {
          setCategoryDescription(category.strCategoryDescription);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    const fetchMeals = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }
        const data = await response.json();
        setMeals(data.meals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchCategory();
    fetchMeals();
  }, [categoryName]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="position-relative mb-4">
        <h2 className="display-4 text-warning text-center">{categoryName} Meals</h2>
        <button
          className="btn btn-outline-light back-button"
          onClick={() => navigate('/')}
          title="Back to Categories"
        >
          <i className="bi bi-arrow-left"></i> Back
        </button>
      </div>
      <p className="text-center mb-5 text-muted">{categoryDescription}</p>
      <div className="mb-4 text-center">
        <input
          type="text"
          className="form-control form-control-lg w-75 mx-auto search-bar"
          placeholder="Search meals..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row">
  {filteredMeals.length > 0 ? (
    filteredMeals.map((meal) => (
      <div key={meal.idMeal} className="col-lg-4 col-md-6">
        <Link to={`/meal/${meal.idMeal}`} className="text-decoration-none">
          <div className="card border-0 shadow-lg rounded-3 meal-card">
            <img src={meal.strMealThumb} className="card-img-top rounded-3" alt={meal.strMeal} />
            <div className="card-body text-center">
              <h5 className="card-title">{meal.strMeal}</h5>
              <p className="card-text text-muted">{meal.strCategory}</p>
            </div>
          </div>
        </Link>
      </div>
    ))
  ) : (
    <p className="text-center col-12 text-danger">No meals found</p>
  )}
</div>

    </div>
  );
};

export default CategoryPage;

