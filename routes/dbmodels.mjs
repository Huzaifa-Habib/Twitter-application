import mongoose from "mongoose"


let twitterSchema = new mongoose.Schema({
    text: {type:String, required: true},
    createdOn: { type: Date, default: Date.now },
    owner: { type: mongoose.ObjectId, required: true },
    isDeleted: { type: Boolean, default: false },
    image: { type: String },
    ownerName:{ type: String },
    profilePhoto: { type: String },
    userFirstName: {type:String},
    userLastName: {type:String}

});
export const tweetModel = mongoose.model('Tweets', twitterSchema);

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileImage:{type:String, required:true},
    createdOn: { type: Date, default: Date.now },

});
export const userModel = mongoose.model('Users', userSchema);

/////////////////////////////////////////////////////////////////////////////////////////////////

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
