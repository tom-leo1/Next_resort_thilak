import NextAuth from "next-auth";
import CredentialManager from 'next-auth/providers/credentials'
import User from "@/app/utils/models/User";

export const {auth, handlers:{POST, GET}, signIn, signOut} = NextAuth({
    providers:[
        CredentialManager({
            name:'credentials',
            async authorize(credentials){
                let user = await User.findOne({userEmail: credentials?.userEmail})
                if(!user){
                    return null
                }
                if(credentials?.userPassword !== user?.userPassword){
                    return null
                }
                return user
            }
        })
    ],
    secret:process.env.SAMPLE_SECRET,
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.userId = user?._id
                token.userName = user?.userName
                token.userEmail = user?.userEmail
                token.userPassword = user?.userPassword
                token.role = user?.role
            }
            return token
        },
        async session({session, token}){
            session.userId = token.userId
            session.role = token.role
            session.userEmail = token.userEmail
            session.userName = token.userName
            return session
        }
    }
})