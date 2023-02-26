import { Button, Heading, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [running, setRunning] = useState(false);
  const [users, setUsers] = useState([]);
  const toast = useToast();

  const handleFetch = async () => {
    if (running) {
      return toast({
        title: "Request is already in progress",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    try {
      setRunning(true);
      const { data } = await axios.post("http://localhost:8080/user");
      if (data.message === "Success") {
        setRunning(false);
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
      setRunning(false);
    }
  };

  const handleDelete = async () => {
    if (running) {
      return toast({
        title: "Request is already in progress",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    try {
      setRunning(true);
      const { data } = await axios.delete("http://localhost:8080/user");
      if (data.message === "Success") {
        setRunning(false);
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
      setRunning(false);
    }
  };
  return (
    <div>
      <Button m={5} colorScheme={"purple"} onClick={handleFetch}>
        Fetch Users
      </Button>
      <Button m={5} colorScheme={"purple"} onClick={handleDelete}>
        Delete Users
      </Button>
      <Button
        m={5}
        colorScheme={"purple"}
        onClick={() => navigate("/user-details")}
      >
        User Details
      </Button>
      <Heading>{running ? "Request is in progress..." : null}</Heading>
      {users.length === 0 ? (
        <Heading>No Users In The Database</Heading>
      ) : (
        <Heading>Click on User Details Button to See The User List</Heading>
      )}
    </div>
  );
};

export default Home;
