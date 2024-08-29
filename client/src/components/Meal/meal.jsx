


import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Meal.css';

const Meal = () => {
  const [meal, setMeal] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate(); // For navigating back

  // Function to fetch meal details
  const displayMeal = useCallback(async () => {
    let url;

    if (!isNaN(id)) {
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.meals) {
        setMeal(data.meals[0]);
      } else {
        console.log('Meal not found');
      }
    } catch (error) {
      console.error('Error fetching meal:', error.message);
    }
  }, [id]);

  // Load wishlist from local storage on component mount
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      const storedWishlist = JSON.parse(localStorage.getItem(`${userEmail}_wishlist`)) || [];
      setWishlist(storedWishlist);
    }
  }, []);

  const addToWishlist = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        throw new Error('User is not logged in.');
      }
  
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found. User may not be authenticated.');
      }
  
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`); // Use Authorization header
      myHeaders.append("Content-Type", "application/json");
  
      const mealDetails = {
        mealid: meal.idMeal,
        title: meal.strMeal,
        cuisine: meal.strCategory,
        ingredients: Object.keys(meal)
                            .filter(key => key.includes('Ingredient') && meal[key])
                            .map(key => meal[key]),
        instructions: meal.strInstructions,
        image: meal.strMealThumb,
        email: userEmail,
      };
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(mealDetails),
      };
  
      const response = await fetch('http://localhost:8080/api/recipes/add', requestOptions);
      if (!response.ok) {
        throw new Error('Failed to add to wishlist.');
      }
  
      const newWishlist = [...wishlist, meal];
      localStorage.setItem(`${userEmail}_wishlist`, JSON.stringify(newWishlist));
      setWishlist(newWishlist);
  
      console.log('Added to wishlist successfully!');
    } catch (error) {
      console.error('Error adding to wishlist:', error.message);
    }
  };
  

  // Remove meal from wishlist
  const removeFromWishlist = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        throw new Error('User is not logged in.');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found. User may not be authenticated.');
      }

      const myHeaders = new Headers();
      myHeaders.append("x-auth-token", token);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
      };

      const response = await fetch(`http://localhost:8080/api/recipes/remove/${meal.idMeal}`, requestOptions);
      if (!response.ok) {
        throw new Error(`Failed to remove from wishlist. Server responded with status: ${response.status}`);
      }

      // Update local storage wishlist
      const newWishlist = wishlist.filter(item => item.idMeal !== meal.idMeal);
      localStorage.setItem(`${userEmail}_wishlist`, JSON.stringify(newWishlist));
      setWishlist(newWishlist);

      console.log('Removed from wishlist successfully!');
    } catch (error) {
      console.error('Error removing from wishlist:', error.message);
    }
  };

  // Check if meal is in wishlist
  const isInWishlist = () => {
    return wishlist.some(item => item.idMeal === meal.idMeal);
  };

  useEffect(() => {
    displayMeal();
  }, [displayMeal]); // Include displayMeal here

  return (
    <section id='single-meal' className='meal-section position-relative'>
      <button className='back-button' onClick={() => navigate(-1)}>Back</button>
      {meal.strMeal ? (
        <>
          <div className="meal-header">
            <h2>{meal.strMeal}</h2>
          </div>
          <div className="meal-content">
            <div className="meal-video">
              <ReactPlayer url={meal.strYoutube} width='100%' height='100%' />
            </div>
            <div className='meal-details'>
              <div className='meal-info'>
                <p><strong>Category:</strong> {meal.strCategory}</p>
                <p><strong>Area:</strong> {meal.strArea}</p>
              </div>
              <div className='meal-instructions'>
                <h3>Instructions:</h3>
                <p>{meal.strInstructions}</p>
              </div>
              <div className='meal-ingredients'>
                <h3>Ingredients:</h3>
                <ul>
                  {Object.keys(meal)
                    .filter(key => key.includes('Ingredient') && meal[key])
                    .map(key => (
                      <li key={key}>{meal[key]}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="wishlist-button">
            <button onClick={isInWishlist() ? removeFromWishlist : addToWishlist}>
              {isInWishlist() ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </>
      ) : (
        <p>Meal not found</p>
      )}
    </section>
  );
};

export default Meal;

