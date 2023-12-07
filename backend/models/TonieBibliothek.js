const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// alle die es gibt
const tonieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  fsk: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const TonieBibliothek = mongoose.model("TonieBibliothek", tonieSchema);



function getTonieModel() {
  return mongoose.model("TonieBibliothek", tonieSchema);
}
module.exports = {
  getTonieModel,
  TonieBibliothek
};