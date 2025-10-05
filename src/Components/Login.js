import React, { useState } from "react";
import NavBar from "./NavBar";
import MyContext from "../Context/createContext";
import "./Style.css";
import {
  Stack,
  HStack,
  VStack,
  Text,
  StackDivider,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
  Button,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Portal,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const [show, setShow] = React.useState(false);
  const [error, setError] = useState("");

  const handleClick = () => setShow(!show);

  const [formData, setFormData] = useState({});
  const { sendData, setisLogin, isLogin, userData, getDailydatauser } =
  useContext(MyContext);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSumbit = async () => {
    try {
      console.log("Sending login data:", formData); // Debug log
      const bool = await sendData("https://carbon-footprint-backend.vercel.app/user/login", formData);
      console.log("Login response:", bool); // Debug log
      
      if (bool.error) {
        setError(bool.error);
        console.error("Login error:", bool.error);
      } else {
        setisLogin(true);
        const dd = await getDailydatauser(bool);
        nav("/caluculator");
      }
    } catch (error) {
      console.error("Login request failed:", error);
      setError("Login failed. Please try again.");
    }
  };
  return (
    <div>
      <NavBar></NavBar>
      <div className="Login">
        <VStack
          textAlign={"center"}
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Popover>
            <PopoverTrigger>
              <Button>DummyUser</Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Dummy Data</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <div>Email:- geustuser@gmail.com Password:-va</div>
                </PopoverBody>
                <PopoverFooter>
                  <div>Email:- geustuser2@gmail.com Password:-vi@</div>
                </PopoverFooter>
              </PopoverContent>
            </Portal>
          </Popover>

          <Heading color={"green"}>Nice,To See You Back</Heading>
          <Text color={"red"} as="em">
            {error}
          </Text>

          <Input
            variant="outline"
            name="Email"
            onChange={onChange}
            placeholder="Email"
          />
          <InputGroup size="md">
            <Input
              onChange={onChange}
              name="Password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button onClick={onSumbit} colorScheme="green">
            Login
          </Button>
        </VStack>
      </div>
    </div>
  );
};

export default Login;
