import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast } from "@chakra-ui/react";
import {useProductStore} from "../store/product.js";
import {useState} from "react";


const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });

    const { createProduct } = useProductStore();
    const toast = useToast();

    const handleSubmit = async () => {
        const result = await createProduct(newProduct);

        toast({
            title: result.success ? 'Success' : 'Error',
            description: result.message,
            status: result.success ? 'success' : 'error',
            duration: 3000,
            isClosable: true,
        });

        if (result.success) {
            setNewProduct({
                name: "",
                price: "",
                image: ""
            });
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Create New Product</Heading>
                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} shadow={"md"} p={6} rounded={"lg"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        />

                        <Input
                            placeholder="Price"
                            value={newProduct.price}
                            type="number"
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        />

                        <Input
                            placeholder="Image URL"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        />

                        <Button
                            w={'full'}
                            onClick={handleSubmit}
                            colorScheme='blue'
                            isDisabled={!newProduct.name || !newProduct.price || !newProduct.image}
                        >
                            Upload
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;