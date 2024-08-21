const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const cors = require('cors');
const Lead = require('./models/Leads');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register route
app.post('/register', async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      fatherName,
      dateOfBirth,
      address,
      mobileNo,
      email,
      panCardNo,
      aadhaarCardNo,
      bankName,
      accountNo,
      ifscCode,
      gstNo,
      relationshipManagerCode,
      password,
    } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password || '', 10);

    // Create a new user object
    const newUser = new User({
      name,
      fatherName,
      dateOfBirth,
      address,
      mobileNo,
      email,
      panCardNo,
      aadhaarCardNo,
      bankName,
      accountNo,
      ifscCode,
      gstNo,
      relationshipManagerCode,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    isAdmin = 0;
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored password
    const passwordMatch = await bcrypt.compare(password || '', user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'secretKey');
    console.log(token);

    res.status(200).json({ message: 'Login successful', token, isAdmin });
    console.log("er");

  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// // Save lead route
// app.post('/save-lead', async (req, res) => {
//   try {
//     const { authorization } = req.headers;
//     const { leadData } = req.body;

//     // Extract the token from the authorization header
//     const token = authorization.split(' ')[1];


//     // Verify the JWT token
//     const decodedToken = jwt.verify(token, 'secretKey');

//     // Get the user ID from the decoded token
//     const userId = decodedToken.userId;

//     // Check if the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     // Create a new lead instance
//     const lead = new Lead({
//       user: userId,
//       ...leadData,
//     });

//     // Save the lead to the database
//     await lead.save();

//     res.status(201).json({ message: 'Lead saved successfully' });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'An error occurred', error });
//   }
// });

app.post('/save-lead', async (req, res) => {
  try {
    const { authorization } = req.headers;

    const { leadData } = req.body;
    console.log("populated"+leadData);
    console.log(req.body);
    // Extract the token from the authorization header
    const token = authorization.split(' ')[1];


    // Verify the JWT token
    const decodedToken = jwt.verify(token, 'secretKey');

    // Get the user ID from the decoded token
    const userId = decodedToken.userId;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Create a new lead instance
    const lead = new Lead({
      user: userId,
      ...leadData,
    });

    console.log("data to be save "+ lead);

    // Save the lead to the database
    await lead.save();

    res.status(201).json({ message: 'Lead saved successfully' });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error });
  }
});

app.get('/leads', async (req, res) => {
  console.log("leads requested");

  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];


    // Verify the JWT token
    const decodedToken = jwt.verify(token, 'secretKey');

    // Get the user ID from the decoded token
    const userId = decodedToken.userId;
    console.log(userId);
    
    // Retrieve leads for the user
    const leads = await Lead.find({ user: userId, statusn: 0 }).select('clientName remarks');
    
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

app.get('/loginFiles', async (req, res) => {
  console.log("leads requested");

  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];


    // Verify the JWT token
    const decodedToken = jwt.verify(token, 'secretKey');

    // Get the user ID from the decoded token
    const userId = decodedToken.userId;
    console.log(userId);
    
    // Retrieve leads for the user
    const leads = await Lead.find({ user: userId, statusn: 1 }).select('clientName remarks');
    
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});


app.get('/disbursement', async (req, res) => {
  console.log("disbursement requested");

  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];


    // Verify the JWT token
    const decodedToken = jwt.verify(token, 'secretKey');

    // Get the user ID from the decoded token
    const userId = decodedToken.userId;
    console.log(userId);
    
    // Retrieve leads for the user
    const leads = await Lead.find({ user: userId, statusn: 3 }).select('clientName bankName loanAmount product Month');
    
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

app.get('/sanction', async (req, res) => {
  console.log("sanction requested");

  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];


    // Verify the JWT token
    const decodedToken = jwt.verify(token, 'secretKey');

    // Get the user ID from the decoded token
    const userId = decodedToken.userId;
    console.log(userId);
    
    // Retrieve leads for the user
    const leads = await Lead.find({ user: userId, statusn: 2 }).select('clientName bankName loanAmount product');
    
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
