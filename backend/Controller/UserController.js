const { hashingPassword } = require('../utils/UserUtils');
const { validateUsername, validateEmail } = require('../utils/UserUtils');
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        const { User_Username, User_Password, User_Email } = req.body;
        
        if (!User_Username || !User_Password) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // CHECKING REQUIREMENTS--------------------------------------------
        const usernameError = await validateUsername(User_Username);
        if (usernameError) {
            console.log('Username validation error:', usernameError);
            return res.status(400).json({ error: usernameError });
        }
        if (User_Email && User_Email.trim() !== '') {
            const validEmail = validateEmail(User_Username, User_Email);
            if (!validEmail) {
                console.log('Email validation error');
                return res.status(400).json({ error: "The provided email is invalid." });
            }
        }
        // --------------------------------------------------------------------

        const hashedPassword = await hashingPassword(User_Password);
        console.log('Attempting to insert user into database...');
        
        const [result] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [User_Username, User_Email && User_Email.trim() !== '' ? User_Email : null, hashedPassword]
        );
        
        console.log('User created successfully:', result);
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Please provide both username and password" });
    }
    try {
        const [result] = await db.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        if (result.length === 0) {
          return res.status(401).json({ message: "Username or password is incorrect." });
        }
        const user = result[0]; // get result from query, first entry
        if (user.User_Active == false) {
          return res.status(401).json({ message: "Username or password is incorrect." });
        }
        const isMatch = await bcrypt.compare(password, user.password); // Await the comparison
  
        if (!isMatch) {
          return res.status(401).json({ message: "Username or password is incorrect." });
        }
        //payload
         // CREATE DETAILS FOR TOKEN TO LOGIN ----------------------------------------------------------
      const payload = { username: user.username, ip: req.ip, browser: req.headers["user-agent"] };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
      if (token) {
        res.cookie("token", token, {
          httpOnly: true,
        });

        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(500).json({
          status: "failure",
          message: "Token not created",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };