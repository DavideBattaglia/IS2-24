// testConfig.js
module.exports = {
    mongoURI: 'mongodb+srv://provarent:provarent@cluster0.2k797.mongodb.net/test',
  };

//db 
 // const dbUrl = 'mongodb+srv://provarent:provarent@cluster0.2k797.mongodb.net/punk';
 afterAll(async () => {
  await mongoose.connection.close();
});