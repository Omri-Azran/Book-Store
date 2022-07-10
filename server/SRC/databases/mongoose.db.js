import mongoose from 'mongoose'

const mongoDB_URL = "mongodb+srv://omri-admin:ncmQCXjv7w3jgR87@cluster0.yirlf.mongodb.net/?retryWrites=true&w=majority" //process.env.MONGO_DB_LINK


const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoDB_URL);

        console.log(`MongoDB database connected`);
    } catch (err) {
        console.log('MongoDB databse connection error!');

        process.exit(1);
    }
};

export default connectToMongoDB

