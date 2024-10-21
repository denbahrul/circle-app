import { Box, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PostItem from "../../../components/ui/thread-item";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-store";
import { getAllThreads } from "../threads-slice";
import CreatePost from "./create-post";

export default function HomePage() {
  const [refresh, setRefresh] = useState("none");
  const dispatch = useAppDispatch();
  const thradsState = useAppSelector((state) => state.threads);

  const threads = thradsState.entities;
  const Loading = thradsState.loading;

  useEffect(() => {
    dispatch(getAllThreads());

    setInterval(() => {
      setRefresh("block");
    }, 20000);
  }, []);

  return (
    <Box mt={4}>
      <Text padding={4} fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
        Home
      </Text>
      <CreatePost />
      <Box
        display={refresh}
        cursor={"pointer"}
        onClick={() => {
          dispatch(getAllThreads());
          setRefresh("none");
        }}
        padding={3}
        borderBottom={"solid 1px"}
        borderColor={"brand.borderAbu"}
      >
        <Text color={"brand.green"} textAlign={"center"}>
          Refresh Threads
        </Text>
      </Box>

      {Loading == "pending" || threads.length == 0 ? (
        <Box padding="6">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="3" />
        </Box>
      ) : (
        threads.map((threads) => (
          <PostItem
            createdAt={threads.createdAt}
            authorId={threads.authorId}
            id={threads.id}
            key={threads.id}
            profilePhoto={threads.author.profilePhoto}
            fullName={threads.author.fullname}
            userName={threads.author.username}
            postContent={threads.content}
            postImage={threads.image}
            isLike={threads.isLike}
            like={threads.like.length}
            reply={threads.replies.length}
          />
        ))
      )}
    </Box>
  );
}
