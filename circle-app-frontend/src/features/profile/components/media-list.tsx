import { Box, Grid, Image, AspectRatio } from "@chakra-ui/react";

export default function MediaList() {
  return (
    <Grid templateColumns={"repeat(3, 1fr)"} gap={1} padding={"8px 4px"}>
      <AspectRatio width={"100%"} ratio={1}>
        <Image src="https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" rounded={4} objectFit="cover" />
      </AspectRatio>
      <AspectRatio width={"100%"} ratio={1}>
        <Image src="https://images.pexels.com/photos/3828240/pexels-photo-3828240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" rounded={4} objectFit="cover" />
      </AspectRatio>
      <AspectRatio width={"100%"} ratio={1}>
        <Image src="https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" rounded={4} objectFit="cover" />
      </AspectRatio>
      <AspectRatio width={"100%"} ratio={1}>
        <Image src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" rounded={4} objectFit="cover" />
      </AspectRatio>
      <AspectRatio width={"100%"} ratio={1}>
        <Image src="https://images.pexels.com/photos/3922943/pexels-photo-3922943.jpeg?auto=compress&cs=tinysrgb&w=600" rounded={4} objectFit="cover" />
      </AspectRatio>
    </Grid>
  );
}
