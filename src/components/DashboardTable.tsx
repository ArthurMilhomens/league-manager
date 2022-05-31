import React from 'react';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import InputNumber from './InputNumber';

type User = {
    id: number;
    name: string;
    score: number;
}

interface UserToUpdate {
    id: number;
    score: number;
}

interface Props {
    users: User[];
    editableTable: boolean;
    scoresToAdd: UserToUpdate[];
    setScoresToAdd:(array: UserToUpdate[]) => void
}

export default function DashboardTable({ users, editableTable, scoresToAdd, setScoresToAdd }: Props) {
    
    function handleChange(value: number, id: number){
        let array = [...scoresToAdd]
        let position = scoresToAdd.findIndex((element: UserToUpdate) => element.id === id)
        if (position !== -1) {
            array[position].score = value
        } else {
            array.push({ id, score: value })
        }
        setScoresToAdd(array)
    }

    return <TableContainer maxWidth={360} bg="gray.800" w="100%" borderRadius={8}>
        <Table variant='striped' colorScheme="blackAlpha" >
            <Thead bgGradient='linear(to-l, #7928CA, #FF0080)'>
                <Tr>
                    <Th onClick={() => console.log(scoresToAdd)} color="gray.50">Player</Th>
                    <Th color="gray.50" isNumeric>Score</Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.sort((a, b) => b.score - a.score).map((user: User) => <Tr h={65} key={user.id}>
                    <Td py={0}>{user.name}</Td>
                    <Td py={0} isNumeric>{editableTable ? <InputNumber handleChange={handleChange} name={user.name} id={user.id.toString()} /> : user.score}</Td>
                </Tr>)}
            </Tbody>
        </Table>
    </TableContainer>;
}
