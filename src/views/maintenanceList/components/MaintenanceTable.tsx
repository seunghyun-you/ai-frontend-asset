import {
  Box,
  Button,
  Flex,
  Icon,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
// Custom components
import Card from "components/card/Card";
import * as React from "react";
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineError,
  MdOutlineReadMore,
} from "react-icons/md";
import { useHistory } from "react-router-dom";
import { MaintenanceSearchBar } from "./MaintenanceSearchBar";
import { CSSProperties, useEffect } from "react";
// Assets
import { REACT_APP_API_URL } from "../../../config";

type Maintenance = {
  id: number;
  model_name: string;
  model_type: string;
  error_code: string;
  abnormal_symptom: string;
  maintenance_tools: string[];
  pre_processing_status: string;
  date: string;
};

const columnHelper = createColumnHelper<Maintenance>();

// const columns = columnsDataCheck;
export default function MaintenanceTable() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [data, setData] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(0);

  const [modelType, setModelType] = React.useState("");
  const [modelName, setModelName] = React.useState("");
  const [preProcessingStatus, setPreProcessingStatus] = React.useState("");

  const getMaintenances = async (
    page: number,
    pageSize: number,
    keyword?: string,
    modelType?: string,
    modelName?: string,
    preProcessingStatus?: string
  ) => {
    try {
      let url = `${REACT_APP_API_URL}/maintenances?page=${page}&page_size=${pageSize}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      if (modelType) {
        url += `&model_type=${modelType}`;
      }
      if (modelName) {
        url += `&model_name=${modelName}`;
      }
      if (preProcessingStatus) {
        url += `&pre_processing_status=${preProcessingStatus}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMaintenances(
      page,
      pageSize,
      keyword,
      modelType,
      modelName,
      preProcessingStatus
    )
      .then((results) => {
        setData(results.data);
        setTotalPages(results.total_pages);
      })
      .catch((_) => { });
  }, [page, pageSize, modelType, modelName, preProcessingStatus, keyword]);

  const history = useHistory();
  const insertForm = () => {
    history.push("/admin/maintenance/new");
  };

  const recordClicked = (row: Row<Maintenance>) => {
    history.push(`/admin/maintenance/${row.getValue("id")}`);
  };

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          ID
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("model_type", {
      id: "model_type",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Model Type
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("model_name", {
      id: "model_name",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Model Name
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("error_code", {
      id: "error_code",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          ERROR CODE
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
          {/*<Progress variant='table' colorScheme='brandScheme' h='8px' w='63px' value={info.getValue()} />*/}
        </Flex>
      ),
    }),
    columnHelper.accessor("abnormal_symptom", {
      id: "abnormal_symptom",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Abnormal Symptom
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("maintenance_tools", {
      id: "maintenance_tools",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          MAINTENANCE TOOLS
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue().join(", ")}
        </Text>
      ),
    }),
    columnHelper.accessor("pre_processing_status", {
      id: "pre_processing_status",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Pre-Processing Status
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Icon
            w="24px"
            h="24px"
            me="5px"
            color={
              info.getValue() === "completed"
                ? "green.500"
                : info.getValue() === "failed"
                  ? "red.500"
                  : info.getValue() === "processing"
                    ? "orange.500"
                    : info.getValue() === "waiting"
                      ? "blue.500"
                      : null
            }
            as={
              info.getValue() === "completed"
                ? MdCheckCircle
                : info.getValue() === "failed"
                  ? MdCancel
                  : info.getValue() === "processing"
                    ? MdOutlineError
                    : info.getValue() === "waiting"
                      ? MdOutlineError
                      : null
            }
          />
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          DATE
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const model_types = ["지게차", "고소장비"];
  const model_names = ["D3OS-3", "D3OS-7", "D3OS-10"];
  const pre_processing_status = [
    "waiting",
    "processing",
    "completed",
    "failed",
  ];

  const handleModelTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModelType(e.target.value);
    setPage(1);
  };

  const handleModelNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModelName(e.target.value);
    setPage(1);
  };

  const handlePreProcessingStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPreProcessingStatus(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.target.value;
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setKeyword(e.currentTarget.value);
      getMaintenances(
        page,
        pageSize,
        keyword,
        modelType,
        modelName,
        preProcessingStatus
      ).then((results) => {
        setData(results.data);
        setTotalPages(results.total_pages);
        setPage(1);
      });
    }
  };

  const selectBoxWrapper = {
    style: {
      fontSize: "13px",
      fontWeight: "bold",
    } as CSSProperties,
    mr: "5px",
    w: "150px",
    size: "md",
    borderRadius: "20px",
    borderWidth: "0",
    mb: 5,
    // _focus: {
    // 	bg: "black",
    // 	color: "white",
    // 	borderWidth:"0",
    // },
    // _hover: {
    // 	bg: bgHover,
    // 	color: textHover,
    // 	borderWidth:"0",
    // },
  };

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        {/* 페이지 상단의 검색 입력창 / 셀렉트 박스에 대한 값 */}
        <Flex>
          <MaintenanceSearchBar
            mb={() => {
              if (true) {
                return { base: "10px", md: "unset" };
              }
              return "unset";
            }}
            me="10px"
            borderRadius="30px"
            w={{ base: "100%", md: "20vw" }}
            value={keyword}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
          />
          {/* <Switch
            // onChange={(e) => setIsOn(e.target.checked)}
            colorScheme="blue"
          /> */}
          <Select
            {...selectBoxWrapper}
            value={modelType}
            onChange={handleModelTypeChange}
          >
            <option value="">Model Type</option>
            {model_types.map((model_type, index) => (
              <option key={index} value={model_type}>
                {model_type}
              </option>
            ))}
          </Select>
          <Select
            {...selectBoxWrapper}
            value={modelName}
            onChange={handleModelNameChange}
          >
            <option value="">Model Name</option>
            {model_names.map((model_name, index) => (
              <option key={index} value={model_name}>
                {model_name}
              </option>
            ))}
          </Select>
          <Select
            {...selectBoxWrapper}
            value={preProcessingStatus}
            onChange={handlePreProcessingStatusChange}
          >
            <option value="">Status</option>
            {pre_processing_status.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </Flex>
        <Button variant="action" onClick={insertForm}>
          <Icon
            h="24px"
            w="24px"
            mr="5px"
            color="blue.500"
            as={MdOutlineReadMore}
          />
        </Button>
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color="gray.400"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted() as string] ?? null}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr
                  _hover={{ cursor: "pointer", bg: "blue.100" }}
                  onClick={() => recordClicked(row)}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        key={cell.id}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor="transparent"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Flex alignItems="center" justifyContent="space-between" mt={4}>
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page <= 1}
            ml={5}
          >
            이전
          </Button>
          <Flex>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  bg={page === pageNum ? "blue.500" : "gray.200"}
                  color={page === pageNum ? "white" : "gray.700"}
                  mx={1}
                >
                  {pageNum}
                </Button>
              )
            )}
          </Flex>
          <Button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page >= totalPages}
            mr={5}
          >
            다음
          </Button>
        </Flex>
      </Box>
    </Card>
  );
}
