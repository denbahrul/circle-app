import { Box } from "@chakra-ui/react";
import PostItem from "../../../components/ui/post-item";

export default function PostList() {
  return (
    <Box id="post">
      <PostItem image="./profile.png" fullName="Elon Musk" userName="@elonmusk" postContent="okeee" like={10} reply={12}></PostItem>
      <PostItem image="./profile.png" fullName="Elon Musk" userName="@elonmusk" postContent="okeee" like={10} reply={12} />
      <PostItem
        image="./profile.png"
        fullName="Elon Musk"
        userName="@elonmusk"
        postContent="okeee"
        like={10}
        reply={12}
        postImage="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <PostItem image="./profile.png" fullName="Elon Musk" userName="@elonmusk" postContent="okeee" like={10} reply={12} />
      <PostItem
        image="./profile.png"
        fullName="Elon Musk"
        userName="@elonmusk"
        postContent="okeee"
        like={10}
        reply={12}
        postImage="https://images.pexels.com/photos/2432299/pexels-photo-2432299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
    </Box>
  );
}
