const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchUser')

// Schemas
const User = require('../models/Users');

// For security
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = `my_IGN_is_It's_Handsome`;


// ROUTE 1: Create a User using: POST "/api/auth/signup".
router.post('/signup', [
    body('username', 'Name must be atleast 3 character').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    // If there are any error while validation it will return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check weather a user with the same email exists or not?
        let newUser = await User.findOne({ email: req.body.email });
        if (newUser) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }
        // Generating salt and hash of password
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt)

        // Creating a new user in the DB
        newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: securedPassword,
        });

        const data = {
            newUser: {
                id: newUser.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.send({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// ROUTE 2: Login User using: POST "/api/auth/login".
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    let success = false;

    // If there are any error while validation it will return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body

    try {
        const newUser = await User.findOne({ email });
        const userName = newUser.username;
        const isAdmin = newUser.isAdmin;

        if (!newUser) {
            res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, newUser.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            newUser: {
                id: newUser.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken, userName, isAdmin })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// ROUTE 3: Get Loggedin User details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let userID = req.user.id;
        const getUser = await User.findById(userID).select("-password")
        res.send(getUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})


module.exports = router