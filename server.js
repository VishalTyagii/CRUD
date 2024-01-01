const express = require('express');
//const sequelize = require('./config/database');
//const User = require('./models/user');
const sequelize = require('./config/database');
const User = require('./models/user')(sequelize);

// const db = require('./models/index');
// const bodyParser = require('body-parser')
// const cors = require('cors')

const app = express();

// const corOptions = {
//   origin: "http://localhost:3000"
// }
// app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from API!');
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('Error retrieving users:', err);
    res.send('Some error occureed while fetching the user from database!')
  }
});

app.post('/create', async (req, res) => {
  try {
    const {
      userID,
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      dob,
      gender,
      address
    } = req.body;

    const newUser = await User.create({
      userID,
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      dob,
      gender,
      address
    });

     res.send('Successfully created the user in the database!');
  } catch (error) {
    console.error('Error creating user:', error);
    res.send('Some error occurred while creating the user in the database.');
  }
});

app.patch('/update/:userid', async(req, res)=>{
  try{
    let userId = req.params.userid;

    let user = await User.findOne({ where: {userID: userId} })

    if(user){
      const {
        userID,
        firstName,
        lastName,
        email,
        password,
        contactNumber,
        dob,
        gender,
        address
      } = req.body;
      await user.update({
        userID,
        firstName,
        lastName,
        email,
        password,
        contactNumber,
        dob,
        gender,
        address
      },{ where: {userID: userId}  })
      res.send('User updated successfully!')
    }
    else{
      res.send("User not Found!!")
    }
  }
  catch(err){
    console.log("Error occurred while updating: ", err)
    res.send("Some error occurred while updating the user!")
  }
})

app.put('/update/:userid', async(req, res)=>{
  try{
    let userId = req.params.userid;

    let user = await User.findOne({ where: {userID: userId} })

    if(user){

      const {
        userID,
        firstName,
        lastName,
        email,
        password,
        contactNumber,
        dob,
        gender,
        address
      } = req.body;

      await user.update({
        userID,
        firstName,
        lastName,
        email,
        password,
        contactNumber,
        dob,
        gender,
        address
      },{ where: {userID: userId}  })
      res.send('User updated successfully!')
    }
    else{
      res.send("User not Found!!")
    }
  }
  catch(err){
    console.log("Error occurred while updating: ", err)
    res.send("Some error occurred while updating the user!")
  }
})

app.delete('/delete', async(req, res)=>{
  try{
    await User.destroy({ where: {} });
    res.send("Successfully deleted all users from the database!")
  }
  catch(err){
    console.log("Error occurred while deleting all users: ", err)
    res.send("Some error occurred while deleting all entries from database!")
  }
})

app.delete('/delete/:userID', async (req, res)=>{
  try{
    let userId = req.params.userID;
    await User.destroy({ where : {userID: userId}})
    res.send("Successfully deleted the user from the database!")
  }
  catch(err){
    console.log("error occurred while deleting user: ", err)
    res.send("Some error occurred while deleting the user from the database!")
  }
})

app.listen(3000, () => {
  console.log('Server is up and running on port 3000.');
});


// app.patch('/update/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByPk(id);

//     if (user) {
//       await user.update(req.body);
//       res.status(200).json({ message: 'User updated successfully' });
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.delete('/users/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedRows = await User.destroy({ where: { userID: id } });
//     if (deletedRows > 0) {
//       res.status(200).json({ message: 'User deleted successfully' });
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is up and running on port ${PORT}.`);
// });
