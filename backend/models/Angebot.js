const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const angebotSchema = new Schema ({
    aktiv: {
        type: Boolean,
        required: true,
    },
    tonieHaben: {
        type: Schema.Types.ObjectId,
        ref: 'TonieBibliothek',
        required: true,
    },
    //Lässt sich auch als Array nutzen für mehr Komplexität
    tonieWollen: {
        type: Schema.Types.ObjectId,
        ref: 'TonieBibliothek',
        required: true,
    },   
    besitzer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    condition: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    }, 
    getauscht: {
        type: Boolean,
        default: false,
    }
});

function getAngebotModel() {
    return mongoose.model("Angebot", angebotSchema); 
}

module.exports = { 
    getAngebotModel,  
};
