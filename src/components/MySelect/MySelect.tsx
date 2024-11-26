import React, { useContext } from 'react';
import cls from '../MySelect/MySelect.module.css';
import { formContext } from '../../formContext';

interface MySelectProps {
    field_name: string;
    field_label: string;
    field_required: boolean;
    field_options: { option_label: string }[];
    field_value: string;
    field_error?: string;
}

const MySelect: React.FC<MySelectProps> = ({
                                               field_name,
                                               field_label,
                                               field_required,
                                               field_options,
                                               field_value,
                                               field_error,
                                           }) => {
    const { handleChange, handleBlur, getDirty, errors } = useContext(formContext);

    const isDirty = getDirty(field_name);
    const hasError = isDirty && (!field_value || field_value === '') || (field_error || errors[field_name]);

    return (
        <div className={cls.selectBox}>
            <label
                htmlFor={`select-${field_name}`}
                className={cls.selectLabel}
            >
                {field_label}
            </label>

            <select
                name={field_name}
                id={`select-${field_name}`}
                className={`${cls.select} ${
                    hasError ? cls.selectError : field_value ? cls.selectDone : ''
                }`}
                required={field_required}
                value={field_value || ''}
                onChange={(event) => handleChange(field_name, event)}
                onBlur={() => handleBlur(field_name, field_value)}
            >
                <option value="" disabled>
                    {`Выберите ${field_label.toLowerCase()}`}
                </option>
                {field_options.map((option, index) => (
                    <option
                        value={option.option_label}
                        key={`${field_name}-${index}`}
                    >
                        {option.option_label}
                    </option>
                ))}
            </select>

            {hasError && (
                <span className={cls.selectErrorText}>
                    {field_error || 'Пожалуйста, выберите значение'}
                </span>
            )}
        </div>
    );
};

export default MySelect;
