import React, { useState, useEffect } from 'react';

const RecipeFinder = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <h2>Recipe Finder</h2>
            <div>
                <h3>Categories:</h3>
                <ul>
                    {categories.map(category => (
                        <li key={category.idCategory}>
                            <img src={category.strCategoryThumb} alt={category.strCategory} style={{ width: '100px', height: '100px' }} />
                            <div>
                                <h4>{category.strCategory}</h4>
                                <p>{category.strCategoryDescription}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecipeFinder;
