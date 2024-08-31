import { Box, Image, Text, Input, Button, FormControl } from "@chakra-ui/react";

export default function LoginForm() {
  return (
    <Box color={"white"} width={"brand.form"}>
      <Image src="/logo.svg" alt="Circle Logo" />
      <Text as={"h1"} fontSize={28} fontWeight={700} marginY={5}>
        Login to Circle
      </Text>
      <FormControl display={"flex"} flexDirection={"column"} gap={"12px"}>
        <Input placeholder="Email/Username" />
        <Input placeholder="Password" />
        <Text textAlign={"end"} fontSize={14}>
          Forgot password?
        </Text>
        <Button backgroundColor={"brand.green"} color={"white"} fontSize={20}>
          Login
        </Button>
      </FormControl>
      <Text fontSize={14} marginTop={4}>
        Don't have an account yet?{" "}
        <Text as={"span"} color={"brand.green"}>
          {" "}
          Create account
        </Text>
      </Text>
    </Box>
  );
}
