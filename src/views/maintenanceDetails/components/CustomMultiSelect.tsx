import Select, { MultiValue } from 'react-select';

import { customSelectStyleWrapper } from '../css/customSelectUi';

// Props 타입 지정
interface Equipment {
    value: string;
    label: string;
}

interface CustomMultiSelectProps {
    value: null | Equipment | Equipment[];
    options: Equipment[];
    isMulti: boolean;
    isClearable: boolean;
    placeholder: string;
    onChange: (value: Equipment | MultiValue<Equipment> | null) => void;
}

export default function CustomMultiSelect(
    { value, onChange, options, isMulti = true, isClearable = false, placeholder }: CustomMultiSelectProps) {

    const handleChange = (selectedOptions: Equipment | MultiValue<Equipment> | null) => {
        if (selectedOptions === null) {
            onChange(null);
        } else {
            onChange(selectedOptions);
        }
    };

    return (
        <Select
            value={value}
            options={options}
            isMulti={isMulti}
            isClearable={isClearable}
            placeholder={placeholder}
            styles={customSelectStyleWrapper}
            onChange={handleChange}
        />
    )
}
