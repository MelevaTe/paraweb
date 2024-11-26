import React, { useEffect, useState } from 'react';
import cls from './AuthComponent.module.css';
import MyButton from '../MyButton/MyButton';
import Element from '../FormFields/element';
import { formContext } from '../../formContext';
import { getFormData } from '../../API/data';
import Loader from "../Loader/Loader";
import img from '../../static/rectangle.jpg'


interface Field {
    name: string;
    type: string;
    value: string | boolean;
    required: boolean;
    pattern?: string;
    error?: string;
    options?: { option_label: string }[];
    tag: 'input' | 'select' | 'checkbox';
    label: string;
}

interface Errors {
    [key: string]: string;
}

interface DirtyFields {
    [key: string]: boolean;
}

const AuthComponent: React.FC = () => {
    const [elements, setElements] = useState<Field[] | null>(null);
    const [showMessage, setShowMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [dirtyFields, setDirtyFields] = useState<DirtyFields>({});
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const data = await getFormData();
                const formattedData = data.map((item: any) => {
                    if (!item.tag || !item.label) {
                        throw new Error('Каждое поле должно содержать tag и label');
                    }
                    return item;
                });
                setElements(formattedData);
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };

        fetchFormData();
    }, []);



    const handleChange = (id: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (elements) {
            const newElements = [...elements];
            const field = newElements.find((f) => f.name === id);
            if (field) {
                switch (field.type) {
                    case 'checkbox':
                        field.value = (event.target as HTMLInputElement).checked;
                        break;
                    default:
                        field.value = (event.target as HTMLInputElement).value;
                        break;
                }
                validateField(id, field.value);
            }
            setElements(newElements);
            setDirtyFields({ ...dirtyFields, [id]: true });
        }
    };

    const handleBlur = (id: string) => {
        const field = elements?.find((f) => f.name === id);
        if (field) {
            validateField(id, field.value);
            setDirtyFields({ ...dirtyFields, [id]: true });
        }
    };

    const validateField = (name: string, value: string | boolean) => {
        let error = '';
        const field = elements?.find((f) => f.name === name);
        if (field) {
            if (field.required && !value) {
                error = 'Это поле обязательно для заполнения';
            } else if (field.pattern) {
                const regex = new RegExp(field.pattern);
                if (!regex.test(value.toString())) {
                    error = field.error || 'Неверный формат';
                }
            }
        }
        setErrors({ ...errors, [name]: error });
    };

    useEffect(() => {
        setFormValid(Object.values(errors).every((err) => !err));
    }, [errors]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        let isValid = true;
        if (elements) {
            elements.forEach((field) => {
                validateField(field.name, field.value);
                if (errors[field.name]) {
                    isValid = false;
                }
            });
        }

        if (!isValid) {
            return;
        }
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 2000)); // Имитация задержки

        setShowMessage(true);
        setIsLoading(false);
    };

    const handleShowForm = () => {
        setShowMessage(false);
    };



    return (
        <formContext.Provider
            value={{
                handleChange,
                handleBlur,
                getDirty: (name: string) => dirtyFields[name] || false,
                errors,
                formValid,
            }}
        >
            <>
                <div className={cls.imgWrapper}>
                    <img className={cls.img} src={img} alt=""/>
                </div>
                <div className={`${cls.fromWrapper} ${showMessage ? cls.Column : ''}`}>
                    {isLoading ? (
                        <Loader/>
                    ) : showMessage ? (
                        <>
                            <h1 className={cls.headerText}>Регистрация прошла успешно</h1>
                            <p className={cls.mainText}>
                                Поздравляем, вы успешно зарегистрировались на портале!
                            </p>
                            <p className={cls.mainText}>
                                Письмо с подтверждением регистрации было выслано на вашу почту.
                            </p>
                            <MyButton
                                className={cls.buttonMargin}
                                type="button"
                                onClick={handleShowForm}
                            >
                                Вернуться к форме
                            </MyButton>
                        </>
                    ) : (
                        <form className={cls.Form} onSubmit={handleSubmit}>
                            {elements?.map((element, index) => {
                                return <Element key={index} field={element}/>;
                            })}
                            <MyButton
                                className={cls.buttonSelf}
                                type="submit"
                                disabled={!formValid}
                            >
                                регистрация
                            </MyButton>
                        </form>
                    )}
                </div>
            </>
        </formContext.Provider>
    );
};

export default AuthComponent;