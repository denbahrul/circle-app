import { Box, Text, Flex } from "@chakra-ui/react";
import AppLayout from "../../components/layout/app-layout";
import { HiOutlineArrowLeft } from "react-icons/hi";
import PostList from "../../features/home/components/post-list";
import PostDetail from "../../features/detail/componenets/post-detail";
import FormPost from "../../components/ui/post-form";
import RepliesList from "../../features/detail/componenets/replies-list";

export default function DetailPost() {
  return (
    <AppLayout>
      <Flex mt={4} padding={4} gap={3} alignItems={"center"}>
        <HiOutlineArrowLeft size={26} />
        <Text fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
          Status
        </Text>
      </Flex>
      <PostDetail image="./profile.png" fullName="Cristiano Ronaldo" userName="@cristiano" />
      <FormPost placeholder="Type your reply!" buttonTitle="Reply" />
      <RepliesList />
    </AppLayout>
  );
}
