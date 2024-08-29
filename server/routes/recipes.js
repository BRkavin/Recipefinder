const router = require("express").Router();
const Recipe = require("../models/recipe");
const auth = require("../middleware/auth");

// GET /api/recipes
// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get('/user/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const recipes = await Recipe.find({ email });
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch recipes.' });
  }
});

router.post('/add', auth, async (req, res) => {
  console.log('Request received to add a recipe:', req.body);
  const { mealid, title, cuisine, ingredients, instructions, email, image } = req.body;

  try {
    const newRecipe = new Recipe({
      mealid,
      title,
      cuisine,
      ingredients,
      instructions,
      email,
      image, // Add image field
    });
  
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error('Error saving recipe:', err);
    res.status(500).json({ message: 'Failed to add recipe.' });
  }
});



// Delete a recipe from wishlist

router.delete('/remove/:mealid', auth, async (req, res) => {
  try {
    const { mealid } = req.params;
    const { userEmail } = req.query; // Get userEmail from the query parameter

    console.log('Received mealid:', mealid);
    console.log('Received userEmail:', userEmail);

    const recipe = await Recipe.findOneAndDelete({ mealid: String(mealid), email: userEmail });

    console.log('Recipe found:', recipe);
    
    if (!recipe) {
      return res.status(404).send('Recipe not found in your wishlist');
    }

    res.send('Recipe removed successfully');
  } catch (error) {
    console.error('Error removing recipe:', error);
    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;
