import { Box } from "@chakra-ui/react";
import PostItem from "../../../components/ui/post-item";
import { apiV1 } from "../../../libs/api";
import { useAppSelector } from "../../../hooks/use-store";
import { ThreadResponseDTO } from "../../home/types/thread.dto";
import { useEffect, useState } from "react";
import { ThreadEntity } from "../../../entities/thread";

export default function PostList() {
  const [threads, setThread] = useState<ThreadEntity[]>([]);
  const user = useAppSelector((state) => state.auth.entities);

  async function getUserThread() {
    const response = await apiV1.get<null, { data: ThreadResponseDTO }>(`/user/threads/${user.id}`);
    const data = response.data.data;
    return { data: data };
  }

  useEffect(() => {
    getUserThread().then(({ data }) => {
      setThread(data);
    });
  }, []);

  return (
    <Box id="post">
      {threads.map((threads) => {
        return (
          <PostItem key={threads.id} id={threads.id} fullName={threads.author.fullname} userName={threads.author.username} postContent={threads.content} postImage={threads.image} like={threads.like.length} reply={threads.replies.length} />
        );
      })}
    </Box>
  );
}
