const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tauschSchema = new Schema({
  angebotA: {
    type: Schema.Types.ObjectId,
    ref: "Angebot",
    required: true,
  },
  angebotB: {
    type: Schema.Types.ObjectId,
    ref: "Angebot",
    required: false,
  },
  bestaetigungA: {
    type: Boolean,
    default: false,
  },
  bestaetigungB: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed"],
    default: "pending",
  },
});

function getTauschModel() {
  return mongoose.model("Tausch", tauschSchema);
}

module.exports = {
  getTauschModel,
};
