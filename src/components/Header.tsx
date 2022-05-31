import { Button, Flex, Text } from "@chakra-ui/react";
import { GoPlus, GoCheck } from 'react-icons/go'

interface Props {
    loading: boolean;
    editableTable: boolean;
    setEditableTable: (value: boolean) => void;
    updateScore: () => void;
}

export default function Header({ editableTable, setEditableTable, loading, updateScore }: Props) {
    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1480}
            h="20"
            mx="auto"
            mt="4"
            px="6"
            align="center"
        >
            <Text
                fontSize="3xl"
                fontWeight="bold"
                letterSpacing="tight"
                w="80"
            >
                Copa <Text as="span" color="purple.400">Rybená</Text> de Magic
            </Text>
            {editableTable
                ? <Button onClick={() => updateScore()} isLoading={loading} loadingText="Salvando..." ml="auto" colorScheme='green' leftIcon={<GoCheck />}>
                    Salvar
                </Button>
                : <Button onClick={() => setEditableTable(true)}ml="auto" colorScheme='purple' leftIcon={<GoPlus />}>
                    Nova Rodada
                </Button>
            }
        </Flex>
    )
}