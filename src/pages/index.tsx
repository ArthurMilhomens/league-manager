import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import DashboardTable from '../components/DashboardTable';
import Header from '../components/Header';
import { getUsers } from '../lib/users';
import { api } from '../services/api';
import { useToast } from '@chakra-ui/react';

type User = {
  id: number;
  name: string;
  score: number;
}

interface Props {
  users: User[]
}

interface UserToUpdate {
  id: number;
  score: number;
}

const Home: React.FC = ({ users }: Props) => {
  const [editableTable, setEditableTable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [scoresToAdd, setScoresToAdd] = useState<UserToUpdate[]>([]);
  const [usersList, setUsersList] = useState<User[]>(users);

  const toast = useToast();

  async function updateScore() {
    setLoading(true);
    await api.put('/users', { users: scoresToAdd })
      .then((response) => {
        //Criar Toast com resposta do back
        setUsersList(
          usersList.map((user: User) => {
            let selectedUser = scoresToAdd.find((element: UserToUpdate) => element.id === user.id)
            return {
              ...user,
              score: selectedUser ? selectedUser.score + user.score : user.score
            }
          })
        )
        toast({
          title: "Success",
          description: response.data.message,
          position: 'bottom-right',
          variant: "solid",
          duration: 3000,
          isClosable: true,
          status: 'success'
        })
        setScoresToAdd([])
      })
      .finally(() => {
        setLoading(false)
        setEditableTable(false)
      })
  }

  return (
    <>
      <Head>
        <title>League</title>
      </Head>
      <main>
        <Flex direction="column" w="100vw" h="100vh" align="center" >
          <Header updateScore={updateScore} loading={loading} editableTable={editableTable} setEditableTable={setEditableTable} />
          <DashboardTable users={usersList} scoresToAdd={scoresToAdd} editableTable={editableTable} setScoresToAdd={setScoresToAdd} />
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