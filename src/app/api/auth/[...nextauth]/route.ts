// import NextAuth from "next-auth"
// import CredentialsProvider from 'next-auth/providers/credentials';
// import prisma from "../../../../../db";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//         name: 'Credentials',
//         credentials: {
//           username: { label: 'username', type: 'text', placeholder: 'john@gmail.com' },
//           password: { label: 'password', type: 'password', placeholder: '123456' },
//         },
//         async authorize(credentials: any) {
            
//             console.log(credentials);
//             const userExist = await prisma.user.findFirst({
//                 where: {
//                     username: credentials.username,
//                     password: credentials.password
//                 }
//             })

//             if(!userExist){
//                 return null;
//             }
            

//             return {
//                 id: userExist.id,
//                 name: userExist.firstName,
//                 email: userExist.username
//             };
//         },
//       })
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     session: ({ session, token, user }: any) => {
//         if (session.user) {
//             session.user.id = token.uid
//         }
//         return session
//     }
//   }
// })

// export { handler as GET, handler as POST }

import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import NextAuth from "next-auth"

const handler = NextAuth(NEXT_AUTH_CONFIG)

export { handler as GET, handler as POST }
