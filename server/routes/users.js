const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


// GET route to fetch user details by email
router.get("/:email", async (req, res) => {
	try {
	  const user = await User.findOne({ email: req.params.email });
	  if (!user)
		return res.status(404).send({ message: "User not found" });
  
	  res.status(200).send(user);
	} catch (error) {
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });


  // PUT route to update user details (first name, last name, email)
router.put("/:email", async (req, res) => {
	try {
	  const { firstName, lastName, email } = req.body;
  
	  // Check if the new email already exists for another user
	  const existingUser = await User.findOne({ email });
	  if (existingUser && existingUser.email !== req.params.email) {
		return res.status(409).send({ message: "User with this email already exists!" });
	  }
  
	  // Find the user by email and update details
	  const user = await User.findOneAndUpdate(
		{ email: new RegExp(`^${req.params.email}$`, "i") }, // Match the current email case-insensitively
		{ firstName, lastName, email }, // Update only firstName, lastName, and email
		{ new: true } // Return the updated user document
	  );
  
	  if (!user) {
		return res.status(404).send({ message: "User not found" });
	  }
  
	  res.status(200).send({ message: "User updated successfully", user });
	} catch (error) {
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });
module.exports = router;
