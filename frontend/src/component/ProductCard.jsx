import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product.js";

const ProductCard = ({ product, onEdit }) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const { deleteProduct } = useProductStore();
    const toast = useToast();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow={'hidden'}
            transition={'all 0.3s'}
            bg={bg}
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        >
            <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit='cover' />
            <Box p={4}>
                <Heading as={'h3'} size={'md'} mb={2}>{product.name}</Heading>
                <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
                    ${product.price.toFixed(2)} {/* Format price */}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} colorScheme={'blue'} onClick={() => onEdit(product.id)} aria-label="Edit Product" />
                    <IconButton icon={<DeleteIcon />} colorScheme={'red'} onClick={() => handleDeleteProduct(product._id)} aria-label="Delete Product" />
                </HStack>
            </Box>
        </Box>
    );
};

export default ProductCard;