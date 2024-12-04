import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { FormField } from '../types/form.types';

const setupMockServer = (): AxiosMockAdapter => {
    const mock = new AxiosMockAdapter(axios);

    const mockData: FormField[] = [
        {
            tag: "input",
            type: "tel",
            label: "Номер телефона",
            required: true,
            placeholder: "Ваш номер телефона",
            name: "phone",
            value: "",
            error: "Неверный формат номера телефона",
            pattern: "^\\+7 \\d{3} \\d{3} \\d{2} \\d{2}$"
        },
        {
            tag: "input",
            type: "password",
            label: "Пароль",
            required: false,
            placeholder: "Пароль",
            name: "password",
            value: "",
        },
        {
            tag: "input",
            type: "password",
            label: "Повторите пароль",
            required: false,
            placeholder: "Повторите пароль",
            name: "confirmpassword",
            value: "",
        },
        {
            tag: "select",
            type: "select",
            label: "Выберите пункт из исписка",
            required: true,
            name: "select",
            value: "",
            options: [
                { option_label: "выбор 1" },
                { option_label: "выбор 2" },
                { option_label: "выбор 3" }
            ]
        },
        {
            tag: "checkbox",
            type: "checkbox",
            label: "checkbox",
            required: true,
            name: "checkbox0",
            value: false,
            field_text: "Я подтверждаю, что даю согласие на",
            field_link_text: "обработку персональных данных",
            field_link_href: "https://example.com/privacy-policy"
        }
    ];

    mock.onGet("/api/form").reply(200, mockData);

    mock.onPost('/api/form/submit').reply((config) => {
        const submittedData = JSON.parse(config.data);
        console.log('Данные, отправленные на сервер:', submittedData);
        return [200, { message: 'Форма успешно отправлена!' }];
    });

    return mock;
};

export const initializeMockServer = (): AxiosMockAdapter => {
    return setupMockServer();
};