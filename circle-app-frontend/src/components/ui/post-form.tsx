import { Box, Button, Flex, Image, Input, FormControl, Spinner, Text } from "@chakra-ui/react";
import { usePostThread } from "../../features/home/hooks/use-post-form";

export default function FormPost({ placeholder, buttonTitle }: { placeholder: string; buttonTitle: string }) {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = usePostThread();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl display={"flex"} alignItems={"center"} gap={4} justifyContent={"space-between"} borderBottom={"solid 1px"} borderColor={"brand.borderAbu"} p={4}>
        <Image src="/profile.png" alt="thumbnail" borderColor={"brand.backgroundBox"} height={"40px"} rounded={"full"} objectFit="cover" />
        <Box flex={"1"}>
          <Input {...register("content")} variant={"unstyled"} border={"none"} placeholder={placeholder} />
          {errors.content && (
            <Text fontSize={13} color={"red"}>
              * {errors.content.message}
            </Text>
          )}
        </Box>
        <Flex alignItems={"center"} gap={4}>
          <Image src="/gallery-add.svg" alt="gallery" height={"24px"} />
          <Button
            type="submit"
            backgroundColor={"brand.green-dark"}
            color={"brand.white-dark"}
            height={"33px"}
            justifyItems={"center"}
            rounded={"full"}
            alignItems={"center"}
            padding={4}
            fontSize={"14px"}
            fontWeight={700}
            lineHeight={"17px"}
          >
            {isSubmitting ? <Spinner /> : `${buttonTitle}`}
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
}
