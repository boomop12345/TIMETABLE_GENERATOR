require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected for user creation'))
.catch((err) => console.error('MongoDB connection error:', err));

async function createMultipleUsers() {
  const users = [
    { email: 'admin@example.com', password: 'adminpassword', role: 'admin' },
    { email: 'yash@example.com', password: 'yashthakur15', role: 'admin' },
    { email: 'abhi@example.com', password: 'abhiyadav15', role: 'admin' },
    { email: 'charan@example.com', password: 'charan123', role: 'admin' },
    { email: 'deepak@example.com', password: 'deepak123', role: 'admin' },
    { email: 'teacher@example.com', password: 'teacher123', role: 'teacher' },
    { email: 'student@example.com', password: 'student123', role: 'student' }
  ];

  for (const userData of users) {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const user = new User({ 
          email: userData.email, 
          password: userData.password, 
          role: userData.role 
        });
        await user.save();
        console.log(`User created successfully: ${userData.email}`);
      } else {
        console.log(`User already exists: ${userData.email}`);
      }
    } catch (err) {
      console.error(`Error creating user ${userData.email}:`, err.message);
    }
  }
  
  mongoose.disconnect();
  console.log('Finished user creation process');
}

createMultipleUsers().catch(console.error);
