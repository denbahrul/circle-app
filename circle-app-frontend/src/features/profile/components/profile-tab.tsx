import { Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import { TabIndicatorCircle, TabItem } from "../../../components/ui/circle-tab";
import PostList from "./post-list";
import MediaList from "./media-list";
import { Thread } from "../../home/types/thread.dto";

export default function ProfileTabs({ threads }: { threads: Thread[] }) {
  return (
    <Tabs isFitted variant={"unstyled"}>
      <TabList borderBottom="1px solid" borderColor="brand.borderAbu">
        <TabItem tabName="All Post" />
        <TabItem tabName="Media" />
      </TabList>
      <TabIndicatorCircle />
      <TabPanels>
        <TabPanel p={0}>
          <PostList threads={threads} />
        </TabPanel>
        <TabPanel p={0}>
          <MediaList threads={threads} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
