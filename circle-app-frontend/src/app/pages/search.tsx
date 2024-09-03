import { Box, Flex, Text } from "@chakra-ui/react";
import AppLayout from "../../components/layout/app-layout";
import SearchBar from "../../features/search/components/search-bar";
import StartSearch from "../../features/search/components/search-start";

export default function Search() {
  return (
    <AppLayout>
      <Flex direction={"column"} mt={4} height={"100vh"}>
        <SearchBar />
        <StartSearch />
      </Flex>
    </AppLayout>
  );
}
