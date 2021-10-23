import React, { useState, useEffect } from "react";
import axios from "axios";
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  Input,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stat,
  StatLabel,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Button,
  SimpleGrid,
  Collapse,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import InternationalTableRow from "components/Tables/InternationalTableRow";
import { International } from "variables/general";
import TableRow6 from "components/Tables/TableRow6";

var resul;

function InternationalData() {
  function substudinter() {
    let params = new URLSearchParams();
    params.append("Campus", document.getElementById("CampusID").value);
    params.append("DateYear", document.getElementById("DYID").value);
    params.append("Project", document.getElementById("ProjectID").value);
    params.append("Outcome", document.getElementById("OutcomeID").value);
    params.append("PersD", document.getElementById("PDID").value);
    params.append("ForLCC", document.getElementById("FLCCID").value);
    params.append("StudentDetails", localStorage.getItem("StudentRoll"));
    axios
      .post("http://localhost:5000/insertstudinter", params)
      .then((items) => {
        if (items.data == "Inserted") {
          resul = "Sucessfully Added!!";
          onOpen(resul);
        } else if (items.data == "NotInserted") {
          resul = "Error Occured!!";
          onOpen(resul);
        }
      });
  }

  const textColor = useColorModeValue("gray.700", "white");
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  let params = new URLSearchParams();
  params.append("StudentDetails", localStorage.getItem("StudentRoll"));
  useEffect(async () => {
    axios
      .post("http://localhost:5000/InternationalExposureStudent", params)
      .then((items) => {
        setData(items.data);
      });
  });
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex direction="column" pt={{ base: "500px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} gap={5}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Summer Program Details
            </Text>
          </CardHeader>
          <CardBody>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                  <Th color="gray.400">Campus</Th>
                  <Th color="gray.400">Date and Year</Th>
                  <Th color="gray.400">Project</Th>
                  <Th color="gray.400">Outcome</Th>
                  <Th color="gray.400">Personal Development</Th>
                  <Th color="gray.400">
                    Foreign Language Courses Completed or Pursuing
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {data.map((item) => {
                  return (
                    <TableRow6
                      id={item.s_no}
                      row1={item.foreign_campus}
                      row2={item.duration}
                      row3={item.project}
                      row4={item.outcome}
                      row5={item.personal_development}
                      row6={item.foreign_language_courses}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </CardBody>
          <Collapse in={show} animateOpacity>
            <Table variant="simple" color={textColor}>
              <Tbody>
                <Tr>
                  <Td minWidth={{ sm: "180px" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <Input
                          borderRadius="5px"
                          fontSize="sm"
                          type="text"
                          placeholder="Enter Campus"
                          id="CampusID"
                        />
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "180px" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Input
                        borderRadius="5px"
                        fontSize="sm"
                        type="text"
                        placeholder="Enter Date and Year"
                        id="DYID"
                      />
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "180px" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Input
                        borderRadius="5px"
                        fontSize="sm"
                        type="text"
                        placeholder="Project"
                        id="ProjectID"
                      />
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "180px" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Input
                        borderRadius="5px"
                        fontSize="sm"
                        type="text"
                        placeholder="Outcome"
                        id="OutcomeID"
                      />
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "180px" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Input
                        borderRadius="5px"
                        fontSize="sm"
                        type="text"
                        placeholder="Personal Development"
                        id="PDID"
                      />
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "180px" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Input
                        borderRadius="5px"
                        fontSize="sm"
                        type="text"
                        placeholder="Foreign Language Courses Completed or Pursuing"
                        id="FLCCID"
                      />
                    </Flex>
                  </Td>
                  <Td>
                    <Button
                      onClick={substudinter}
                      bg="orange.300"
                      alignSelf="flex-end"
                      width="fit-content"
                    >
                      Submit
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Result</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>{resul}</ModalBody>

                        <ModalFooter>
                          <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Collapse>
        </Card>

        <Button
          bg="orange.300"
          alignSelf="flex-end"
          width="fit-content"
          onClick={handleToggle}
        >
          <AddIcon w={4} h={4} me="3" />
          Add
        </Button>
      </SimpleGrid>
    </Flex>
  );
}

export default InternationalData;
