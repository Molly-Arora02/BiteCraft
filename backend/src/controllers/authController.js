const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validation: required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required"
            });
        }

        // 2. Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        // 3. Prevent duplicate account crash
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists"
            });
        }

        // 4. Hash password with rounds = 10
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Security Fix: Enforce role default to "user". Prevent arbitrary client privilege escalation to "admin"
        const user = new User({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: "user"
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({
            message: "Internal server error during registration"
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "User not found"
        });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        });
    }
    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET, // secret lives in .env, never hardcode it in the file
        {
            expiresIn: "1d" // Token valid for 1 day
        }
    );


    res.cookie("token", token, { httpOnly: true });

    //Return token to the client
    res.json({
        message: "Login successful",
        token
    });
};

module.exports = { register, login };