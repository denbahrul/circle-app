import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";

export default function CreatePost() {
  return (
    <Flex justifyContent={"space-between"} p={4} mb={2}>
      <Flex gap={2}>
        <Image src="./profile.png" alt="thumbnail" borderColor={"brand.backgroundBox"} height={"40px"} rounded={"full"} objectFit="cover" />
        <Box>
          <Input border={"none"} placeholder="What is happening?!" />
        </Box>
      </Flex>
      <Flex alignItems={"center"} gap={4}>
        <Image src="./gallery-add.svg" alt="gallery" height={"24px"} />
        <Button backgroundColor={"brand.green"} color={"white"} height={"33px"} justifyItems={"center"} rounded={"full"} alignItems={"center"} padding={4} fontSize={"14px"} fontWeight={700} lineHeight={"17px"}>
          Post
        </Button>
      </Flex>
    </Flex>
  );
}
