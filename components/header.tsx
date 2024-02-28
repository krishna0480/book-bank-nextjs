
import { Box, Flex,Center,Text,Image, Spacer } from '@chakra-ui/react';
import React from 'react';

const Header = () => {
  return (
    <div>

    <Box w={"100%"} h={"50px"} bg={"#52b69a"}>
    <Flex>
    <Center><Text className="logo" fontSize={['2xl,2xl,3xl,3xl']} p={"10px"}>LOGO</Text></Center>
    <Spacer />
    <Center> 
            <Image
              borderRadius='full'
              boxSize={['40px','40px','40px','40px']}
              src='/download.png'
              alt='@user' mx={"10px"}
            />
            </Center>
    </Flex>
    </Box>

    </div>
  );
}

export default Header;
