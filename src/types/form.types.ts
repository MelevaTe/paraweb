export interface FieldOption {
    option_label: string;
}

export interface FormField {
    tag: 'input' | 'select' | 'checkbox';
    type: string;
    label: string;
    required: boolean;
    name: string;
    value: string | boolean;
    pattern?: string;
    error?: string;
    options?: FieldOption[];
    field_text?: string;
    field_link_text?: string;
    field_link_href?: string;
}


export interface FormContextType {
    handleChange: (name: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleBlur: (name: string, value: string | boolean) => void;
    getDirty: (name: string) => boolean;
    errors: Record<string, string>;
    formValid: boolean;
}
