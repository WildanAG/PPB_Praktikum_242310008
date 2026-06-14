import axios from 'axios';

const API_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchProducts = async () => {
  try {
    // Get random meals
    const meals = [];
    for (let i = 0; i < 8; i++) {
      const response = await axios.get(`${API_URL}/random.php`);
      meals.push({
        id: response.data.meals[0].idMeal,
        title: response.data.meals[0].strMeal,
        price: Math.floor(Math.random() * 20) + 5, // Mock price
        description: response.data.meals[0].strCategory,
        image: response.data.meals[0].strMealThumb,
        category: response.data.meals[0].strArea,
      });
    }
    return meals;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
    if (response.data.meals) {
      return {
        id: response.data.meals[0].idMeal,
        title: response.data.meals[0].strMeal,
        price: Math.floor(Math.random() * 20) + 5,
        description: response.data.meals[0].strInstructions,
        image: response.data.meals[0].strMealThumb,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};