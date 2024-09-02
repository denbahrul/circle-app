import { Box, Flex, Image, Text } from "@chakra-ui/react";
import ProfileHeading from "../ui/profile-heading";
import OthersAccountItem from "../ui/others-account-item";

export default function RightBar() {
  return (
    <Box width={"563px"}>
      <Flex width={"563px"} position={"fixed"} gap={"16px"} direction={"column"} borderLeft={"solid 1px"} borderColor={"brand.borderAbu"} height={"100vh"} padding={8}>
        <Box backgroundColor={"brand.backgroundBox"} padding={"12px 20px 20px 20px"} rounded={12}>
          <Text fontSize={"20px"} fontWeight={700} lineHeight={"28px"} mb={4}>
            My Profile
          </Text>
          <ProfileHeading />
        </Box>
        <Box backgroundColor={"brand.backgroundBox"} padding={"12px 20px 20px 20px"} rounded={12}>
          <Text fontSize={"20px"} fontWeight={700} lineHeight={"28px"} mb={4}>
            Suggested for you
          </Text>
          <Flex direction={"column"} gap={4}>
            <OthersAccountItem image="./profile.png" fullName="Elon Musk" userName="@elonnnn" />
            <OthersAccountItem image="./profile.png" fullName="Cristiano Ronaldo" userName="@cristiano" />
            <OthersAccountItem image="./profile.png" fullName="Gibran Rakbuming" userName="@gibranraka" />
            <OthersAccountItem image="./profile.png" fullName="Billie Eilish" userName="@billieelish" />
            <OthersAccountItem image="./profile.png" fullName="Najwa Shihab" userName="@najwa" />
          </Flex>
        </Box>
        <Box backgroundColor={"brand.backgroundBox"} padding={"12px 20px 20px 20px"} rounded={12}>
          <Text fontSize={"16px"} fontWeight={700} lineHeight={"20px"} mb={4}>
            Developed by Muhammad Bahrul 'ulum •
          </Text>
          <Text fontSize={"14px"} fontWeight={400} lineHeight={"16px"} color={"brand.fontSecondary"}>
            Powered by DumbWays Indonesia • #1Coding Bootcamp
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
