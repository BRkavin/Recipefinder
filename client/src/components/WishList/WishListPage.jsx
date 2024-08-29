


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './WishlistPage.css'; // Import the CSS file for styling

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const userEmail = localStorage.getItem('userEmail'); // Assuming you store user's email upon login
  const navigate = useNavigate(); // Hook to navigate back to the main page

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you have a JWT token for authentication
        const response = await fetch(`https://recipefinder-52yd.onrender.com/api/recipes/user/${userEmail}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch wishlist: ${response.statusText}`);
        }
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error.message);
      }
    };

    fetchWishlist();
  }, [userEmail]);

  const removeFromWishlist = async (mealid) => {
    try {
      const token = localStorage.getItem('token');
      const userEmail = localStorage.getItem('userEmail');
      
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
  
      console.log('Meal ID:', mealid);
      console.log('Token:', token);
      console.log('User Email:', userEmail);
      
      const response = await fetch(`https://recipefinder-52yd.onrender.com/api/recipes/remove/${mealid}?userEmail=${userEmail}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Invalid or expired token. Please log in again.');
        } else if (response.status === 404) {
          throw new Error('Recipe not found in your wishlist');
        } else {
          throw new Error(`Failed to remove from wishlist: ${response.statusText}`);
        }
      }
    
      // Update local storage wishlist
      const updatedWishlist = wishlist.filter((recipe) => recipe.mealid !== mealid);
      localStorage.setItem(`${userEmail}_wishlist`, JSON.stringify(updatedWishlist));
    
      // Update state
      setWishlist(updatedWishlist);
      
      console.log('Removed from wishlist successfully!');
    } catch (error) {
      console.error('Error removing from wishlist:', error.message);
    }
  };
  
  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <button onClick={goBack} className="back-button">
          Back
        </button>
        <h2>My Wishlist</h2>
      </header>
      {wishlist.length > 0 ? (
        <ul className="wishlist-items">
          {wishlist.map((recipe) => (
            <li key={recipe._id} className="wishlist-item">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="wishlist-item-image"
              />
              <div className="wishlist-item-details">
                <h5>{recipe.title}</h5>
                <div className="wishlist-item-actions">
                  <Link to={`/meal/${recipe.mealid}`} className="btn btn-view">
                    View Recipe
                  </Link>
                  <button
                    className="btn btn-remove"
                    onClick={() => removeFromWishlist(recipe.mealid)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-message">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default WishlistPage;
