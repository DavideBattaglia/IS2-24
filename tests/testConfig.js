<<<<<<< HEAD
// testConfig.js
module.exports = {
    mongoURI: 'mongodb+srv://provarent:provarent@cluster0.2k797.mongodb.net/test',
  };

//db 
 // const dbUrl = 'mongodb+srv://provarent:provarent@cluster0.2k797.mongodb.net/punk';
 afterAll(async () => {
  await mongoose.connection.close();
=======
// testConfig.js
module.exports = {
    mongoURI: 'mongodb+srv://provarent:provarent@cluster0.2k797.mongodb.net/test',
  };

//db 
 // const dbUrl = 'mongodb+srv://provarent:provarent@cluster0.2k797.mongodb.net/punk';
 afterAll(async () => {
  await mongoose.connection.close();
>>>>>>> 2bab63fc7652a56c8514bd7fb4bd1c4511b81b25
});