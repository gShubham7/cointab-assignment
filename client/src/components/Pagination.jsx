import { Flex, Button } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const Pagination = ({ totalPages, page, handlePage, handlePRevNext }) => {
  let range = [];
  for (let i = 1; i <= totalPages; i++) {
    range.push(i);
  }

  return (
    <Flex
      p={25}
      alignItems="center"
      justifyContent="center"
      borderRadius={"3xl"}
    >
      <Flex>
        <Button
          isDisabled={page === 1}
          m={2}
          onClick={() => handlePRevNext(-1)}
          colorScheme="purple"
        >
          <ArrowBackIcon />
        </Button>
        {range.map((el) => (
          <Button
            key={el}
            m={2}
            onClick={() => handlePage(el)}
            colorScheme="orange"
            isActive={el === page}
          >
            {el}
          </Button>
        ))}
        <Button
          isDisabled={page === totalPages}
          m={2}
          onClick={() => handlePRevNext(1)}
          colorScheme="purple"
        >
          <ArrowForwardIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Pagination;
