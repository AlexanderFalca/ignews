// import { query as q } from 'faunadb'; 

import NextAuth from 'next-auth';
//import { session } from 'next-auth/client';
import Providers from 'next-auth/providers';

//import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
  ],
  database: process.env.DATABASE_URL
})