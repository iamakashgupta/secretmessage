import {z} from 'zod'   

export const usernameValidation = z.
    string().
    min(2, "username must be at least 2 characters").
    max(20, "username should not be greater than 20 characters").
    regex(/^[a-zA-Z0-9_]+$/ , "username must not contain special characters")

export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.string().email({message: 'invalid email address'}),
    password : z.string().min(6,{message: 'password must be 6 characters'})
})