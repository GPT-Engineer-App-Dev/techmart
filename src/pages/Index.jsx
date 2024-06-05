import { useState } from "react";
import { Box, Container, VStack, Text, Image, Heading, SimpleGrid, Link, Flex, Spacer, HStack, IconButton, Input, InputGroup, InputLeftElement, Select, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaSearch } from "react-icons/fa";

const sampleProducts = [
  {
    id: 1,
    name: "Smartphone",
    description: "Latest model with advanced features",
    price: 699,
    category: "Electronics",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Laptop",
    description: "High performance laptop for work and play",
    price: 999,
    category: "Electronics",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Smartwatch",
    description: "Stay connected on the go",
    price: 199,
    category: "Accessories",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    name: "Headphones",
    description: "Noise-cancelling over-ear headphones",
    price: 299,
    category: "Accessories",
    image: "https://via.placeholder.com/150"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearchQuery && matchesCategory && matchesPrice;
  });

  return (
    <Box>
      <Box as="header" bg="blue.800" color="white" py={4}>
        <Container maxW="container.xl">
          <Flex align="center">
            <Heading as="h1" size="lg">ElectroShop</Heading>
            <Spacer />
            <HStack spacing={8}>
              <Link href="/">Home</Link>
              <Link href="/products">Products</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact Us</Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <VStack spacing={4} align="start">
          <Heading as="h2" size="xl">Featured Products</Heading>
          <InputGroup mb={4}>
            <InputLeftElement pointerEvents="none" children={<FaSearch color="gray.300" />} />
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </InputGroup>
          <Select placeholder="Select category" onChange={handleCategoryChange} mb={4}>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
          </Select>
          <Text>Price Range: ${priceRange[0]} - ${priceRange[1]}</Text>
          <Slider
            aria-label="price-range-slider"
            defaultValue={[0, 1000]}
            min={0}
            max={1000}
            step={10}
            onChangeEnd={handlePriceChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} index={0} />
            <SliderThumb boxSize={6} index={1} />
          </Slider>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} width="100%">
            {filteredProducts.map(product => (
              <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                <Image src={product.image} alt={product.name} mb={4} />
                <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
                <Text mb={2}>{product.description}</Text>
                <Text fontWeight="bold">${product.price}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      <Box as="footer" bg="gray.800" color="white" py={4}>
        <Container maxW="container.xl">
          <Flex align="center">
            <Text>&copy; 2023 ElectroShop. All rights reserved.</Text>
            <Spacer />
            <HStack spacing={4}>
              <IconButton as="a" href="https://facebook.com" aria-label="Facebook" icon={<FaFacebook />} />
              <IconButton as="a" href="https://twitter.com" aria-label="Twitter" icon={<FaTwitter />} />
              <IconButton as="a" href="https://instagram.com" aria-label="Instagram" icon={<FaInstagram />} />
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;