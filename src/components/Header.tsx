import { Button, Flex, Text } from "@chakra-ui/react";
import { GoPlus } from 'react-icons/go'

export default function Header() {
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
            <Button ml="auto" colorScheme='purple' leftIcon={<GoPlus />}>
                Nova Rodada
            </Button>
        </Flex>
    )
}