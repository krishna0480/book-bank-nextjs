import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading (){
  return <Flex w = '100vw' h = '100vh' alignItems = 'center' justifyContent = 'center'>
    <Spinner thickness="4px" size = 'xl' color="black" />
  </Flex>
}