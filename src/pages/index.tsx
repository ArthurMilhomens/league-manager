import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { getUsers } from '../lib/users';

type User = {
  id: number;
  name: string;
  score: number;
}

interface Props {
  users: User[]
}

const Home: React.FC = ({ users }: Props) => {
  return (
    <>
      <Head>
        <title>CRM | League</title>
      </Head>
      <main>
        {users.map((user: User) => <p key={user.id}>{user.name}</p>)}
      </main>
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const users = await getUsers();

  return {
    props: {
      users
    },
    revalidate: 5
  }
}