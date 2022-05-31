import { InputProps, NumberInput, NumberInputField } from "@chakra-ui/react";

interface Props extends InputProps {
    name: string;
    handleChange: (value: number, id: number) => void;
}

export default function InputNumber({ id, name, handleChange }:Props) {
    return (
        <NumberInput name={name} onChange={(value) => handleChange(value === "" ? 0 : parseInt(value), parseInt(id))} pt="0" maxW={50} focusBorderColor="purple.500" variant="filled" ml="auto" min={0} max={9}>
            <NumberInputField pr="2" placeholder="+" bg="gray.900" _hover={{ bgColor: 'gray.900' }}/>
        </NumberInput>
    )
}