import { Flex, Image, Text } from "@chakra-ui/react";
import { apiV1 } from "../../libs/api";
import Swal from "sweetalert2";
import { useState } from "react";

export function PostAction({ like, reply, id, isLike }: { like: number; reply: number; id: number; isLike: boolean }) {
  const [isThreadLike, setIsThreadLike] = useState<boolean>(isLike);

  async function onLike(threadId: number) {
    try {
      let response;
      if (isThreadLike) {
        response = await apiV1.delete(`/threads/like/${threadId}`);
        setIsThreadLike(false);
      } else {
        response = await apiV1.post("/threads/like", { threadId });
        setIsThreadLike(true);
      }
      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        background: "#1D1D1D",
        color: "#fff",
        iconColor: "#04A51E",
        timer: 800,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex gap={4} marginY={1} alignItems={"center"} alignContent={"center"} cursor={"pointer"} onClick={() => onLike(id)}>
      <Flex gap={2} alignItems={"center"}>
        <Image src={isThreadLike ? "/heart-red.svg" : "/heart.svg"} alt="like" height={"18px"} />
        <Text fontSize={"14px"} fontWeight={400} lineHeight={"20px"} color={"brand.fontSecondary"}>
          {like}
        </Text>
      </Flex>
      <Flex gap={1} alignItems={"center"} alignContent={"center"}>
        <Image src="/message-text.svg" alt="like" mr={1} height={"18px"} />
        <Text fontSize={"14px"} fontWeight={400} lineHeight={"20px"} color={"brand.fontSecondary"}>
          {reply}
        </Text>
        <Text fontSize={"14px"} fontWeight={400} lineHeight={"20px"} color={"brand.fontSecondary"}>
          Replies
        </Text>
      </Flex>
    </Flex>
  );
}

export function RepliesAction({ like }: { like: number }) {
  return (
    <Flex gap={4} marginY={1} alignItems={"center"}>
      <Flex gap={2} alignItems={"center"}>
        <Image src="/heart.svg" alt="like" height={"18px"} />
        <Text fontSize={"14px"} fontWeight={400} lineHeight={"20px"} color={"brand.fontSecondary"}>
          {like}
        </Text>
      </Flex>
    </Flex>
  );
}