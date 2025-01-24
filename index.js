require('dotenv').config(); // Load environment variables

const express = require('express'); // Import express
const { resolve } = require('path'); // Import resolve from path

const app = express(); // Initialize express
const port = 3010; // Define port

// Serve static files
app.use(express.static('static'));

// Serve the home page
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Check admin privileges
const isAdmin = process.env.IS_ADMIN === 'true';

if (isAdmin) {
  console.log("Admin privileges granted.");
} else {
  console.log("Access restricted. Admin only.");
}

// Dynamic message based on user type
app.get('/user', (req, res) => {
  if (isAdmin) {
    res.send({ message: "Welcome, Admin!", data: ["Admin Data 1", "Admin Data 2"] });
  } else {
    res.send({ message: "Welcome, User!", data: ["User Data 1", "User Data 2"] });
  }
});

// Start the server
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));