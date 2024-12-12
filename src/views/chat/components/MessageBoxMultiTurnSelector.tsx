import { Box, Text, useColorModeValue } from "@chakra-ui/react";

import CustomSelect from "./CustomSelect";

interface Options {
  value: string;
  label: string;
}

interface MessageBoxMultiTurnParameterProps {
  title: string;
  value: null | Options | Options[];
  isMulti: boolean;
  isClearable: boolean;
  options: Options[] | null;
  setMultiTurnValue: any;
}

export default function MessageBoxMultiTurnSelector({
  title,
  value,
  options,
  setMultiTurnValue,
  isMulti,
  isClearable,
}: MessageBoxMultiTurnParameterProps) {
  const bg = useColorModeValue("white", "transparent");
  const textColor = useColorModeValue("navy.700", "white");

  const maintenanceInputFormLabel = {
    display: "flex",
    ms: "4px",
    fontSize: "sm",
    fontWeight: "500",
    color: textColor,
    mb: "3px",
  };

  return (
    <Box bg={bg}>
      <Text {...maintenanceInputFormLabel}>{title}</Text>
      <CustomSelect
        value={value}
        options={options}
        setMultiTurnValue={setMultiTurnValue}
        // isMulti={isMulti}
        isClearable={isClearable}
        placeholder={`Select ${title}`}
      />
    </Box>
  );
}
