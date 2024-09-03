import { Flex, Input, Image } from "@chakra-ui/react";

export default function SearchBar() {
  return (
    <Flex backgroundColor={"brand.searchBar"} rounded={"full"} margin={4} padding={"4px 18px"} alignItems={"center"}>
      <Image src="./search-bar.svg" alt="gallery" height={"24px"} />
      <Input border={"none"} placeholder="Search your friend" />
    </Flex>
  );
}
