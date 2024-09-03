import { Box, Text } from "@chakra-ui/react";
import AppLayout from "../../components/layout/app-layout";
import FollowsTabs from "../../features/follows/components/follows-tabs";

export default function Follows() {
  return (
    <AppLayout>
      <Box mt={4}>
        <Text padding={4} fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
          Follows
        </Text>
        <FollowsTabs />
      </Box>
    </AppLayout>
  );
}
