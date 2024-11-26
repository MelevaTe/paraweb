import React, { useContext } from 'react';
import cls from "../MyCheckBox/MyCheckBox.module.css";
import { formContext } from "../../formContext";
import { FormContextType } from '../../types/form.types';

interface MyCheckBoxProps {
    field_type: string;
    field_label?: string;
    field_required: boolean;
    field_name: string;
    field_value: boolean;
    field_text?: string;
    field_link_text?: string;
    field_link_href?: string;
    field_error?: string;
}

const MyCheckBox: React.FC<MyCheckBoxProps> = ({
                                                   field_type,
                                                   field_required,
                                                   field_name,
                                                   field_value,
                                                   field_text,
                                                   field_link_text,
                                                   field_link_href
                                               }) => {
    const { handleChange } = useContext<FormContextType>(formContext);

    return (
        <div className={cls.checboxWrapper}>
            <label>
                <input
                    type={field_type}
                    checked={field_value}
                    required={field_required}
                    className={`${cls.visuallyHidden}`}
                    onChange={(event) => handleChange(field_name, event)}
                />
                <span className={`${cls.checkSpan}`}></span>
            </label>
            <p className={cls.textchecbox}>
                {field_text}
                <a href={field_link_href}>{field_link_text}</a>
            </p>
        </div>
    );
};

export default MyCheckBox;