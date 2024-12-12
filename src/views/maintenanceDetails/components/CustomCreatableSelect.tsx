import CreatableSelect from 'react-select/creatable';
import {MultiValue} from 'react-select';

const selectStyleWrapper = {
    container: (provided: any, state: any) => ({
        ...provided,
        width: '100%'
    }),
    input: (provided: any, state: any) => ({
        ...provided,
        fontSize: '0.875rem',
        fontWeight: 'nomal',
    }),
    control: (provided: any, state: any) => ({
        ...provided,
        border: '1px solid #E2E8F0',
        borderRadius: '15px',
        padding: '8px',
        minHeight: '60px',
        height: '60px',
        maxHeight: '200px',
        overflow: 'hidden',
    }),
    placeholder: (provided: any, state: any) => ({
        ...provided,
        color: '#828b9d',
        fontSize: '0.875rem',
        fontWeight: '500',
    }),
    menu: (provided: any, state: any) => ({
        ...provided,
        borderRadius: '15px',
        font: "11",
    }),
    menuList: (provided: any, state: any) => ({
        ...provided,
        fontSize: '0.875rem',
        fontWeight: 'nomal',
        padding: '8px',
    }),
    singleValue: (provided: any, state: any) => ({
        ...provided,
        color: 'navy.700',
        backgroundColor: '#ffffff',
        fontSize: '0.875rem',
        fontWeight: '500',
        borderRadius: '16px',
        padding: '2px 4px',
        // maxWidth: 'calc(100% - 8px)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }),
    multiValue: (provided: any, state: any) => ({
        ...provided,
        color: '#5667f5',
        fontColor: '#ffffff',
        backgroundColor: '#e4e9f6',
        fontSize: '0.875rem',
        borderRadius: '16px',
        fontWeight: 'bold',
        padding: '2px 4px',
        // maxWidth: 'calc(100% - 40px)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
    }),
    indicatorsContainer: (provided: any, state: any) => ({
        ...provided,
        position: 'absolute',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
    }),
    valueContainer: (provided: any, state: any) => ({
      ...provided,
      maxHeight: '60px',
      maxWidth: 'calc(100% - 60px)',
      overflowY: 'auto',
      overflow: 'hidden',
      '::-webkit-scrollbar': {
        width: '0',
        background: 'transparent',
      },
    }),
    multiValueRemove: (provided: any, state: any) => ({
      ...provided,
      ':hover': {
        backgroundColor: 'transparent',
        color: '#5667f5',
      },
    }),
}

// Props 타입 지정
interface AbnormalPart {
    value: string;
    label: string;
}

interface CustomCreatableSelectProps {
    value?: null | AbnormalPart | AbnormalPart[];
    options: AbnormalPart[];
    isMulti?: boolean;
    isClearable?: boolean;
    placeholder?: string;
    onChange?: (value: AbnormalPart | MultiValue<AbnormalPart> | null) => void;
}

export default function CustomCreatableSelect(
    {value, options, isMulti = true, isClearable = true, placeholder, onChange} : CustomCreatableSelectProps) {

    const handleChange = (selectedOptions: AbnormalPart | MultiValue<AbnormalPart> | null) => {
        if (selectedOptions === null) {
            onChange(null);
        } else {
            onChange(selectedOptions);
        }
    };

    return (
        <CreatableSelect 
            value={value}
            isClearable={isClearable}
            isMulti={isMulti}
            options={options}
            styles={selectStyleWrapper}
            placeholder={placeholder}
            onChange={handleChange}
        />
    )
}