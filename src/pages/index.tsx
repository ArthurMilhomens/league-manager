import { Flex } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import DashboardTable from '../components/DashboardTable';
import Header from '../components/Header';
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
        <title>League</title>
      </Head>
      <main>
        <Flex direction="column" w="100vw" h="100vh" align="center" >
          <Header />
          <DashboardTable users={users} />
        </Flex>
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