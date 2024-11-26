import React, { useContext } from 'react';

import { formContext } from "../../formContext";
import MyInput from "../MyInput/MyInput";
import MySelect from "../MySelect/MySelect";
import MyCheckBox from "../MyCheckBox/MyCheckBox";

interface FieldOption {
    option_label: string;
}

interface FormField {
    tag: 'input' | 'select' | 'checkbox';
    type?: string;
    label: string;
    required: boolean;
    name: string;
    options?: FieldOption[];
    value: string | boolean;
    field_text?: string;
    field_link_text?: string;
    field_link_href?: string;
}

interface ElementProps {
    field: FormField;
}

const Element: React.FC<ElementProps> = ({ field }) => {
    const { errors } = useContext(formContext);

    const { tag, type, label, required, name, options, value, field_text, field_link_text, field_link_href } = field;

    switch (tag) {
        case 'input':
            return (
                <MyInput
                    field_type={type || 'text'}
                    field_label={label}
                    field_required={required}
                    field_name={name}
                    field_value={value as string}
                    field_error={errors[name]}
                />
            );
        case 'select':
            const safeOptions = options || [];
            return (
                <MySelect
                    field_label={label}
                    field_required={required}
                    field_name={name}
                    field_options={safeOptions}
                    field_value={value as string}
                    field_error={errors[name]}
                />
            );
        case 'checkbox':
            return (
                <MyCheckBox
                    field_type={type || 'checkbox'}
                    field_label={label}
                    field_required={required}
                    field_name={name}
                    field_value={value as boolean}
                    field_error={errors[name]}
                    field_text={field_text}
                    field_link_text={field_link_text}
                    field_link_href={field_link_href}
                />
            );
        default:
            return null;
    }
};

export default Element;
