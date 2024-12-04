import React, { useContext } from 'react';
import cls from './MyInput.module.css';
import { formContext } from '../../formContext';
import doneIconPath from './static/inputDone.svg';

const MyInput: React.FC<{
    field_type: string;
    field_label: string;
    field_required: boolean;
    field_placeholder: string;
    field_name: string;
    field_value: string;
    field_error?: string;
}> = ({ field_type, field_label, field_required, field_name, field_value, field_placeholder }) => {
    const { handleChange, handleBlur, getDirty, errors } = useContext(formContext);

    const isDirty = getDirty(field_name);
    const hasError = isDirty && errors[field_name];


    return (
        <div className={cls.inputBox}>
            <label>{field_label}</label>
            <div
                className={`${cls.inputContainer} ${hasError ? cls.inputError : field_value ? cls.inputDone : ''}`}>

                <input
                    className={`${cls.input}`}
                    type={field_type}
                    required={field_required}
                    placeholder={field_placeholder}
                    value={field_value}
                    name={field_name}
                    onChange={(event) => handleChange(field_name, event)}
                    onBlur={() => handleBlur(field_name, field_value)}
                />
                {field_value && !hasError && (
                    <img
                        className={cls.doneVector}
                        src={doneIconPath}
                        alt="Галочка зеленого цвета, сообщающая об успешном заполнении элемента формы"
                    />
                )}
            </div>
            <span className={`${cls.inputErrorText} ${hasError ? '' : cls.opacityZero}`}>
                {hasError ? errors[field_name] : 'текст по умолчанию'}
            </span>
        </div>
    );
};

export default MyInput;
