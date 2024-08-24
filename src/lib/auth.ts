import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../db';

export const NEXT_AUTH_CONFIG = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              username: { label: 'username', type: 'text', placeholder: 'john@gmail.com' },
              password: { label: 'password', type: 'password', placeholder: '123456' },
            },
            async authorize(credentials: any) {
                
                console.log(credentials);
                const userExist = await prisma.user.findFirst({
                    where: {
                        username: credentials.username,
                        password: credentials.password
                    }
                })
    
                if(!userExist){
                    return null;
                }
                
    
                return {
                    id: userExist.id,
                    name: userExist.firstName,
                    email: userExist.username,
                };
            },
          })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
        jwt: async ({ user, token }: any) => {
            if (user) {
                // console.log( "user:",user);
                
                token.uid = user.id;
            }
            return token;
            },
        session: ({ session, token}: any) => {
            // console.log("token:", token);
            // console.log("session:", session);
            
            if (session && session.user) {
                session.user.id = token.uid
            }
            // console.log("modifiedSession: ", session);
            

            return session
        },
        //this redirect callback is use to send user to dashboard page after signin, previously it was going to  "/", now it is going to '/dashboard'
        async redirect({ url, baseUrl }: any) {
            // Redirect to the dashboard page after sign-in
            if (url === '/dashboard') {
              return Promise.resolve(url);
            }
            return Promise.resolve(baseUrl + '/dashboard');
          }
      }
}