import { FormField } from '../src/types/form.types';

export const validateField = (
    name: string,
    value: string | boolean,
    elements: FormField[],
    errors: Record<string, string>,
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
    let error = '';
    const field = elements.find((f) => f.name === name);

    if (field) {
        if (field.required && !value) {
            error = 'Это поле обязательно для заполнения';
        } else if (field.pattern) {
            const regex = new RegExp(field.pattern);
            if (!regex.test(value.toString())) {
                error = field.error || 'Неверный формат';
            }
        }
        if (name.startsWith('confirm')) {
            const mainFieldName = name.replace(/^confirm/, '').toLowerCase();
            const mainField = elements.find((f) => f.name.toLowerCase() === mainFieldName);

            if (mainField && mainField.value !== value) {
                error = `Значение должно совпадать с полем "${mainField.label}"`;
            }
        } else {
            const confirmFieldName = `confirm${name.charAt(0).toUpperCase() + name.slice(1)}`;
            const confirmField = elements.find((f) => f.name === confirmFieldName);

            if (confirmField && confirmField.value !== value) {
                setErrors((prev) => ({
                    ...prev,
                    [confirmFieldName]: `Значение должно совпадать с полем "${field.label}"`,
                }));
            }
        }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
};

export const handleBlur = (
    id: string,
    elements: FormField[] | null,
    dirtyFields: { [key: string]: boolean },
    setDirtyFields: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>,
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
    const field = elements?.find((f) => f.name === id);
    if (field) {
        validateField(id, field.value, elements, {}, setErrors);
        setDirtyFields({ ...dirtyFields, [id]: true });
    }
};