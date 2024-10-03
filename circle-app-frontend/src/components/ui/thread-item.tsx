import { Link } from "react-router-dom";
import { Thread } from "../../features/home/types/thread.dto";
import { PostAction } from "./thread-action";
import PostContent from "./thread-content";

export default function PostItem({ profilePhoto, fullName, userName, postContent, postImage, like, reply, id, isLike }: Thread & { id: number; isLike: boolean }) {
  return (
    <Link to={`/detail-post/${id}`}>
      <PostContent profilePhoto={profilePhoto} fullName={fullName} userName={userName} postContent={postContent} postImage={postImage} id={id}>
        <PostAction isLike={isLike} like={like} reply={reply} id={id} />
      </PostContent>
    </Link>
  );
}
