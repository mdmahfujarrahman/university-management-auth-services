import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";

async function boostrap() {
    try {
        await mongoose.connect(config.database_url as string);

        console.log('🔗 Connected to Database');
        app.listen(config.port, () => {
            console.log(`Application app listening on port ${config.port}`)
        })
    } catch (error) {
        console.log('❌ Failed to connect to Database', error);
    }
}

boostrap();