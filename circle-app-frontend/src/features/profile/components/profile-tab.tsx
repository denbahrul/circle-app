import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import OthersAccountItem from "../../../components/ui/item-others-account";
import { TabIndicatorCircle, TabItem } from "../../../components/ui/circle-tab";
import PostList from "./post-list";
import PostItem from "../../../components/ui/post-item";
import MediaList from "./media-list";

export default function ProfileTabs() {
  return (
    <Tabs isFitted variant={"unstyled"}>
      <TabList borderBottom="1px solid" borderColor="brand.borderAbu">
        <TabItem tabName="All Post" />
        <TabItem tabName="Media" />
      </TabList>
      <TabIndicatorCircle />
      <TabPanels>
        <TabPanel p={0}>
          <PostList />
        </TabPanel>
        <TabPanel p={0}>
          <MediaList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
