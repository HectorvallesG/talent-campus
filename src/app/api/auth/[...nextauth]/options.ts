import db from '@/db';
import { HashPassword } from '@/lib/hashpassword';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      
      async authorize(credentials) {

        console.log('credenciales', credentials);

        if (!credentials?.email || !credentials.password) {
          throw new Error('Las credenciales son incompletas');
        }

        try {
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            throw new Error('Usuario o contraseña no válidos');
          }

          console.log(user);
          console.log('user credentials', credentials);
          
          let hashingPassword;

          if (!user.password.startsWith('$2a$')) {
            if(user.password !== credentials.password){
              throw new Error('Usuario o contraseña no válidos');
            }
            
            hashingPassword = HashPassword.hash(credentials.password);
            await db.user.update({
              where: {
                id: user.id,
              },
              data: {
                password: hashingPassword,
              },
            });
          }

          const matchPassword = HashPassword.comparePassword(
            credentials.password,
            hashingPassword ? hashingPassword : user.password
          );

          if (!matchPassword) {
            throw new Error('Usuario o contraseña no válidos');
          }
          return user;
        } catch (error:unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error('An unknown error occurred');
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.rol = user.rol;
        token.userName = user.userName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.rol = token.rol;
        session.user.userName = token.userName;
      }

      return session;
    },
  },
};
