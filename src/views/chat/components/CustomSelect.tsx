import Select from "react-select";
import { useColorModeValue } from "@chakra-ui/react";

// Props 타입 지정
interface Options {
  value: string;
  label: string;
}

interface CustomMultiSelectProps {
  value: null | Options | Options[];
  options: Options[];
  isMulti?: boolean;
  isClearable: boolean;
  placeholder: string;
  setMultiTurnValue: any;
}

export default function CustomMultiSelect({
  value,
  options,
  setMultiTurnValue,
  isMulti,
  isClearable,
  placeholder,
}: CustomMultiSelectProps) {
  const bg = useColorModeValue("white", "navy.700");
  const singleValueColor = useColorModeValue("navy.700", "white");
  const singleValueBackgroundColor = useColorModeValue("white", "navy.700");
  const multiValueColor = useColorModeValue("#5667f5", "white");
  const multiValueBackgroundColor = useColorModeValue("#e4e9f6", "navy.600");
  const menuColor = useColorModeValue("black", "white");
  const menuBackgroundColor = useColorModeValue("white", "navy.600");
  const menuBorderColor = useColorModeValue("gray.200", "white");

  const selectStyleWrapper = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: bg,
      border: "1px solid #E2E8F0",
      borderRadius: "15px",
      padding: "8px",
      minHeight: "60px",
      height: "60px",
      maxHeight: "200px",
      overflow: "hidden",
    }),
    input: (provided: any, state: any) => ({
      ...provided,
      fontSize: "0.875rem",
      fontWeight: "nomal",
    }),
    placeholder: (provided: any, state: any) => ({
      ...provided,
      color: "#828b9d",
      fontSize: "0.875rem",
      fontWeight: "500",
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      borderRadius: "15px",
      font: "11",
      color: menuColor,
      backgroundColor: menuBackgroundColor,
      borderColor: menuBorderColor,
      zIndex: 1000,
      ":hover": {
        backgroundColor: "navy.700",
      },
    }),
    menuList: (provided: any, state: any) => ({
      ...provided,
      fontSize: "0.875rem",
      fontWeight: "nomal",
      padding: "8px",
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: singleValueColor, // 수정
      backgroundColor: singleValueBackgroundColor, // 수정
      fontSize: "0.875rem",
      fontWeight: "500",
      borderRadius: "16px",
      padding: "2px 4px",
      // maxWidth: 'calc(100% - 8px)',
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),
    multiValue: (provided: any, state: any) => ({
      ...provided,
      color: multiValueColor,
      backgroundColor: multiValueBackgroundColor,
      fontColor: "#ffffff",
      fontSize: "0.875rem",
      borderRadius: "16px",
      fontWeight: "bold",
      padding: "2px 4px",
      // maxWidth: 'calc(100% - 40px)',
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: "16px",
      fontFamily: "Arial, sans-serif",
      ":hover": {
        color: "#5667f5",
      },
    }),
    indicatorsContainer: (provided: any, state: any) => ({
      ...provided,
      position: "absolute",
      right: "8px",
      top: "50%",
      transform: "translateY(-50%)",
    }),
    valueContainer: (provided: any, state: any) => ({
      ...provided,
      maxHeight: "60px",
      maxWidth: "calc(100% - 60px)",
      overflowY: "auto",
      overflow: "hidden",
      "::-webkit-scrollbar": {
        width: "0",
      },
    }),
    multiValueRemove: (provided: any, state: any) => ({
      ...provided,
      ":hover": {
        color: "#5667f5",
      },
    }),
    menuPortal: (provided: any) => ({ ...provided, zIndex: 9999 }),
  };

  const handleChange = (selectedOption: Options | null) => {
    if (selectedOption) {
      setMultiTurnValue(selectedOption.value);
    } else {
      setMultiTurnValue("");
    }
  };

  return (
    <Select
      value={value}
      options={options}
      // isMulti={isMulti}
      isClearable={isClearable}
      placeholder={placeholder}
      styles={selectStyleWrapper}
      onChange={handleChange}
      menuPortalTarget={document.body}
    />
  );
}
