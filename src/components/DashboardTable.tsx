import React from 'react';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

type User = {
    id: number;
    name: string;
    score: number;
}

interface Props {
    users: User[]
}

export default function DashboardTable({ users }: Props) {
    return <TableContainer maxWidth={360} bg="gray.800" w="100%" borderRadius={8}>
        <Table variant='striped' colorScheme="blackAlpha" >
            <Thead bgGradient='linear(to-l, #7928CA, #FF0080)'>
                <Tr>
                    <Th color="gray.50">Player</Th>
                    <Th color="gray.50" isNumeric>Score</Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.sort((a,b) => b.score - a.score).map((user: User) => <Tr key={user.id}>
                    <Td>{user.name}</Td>
                    <Td isNumeric>{user.score}</Td>
                </Tr>)}
            </Tbody>
        </Table>
    </TableContainer>;
}
