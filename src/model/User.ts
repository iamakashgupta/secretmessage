import exp from "constants";
import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content : string;
    createdAt: Date
}

//name messageSchema of type schema which adheres to Message syntactic contract
const MessageSchema : Schema <Message> = new Schema ({
    content : {
        type : String,
        required: true
    }, 
    createdAt: {
        type : Date,
        required: true, 
        default: Date.now
    }
})


export interface User extends Document{
    username: String,
    email: String,
    password: String,
    verifyCode: String,  
    verifyCodeExpiry: Date,
    isVerified : boolean;
    isAcceptingMessage: boolean,
    messages : Message[]
}


const userSchema : Schema <User> = new Schema ({
    username : {
        type : String, 
        required : [true, "username is required"],
        unique: true
    },
    email: {
        type: String,
        required : [true, "email is required"], 
        unique: true, 
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"]
    },
    password :{
      type: String, 
      required : [true, "password is required"]
    },

    verifyCode :{
      type: String, 
      required : [true, "verify code is required"]
    },
    verifyCodeExpiry :{
      type: Date, 
      required : [true, "verify code expiry is required"]
    },

    isVerified : {
        type : Boolean
    },

    isAcceptingMessage :{
      type: Boolean, 
      default : true
    },
    messages : [MessageSchema]  

}) 


const UserModel = (mongoose.models.User as mongoose.
    Model<User>) || (mongoose.model<User>("User", userSchema))

export default UserModel;