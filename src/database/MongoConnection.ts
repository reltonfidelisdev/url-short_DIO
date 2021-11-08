import { config } from "../config/Constants";
import mongoose from "mongoose";
export class MongoConnection {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(config.MONGO_CONNECT_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
            console.log('Database Connected')
        } catch (err) {
            console.error(err)
        }
    }
}