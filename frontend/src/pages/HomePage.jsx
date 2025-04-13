import { Container, SimpleGrid, VStack, Text, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import { useEffect } from "react";
import ProductCard from "../component/ProductCard.jsx";

const HomePage = () => {
    const { fetchProducts, products, isLoading } = useProductStore();

    useEffect(() => {
        const fetchData = async () => {
            await fetchProducts();
        };
        fetchData();
    }, [fetchProducts]);

    return (
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={38}
                    fontWeight={'bold'}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={'text'}
                    textAlign={'center'}
                >
                    Current Products
                </Text>

                {isLoading ? (
                    <Spinner size="xl" />
                ) : (
                    <>
                        <SimpleGrid
                            columns={{
                                base: 1,
                                md: 2,
                                lg: 3
                            }}
                            spacing={10}
                            w={'full'}
                        >
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </SimpleGrid>

                        {products.length === 0 && (
                            <VStack spacing={4}>
                                <Text fontSize='xl' textAlign={'center'} fontWeight={'bold'} color='gray.500'>
                                    No Products Found 😢
                                </Text>
                                <Link to={"/create"}>
                                    <Text
                                        as='span'
                                        color='blue.500'
                                        _hover={{ textDecoration: "underline" }}
                                    >
                                        Create a product
                                    </Text>
                                </Link>
                            </VStack>
                        )}
                    </>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;