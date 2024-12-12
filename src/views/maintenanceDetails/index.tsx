import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  SimpleGrid,
  Textarea,
  Text,
  useColorModeValue,
  Icon,
  Grid,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";

// Assets
import { MdAutoAwesome } from "react-icons/md";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Upload from "./components/Upload";
import { InputForm, SavedFile } from "../../types/types";

import CustomMultiSelect from "./components/CustomMultiSelect";
import CustomCreatableSelect from "./components/CustomCreatableSelect";

import {
  modelTypeOptions,
  brandNameOptions,
  modelNameOptions,
  errorCodeOptions,
  replacementPartOptions,
  maintenanceToolsOptions,
  toyotaPartsNameOptions,
  doosanPartsNameOptions,
} from "variables/selectOptionList"

import { REACT_APP_API_URL } from "../../config";

export default function Form() {
  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [loading, setLoading] = useState<boolean>(false);

  const [brandName, setBrandName] = useState<string>("");
  const [modelName, setModelName] = useState<string>("");
  const [modelType, setModelType] = useState<string>("");
  const [abnormalSymptom, setAbnormalSymptom] = useState<string>("");
  const [abnormalPart, setAbnormalPart] = useState<string>("");
  const [replacementPart, setReplacementPart] = useState<string>("");
  const [maintenanceHistory, setMaintenanceHistory] = useState<string>("");

  const [maintenanceTools, setMaintenanceTools] = useState<string[]>([]);
  const [errorCode, setErrorCode] = useState<string>("");
  const [maintenanceId, setMaintenanceId] = useState<number>(null);
  const [maintenancePictureCount, setMaintenancePictureCount] =
    useState<number>(1);
  const [savedFiles, setSavedFiles] = useState<SavedFile[]>([]);
  const [savedImageDescriptions, setSavedImageDescriptions] = useState<
    string[]
  >([]);
  const history = useHistory();

  const getMaintenance = async (id: any) => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/maintenances/${id}`, {
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

  const { id }: any = useParams();
  useEffect(() => {
    if (id === "new") return;
    setLoading(true);
    getMaintenance(id).then((response) => {
      setMaintenanceId(response.id);
      setBrandName(response.brand_name);
      setModelName(response.model_name);
      setModelType(response.model_type);
      setErrorCode(response.error_code);
      setAbnormalPart(response.abnormal_part);
      setAbnormalSymptom(response.abnormal_symptom);
      setMaintenanceHistory(response.maintenance_history);
      setMaintenanceTools(response.maintenance_tools);
      setSavedImageDescriptions(response.saved_image_descriptions);
      setSavedFiles(response.saved_files);
      setMaintenancePictureCount(response.saved_files.length);

      setLoading(false);
    });
  }, [id]);

  const maintenanceInputForm = {
    isRequired: true,
    fontSize: "sm",
    ms: { base: "0px", md: "0px" },
    mb: "24px",
    fontWeight: "500",
    size: "lg",
    borderRadius: "16px",
  };

  const maintenanceInputFormLabel = {
    display: "flex",
    ms: "4px",
    fontSize: "sm",
    fontWeight: "500",
    color: { textColor },
    mb: "8px",
  };

  const summitMaintenanceLog = async () => {
    if (
      brandName === null ||
      modelType === null ||
      modelName === null ||
      abnormalSymptom === null ||
      maintenanceHistory === null
    ) {
      alert("Check Required Input");
      return;
    }

    try {
      const data: InputForm = {
        brand_name: brandName,
        model_type: modelType,
        model_name: modelName,
        error_code: errorCode,
        abnormal_part: abnormalPart,
        replacement_part: replacementPart,
        abnormal_symptom: abnormalSymptom,
        maintenance_history: maintenanceHistory,
        maintenance_tools: maintenanceTools,
        saved_files: savedFiles,
        saved_image_descriptions: savedImageDescriptions,
      };

      const response = await fetch(`${REACT_APP_API_URL}/maintenances/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);

      // 기존의 전체 메뉴리스트로 이동
      history.push("/admin/maintenance");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!loading) {
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Card
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          w="100%"
        >
          <Flex
            maxW={{ base: "100%", md: "max-content" }}
            mx={{ base: "auto", lg: "0px" }}
            me="auto"
            h="100%"
            pr="30px"
            pl="30px"
            pb="30px"
            alignItems="start"
            justifyContent="center"
            flexDirection="column"
          >
            <Flex
              zIndex="0"
              direction="column"
              w={{ base: "100%", md: "1420px" }}
              maxW="100%"
              background="transparent"
              borderRadius="15px"
              mx={{ base: "auto", lg: "unset" }}
              me="auto"
              mb={{ base: "20px", md: "auto" }}
            >
              <FormControl>
                <Flex align="center">
                  <Button
                    variant="action"
                    w="180px"
                    h="40px"
                    mb="20px"
                    isDisabled={!!maintenanceId}
                  >
                    <Icon
                      h="24px"
                      w="24px"
                      mr="10px"
                      color="blue.500"
                      as={MdAutoAwesome}
                    />
                    Voice Input
                  </Button>
                </Flex>
                <Grid templateColumns="3fr 3fr 3fr" gap={5} mb="15px">
                  <Box>
                    <FormLabel {...maintenanceInputFormLabel}>
                      Brand Name <Text color={brandStars}> *</Text>
                    </FormLabel>
                    <CustomMultiSelect
                      value={
                        brandName
                          ? { value: brandName, label: brandName }
                          : null
                      }
                      options={brandNameOptions}
                      isMulti={false}
                      isClearable={true}
                      placeholder="Select Brand Name"
                      onChange={(e: any) => setBrandName(e?.value)}
                    />
                  </Box>
                  <Box>
                    <FormLabel {...maintenanceInputFormLabel}>
                      Model Type <Text color={brandStars}> *</Text>
                    </FormLabel>
                    <CustomMultiSelect
                      value={
                        modelType
                          ? { value: modelType, label: modelType }
                          : null
                      }
                      options={modelTypeOptions}
                      isMulti={false}
                      isClearable={true}
                      placeholder="Select Model Type"
                      onChange={(e: any) => setModelType(e?.value)}
                    />
                  </Box>
                  <Box>
                    <FormLabel {...maintenanceInputFormLabel}>
                      Model Name <Text color={brandStars}> *</Text>
                    </FormLabel>
                    <CustomMultiSelect
                      value={
                        modelName
                          ? { value: modelName, label: modelName }
                          : null
                      }
                      options={modelNameOptions}
                      isMulti={false}
                      isClearable={true}
                      placeholder="Select Model Name"
                      onChange={(e: any) => setModelName(e?.value)}
                    />
                  </Box>
                </Grid>
                {/* abnormalSymptomOptions */}
                <SimpleGrid columns={3} spacing={5} mb="15px">
                  <Box>
                    <FormLabel {...maintenanceInputFormLabel}>
                      Error Codes
                    </FormLabel>
                    <CustomMultiSelect
                      value={
                        errorCode
                          ? { value: errorCode, label: errorCode }
                          : null
                      }
                      onChange={(e: any) => setErrorCode(e?.value)}
                      options={errorCodeOptions}
                      isMulti={false}
                      placeholder="Select Error Code"
                      isClearable={true}
                    />
                  </Box>
                  <Flex flexDirection="column" align="start">
                    <FormLabel {...maintenanceInputFormLabel}>
                      Abnormal Part
                    </FormLabel>
                    <CustomCreatableSelect
                      // value={equipments.map((value) => ({ value, label: value }))}
                      //   value={abnormalPart.map((value) => ({
                      //     value,
                      //     label: value,
                      //   }))}
                      value={
                        abnormalPart
                          ? { value: abnormalPart, label: abnormalPart }
                          : null
                      }
                      options={
                        brandName === "TOYOTA"
                          ? toyotaPartsNameOptions
                          : brandName === "DOOSAN"
                            ? doosanPartsNameOptions
                            : []
                      }
                      isMulti={false}
                      placeholder="Select Abnormal Part"
                      onChange={(event: any) => setAbnormalPart(event.value)}
                    />
                  </Flex>
                  <Flex flexDirection="column" align="start">
                    <FormLabel {...maintenanceInputFormLabel}>
                      Replacement Part
                    </FormLabel>
                    <CustomCreatableSelect
                      value={
                        replacementPart
                          ? { value: replacementPart, label: replacementPart }
                          : null
                      }
                      options={replacementPartOptions}
                      isMulti={false}
                      placeholder="Select Replacement Part"
                      onChange={(e: any) => setReplacementPart(e?.value)}
                    />
                  </Flex>
                </SimpleGrid>
                <FormLabel {...maintenanceInputFormLabel}>
                  Abnormal Symptom<Text color={brandStars}>*</Text>
                </FormLabel>
                <Textarea
                  value={abnormalSymptom}
                  {...maintenanceInputForm}
                  minH="150px"
                  placeholder="Input Abnormal Symptom"
                  onChange={(event) => setAbnormalSymptom(event.target.value)}
                />
                <FormLabel {...maintenanceInputFormLabel}>
                  Maintenance History<Text color={brandStars}>*</Text>
                </FormLabel>
                <Textarea
                  value={maintenanceHistory}
                  {...maintenanceInputForm}
                  minH="150px"
                  placeholder="Input Maintenance History"
                  onChange={(event) =>
                    setMaintenanceHistory(event.target.value)
                  }
                />
                <SimpleGrid columns={1} spacing={3} mb="10px">
                  <Box>
                    <FormLabel {...maintenanceInputFormLabel}>
                      Maintenance Tools
                    </FormLabel>
                    <CustomMultiSelect
                      value={maintenanceTools.map((value) => ({
                        value,
                        label: value,
                      }))}
                      options={maintenanceToolsOptions}
                      isMulti={true}
                      isClearable={true}
                      placeholder="Select Maintenance tools"
                      onChange={(event: any) =>
                        setMaintenanceTools(
                          event.map((option: any) => option.value)
                        )
                      }
                    />
                  </Box>
                </SimpleGrid>
                {[...Array(maintenancePictureCount)].map((_, index) => {
                  return (
                    <Upload
                      key={index}
                      index={index}
                      maintenanceId={maintenanceId}
                      model={modelName}
                      modelType={modelType}
                      abnormalSymptom={abnormalSymptom}
                      // abnormalSymptomDetails={abnormalSymptomDetails}
                      // actionDetails={actionDetails}
                      title="Maintenance Pictures"
                      savedImageDescriptions={savedImageDescriptions}
                      maintenancePictureCount={maintenancePictureCount}
                      setMaintenancePictureCount={setMaintenancePictureCount}
                      setSavedFiles={setSavedFiles}
                      savedFiles={savedFiles}
                    />
                  );
                })}

                {!maintenanceId ? (
                  <Button
                    fontSize="sm"
                    variant="brand"
                    fontWeight="500"
                    w="100%"
                    h="50"
                    onClick={summitMaintenanceLog}
                  >
                    Submit
                  </Button>
                ) : null}
              </FormControl>
            </Flex>
          </Flex>
        </Card>
      </Box>
    );
  }

  return null;
}
