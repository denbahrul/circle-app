import { Box, Flex, Image, Button } from "@chakra-ui/react";
import ItemMenu from "../ui/item-menu";

export default function LeftBar() {
  return (
    <Flex direction={"column"} borderRight={"solid 1px"} borderColor={"brand.borderAbu"} height={"100vh"} width={"417px"} padding={8}>
      <Box marginBottom={6}>
        <Image h={50} src="./logo.svg" alt="circle logo" />
      </Box>
      <Flex flexDirection={"column"} gap={2}>
        <ItemMenu route="/" menuIcon="./home.svg" menuTitle="Home" />
        <ItemMenu route="/search" menuIcon="./user-search.svg" menuTitle="Search" />
        <ItemMenu route="/follows" menuIcon="./heart.svg" menuTitle="Follows" />
        <ItemMenu route="/profile" menuIcon="./profile-circle.svg" menuTitle="Profile" />
        <Button backgroundColor={"brand.green"} color={"white"} fontSize={20}>
          Create Post
        </Button>
      </Flex>
      <Box mt={"auto"}>
        <ItemMenu route="/login" menuIcon="./logout.svg" menuTitle="Logout" />
      </Box>
    </Flex>
  );
}
