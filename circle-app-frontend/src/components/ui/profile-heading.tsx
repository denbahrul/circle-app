import { Box, Button, Flex, Image, Input, Text, Textarea } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { HiOutlineXCircle } from "react-icons/hi";

export default function ProfileHeading({ thumbnailH }: { thumbnailH: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box position={"relative"} marginBottom={4}>
        <Image src="./thumbnail.png" alt="thumbnail" height={thumbnailH} width={"100%"} rounded={8} objectFit="cover" />
        <Image src="./profile.png" alt="thumbnail" border={"solid 4px"} borderColor={"brand.backgroundBox"} position={"absolute"} bottom={"0px"} left={"14px"} height={"80px"} rounded={"full"} objectFit="cover" />
        <Flex justifyContent={"flex-end"} marginTop={2}>
          <Button onClick={onOpen} backgroundColor={"transparent"} height={"33px"} border={"solid 1px"} borderColor={"white"} color={"white"} rounded={"full"} padding={"7px 20px"} fontSize={"14px"} fontWeight={700} lineHeight={"17px"}>
            Edit Profile
          </Button>
        </Flex>
      </Box>
      <Flex direction={"column"} gap={2}>
        <Text as={"h1"} fontSize={"24px"} fontWeight={700} lineHeight={"32px"}>
          ✨ Stella Audhina ✨
        </Text>
        <Text fontSize={"14px"} fontWeight={400} lineHeight={"20px"} color={"brand.fontSecondary"}>
          @audhinafh
        </Text>
        <Text fontSize={"16px"} fontWeight={400} lineHeight={"24px"}>
          picked over by the worms, and weird fishes
        </Text>
        <Flex gap={4}>
          <Text fontSize={"16px"} fontWeight={700} lineHeight={"24px"}>
            291{" "}
            <Text as={"span"} fontWeight={400} color={"brand.fontSecondary"} marginLeft={1}>
              Following
            </Text>
          </Text>
          <Text fontSize={"16px"} fontWeight={700} lineHeight={"24px"}>
            310{" "}
            <Text as={"span"} fontWeight={400} color={"brand.fontSecondary"} marginLeft={1}>
              Followers
            </Text>
          </Text>
        </Flex>
      </Flex>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={"brand.backgroundCircle"} rounded={15}>
          <ModalHeader pl={4} pt={2} pb={0} fontSize={"20px"} fontWeight={700}>
            Edit profile
          </ModalHeader>
          <ModalCloseButton color="brand.borderAbu">
            <HiOutlineXCircle size={24} />
          </ModalCloseButton>

          <ModalBody p={4}>
            <Box position={"relative"} marginBottom={12}>
              <Image src="./thumbnail.png" alt="thumbnail" height={thumbnailH} width={"100%"} rounded={8} objectFit="cover" />
              <Box position={"absolute"} bottom={"-35px"} left={"14px"}>
                <Box position={"relative"}>
                  <Image src="./profile.png" alt="thumbnail" border={"solid 4px"} borderColor={"brand.backgroundCircle"} height={"80px"} rounded={"full"} objectFit="cover" />
                  <Image src="./edit-image.svg" alt="edit image" position={"absolute"} top={"20px"} left={"20px"} objectFit="cover" />
                </Box>
              </Box>
            </Box>
            <Flex direction={"column"} gap={3}>
              <Box position={"relative"}>
                <Text position={"absolute"} left={4} top={1} fontSize={"12px"} fontWeight={500} color={"brand.borderAbu"}>
                  Name
                </Text>
                <Input value="✨ Stella Audhina ✨" fontSize={"14px"} height={"48px"} pt={2} border={"solid 1px"} borderColor={"brand.borderAbu"} />
              </Box>
              <Box position={"relative"}>
                <Text position={"absolute"} left={4} top={1} fontSize={"12px"} fontWeight={500} color={"brand.borderAbu"}>
                  Username
                </Text>
                <Input value="audhinafh" fontSize={"14px"} height={"48px"} pt={2} border={"solid 1px"} borderColor={"brand.borderAbu"} />
              </Box>
              <Box position={"relative"}>
                <Text position={"absolute"} left={4} top={1} fontSize={"12px"} fontWeight={500} color={"brand.borderAbu"}>
                  Bio
                </Text>
                <Textarea value="picked over by the worms, and weird fishes" fontSize={"14px"} height={"48px"} pt={4} border={"solid 1px"} borderColor={"brand.borderAbu"} />
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter padding={4} borderTop={"solid 1px"} borderColor={"brand.borderAbu"}>
            <Button backgroundColor={"brand.green"} color={"white"} height={"41px"} justifyItems={"center"} rounded={"full"} alignItems={"center"} padding={"5px 25px"} fontSize={"14px"} fontWeight={700} lineHeight={"17px"}>
              Save
            </Button>
            {/* <Button onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
