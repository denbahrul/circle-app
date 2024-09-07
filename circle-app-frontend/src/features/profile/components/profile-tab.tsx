import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import OthersAccountItem from "../../../components/ui/others-account-item";
import { TabIndicatorCircle, TabItem } from "../../../components/ui/circle-tab";
import PostList from "./post-list";
import PostItem from "../../../components/ui/item-post";
import MediaList from "./media-list";

export default function ProfileTabs() {
  return (
    <Tabs isFitted variant={"unstyled"}>
      <TabList borderBottom="1px solid" borderColor="brand.borderAbu">
        <TabItem tabName="Followers" />
        <TabItem tabName="Following" />
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
