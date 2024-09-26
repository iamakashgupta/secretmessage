import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection : connectionObject = {}

//void means idc about the type of data coming from the db
async function dbConnect () : Promise<void>{
    if(connection.isConnected){
        console.log('already connected');
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || 
            '',{}
         )

         connection.isConnected = db.connections[0].readyState

         console.log("DB is connected successfully")
    } catch (error) {
        
        console.log("database connection failed", error);
        process.exit(1)
    }
}

export default dbConnect;