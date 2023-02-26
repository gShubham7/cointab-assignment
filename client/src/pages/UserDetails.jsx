import {
  filter,
  Heading,
  HStack,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getUsers = async (page) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://cointab-backend-cznp.onrender.com/user?limit=10&page=${page}`
      );
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers(page);
  }, [page]);

  const handlePage = (val) => {
    setPage(val);
  };

  const handlePRevNext = (val) => {
    setPage((prev) => prev + val);
  };
  const handleChange = (e) => {
    const arr = users.filter(
      (el) =>
        el.name.first.toLowerCase().includes(e.target.value) ||
        el.name.last.toLowerCase().includes(e.target.value) ||
        el.gender.toLowerCase() === e.target.value.toLowerCase()
    );
    setFiltered(arr);
    console.log(filtered);
  };
  return (
    <div>
      <Heading>User Details</Heading>
      <HStack m={5}>
        <Input placeholder="Filter by name..." onChange={handleChange} />

        <Select onChange={handleChange}>
          <option value="">--Select Gender--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
      </HStack>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Table variant="striped" colorScheme="teal" border={"1px solid blue"}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Gender</Th>
              <Th>Email</Th>
              <Th>Age</Th>
              <Th>DOB</Th>
              <Th>Phone</Th>
              <Th>Location</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filtered.length === 0
              ? users.map((el) => (
                  <Tr key={el.email}>
                    <Td>
                      {el.name.title + " " + el.name.first + " " + el.name.last}
                    </Td>
                    <Td>{el.gender}</Td>
                    <Td>{el.email}</Td>
                    <Td>{el.dob.age}</Td>
                    <Td>{el.dob.date}</Td>
                    <Td>{el.phone}</Td>
                    <Td>{el.location.city}</Td>
                  </Tr>
                ))
              : filtered.map((el) => (
                  <Tr key={el.email}>
                    <Td>
                      {el.name.title + " " + el.name.first + " " + el.name.last}
                    </Td>
                    <Td>{el.gender}</Td>
                    <Td>{el.email}</Td>
                    <Td>{el.dob.age}</Td>
                    <Td>{el.dob.date}</Td>
                    <Td>{el.phone}</Td>
                    <Td>{el.location.city}</Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      )}
      <Pagination
        totalPages={totalPages}
        page={page}
        handlePage={handlePage}
        handlePRevNext={handlePRevNext}
      />
    </div>
  );
};

export default UserDetails;
