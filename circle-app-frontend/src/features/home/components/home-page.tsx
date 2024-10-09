import { Box, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import PostItem from "../../../components/ui/thread-item";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-store";
import { getAllThreads } from "../threads-slice";
import CreatePost from "./create-post";

export default function HomePage() {
  // const [threads, setThread] = useState<ThreadEntity[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const thradsState = useAppSelector((state) => state.threads);

  const threads = thradsState.entities;
  const Loading = thradsState.loading;

  // async function getThreads() {
  //   try {
  //     const response = await apiV1.get<null, { data: ThreadResponseDTO }>("/threads");
  //     const data = response.data.data;
  //     setThread(data);
  //   } catch (errors) {
  //     console.error(errors);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  useEffect(() => {
    dispatch(getAllThreads());
  }, []);

  return (
    <Box mt={4}>
      <Text padding={4} fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
        Home
      </Text>
      <CreatePost />

      {Loading == "pending" ? (
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
