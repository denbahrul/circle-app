import { Box } from "@chakra-ui/react";
import RightBar from "./right-bar";
import LeftBar from "./left-bar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <LeftBar />
      {children}
      <RightBar />
    </Box>
  );
}
