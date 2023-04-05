export interface Field {
    type: 'text' | 'dropdown';
    name: string;
    label: string;
    default?: string;
    options?: Array<{ value: string; label: string }>;
}

export interface Question {
    title: string;
    fields: Field[];
}
