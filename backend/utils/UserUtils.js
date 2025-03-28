const bcrypt = require('bcryptjs');
const db = require('../config/database');

async function hashingPassword(password) {
    console.log('Hashing password...');
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Password hashed successfully');
    return hashedPassword;
}

function validateEmail(username, email) {
    console.log('Validating email:', email);
    const maxLength = 100;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === null || email === "") {
        console.log('Email is empty, considering valid');
        return true;
    }
    if (email.length > maxLength) {
        console.log('Email too long');
        return false;
    }
    const isValid = emailRegex.test(email);
    console.log('Email validation result:', isValid);
    return isValid;
}

async function validateUsername(username) {
    console.log('Validating username:', username);
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        console.log('Username check results:', rows);
        
        if (rows.length > 0) {
            return "Username already exists";
        }
        
        if (!username || username.trim().length === 0) {
            return "Username cannot be empty";
        }
        
        if (username.length < 2) {
            return "Username must be at least 2 characters long";
        }
        
        if (username.length > 30) {
            return "Username cannot exceed 30 characters";
        }
        
        return null; // null means no error
    } catch (error) {
        console.error('Error validating username:', error);
        throw error;
    }
}

module.exports = {
    hashingPassword,
    validateEmail,
    validateUsername
};