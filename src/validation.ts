interface Field {
    required: boolean;
    pattern?: string;
    error?: string;
}

export const validateField = (field: Field, value: string | boolean): string => {
    let error = '';

    if (field.required && !value) {
        error = 'Это поле обязательно для заполнения';
    } else if (field.pattern && typeof value === 'string') {
        const regex = new RegExp(field.pattern);
        if (!regex.test(value)) {
            error = field.error || 'Неверный формат';
        }
    }

    return error;
};


