import { RepliesAction } from "../../../components/ui/thread-action";
import PostContent from "../../../components/ui/thread-content";
import { Thread } from "../../home/types/thread.dto";

export default function RepliesItem({ profilePhoto, fullName, userName, postContent, postImage, like, id, authorId }: Omit<Thread, "reply"> & { authorId: number }) {
  return (
    <PostContent authorId={authorId} id={id} profilePhoto={profilePhoto} fullName={fullName} userName={userName} postContent={postContent} postImage={postImage}>
      <RepliesAction like={like} />
    </PostContent>
  );
}
