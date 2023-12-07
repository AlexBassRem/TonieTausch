const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,
    unique: true
  },
  password: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true // Stellt sicher, dass jede E-Mail-Adresse einzigartig ist
  },
  vorname: { 
    type: String, 
    required: true 
  },
  nachname: { 
    type: String, 
    required: true 
  }
});

module.exports = mongoose.model('User', userSchema);