import { Box, Text } from "@chakra-ui/react";
import AppLayout from "../../components/layout/app-layout";
import ProfileHeading from "../../components/ui/profile-heading";
import ProfileTabs from "../../features/profile/components/profile-tab";

export default function Profile() {
  return (
    <AppLayout>
      <Text padding={4} fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
        Elon Musk
      </Text>
      <Box padding={4}>
        <ProfileHeading thumbnailH="140px" />
      </Box>
      <ProfileTabs />
    </AppLayout>
  );
}
