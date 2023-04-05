import React from 'react';
import MaskedInput from 'react-text-mask';
import { type Field } from 'assets/misc/form.types';
import { useValidation } from '../composables/useValidation';

interface Props {
    field: Field;
    value?: string;
    onChange?: React.FormEventHandler<HTMLInputElement | HTMLSelectElement>;
    valid?: boolean;
}

export function InputField({ field, value, onChange, valid }: Props) {
    const validation = useValidation();
    const validClass = `${valid === undefined ? '' : valid ? 'is-valid' : 'is-invalid'}`;
    const error = validation.errors[field.name] ?? 'Champ requis.';
    const mask = validation.masks[field.name];

    const renderInput = () => {
        if (mask) {
            return (
                <>
                    <MaskedInput mask={mask} guide={false}
                        className={`form-control ${validClass}`}
                        value={value} onChange={onChange} />
                    <div className="invalid-feedback">{error}</div>
                </>
            );
        }

        if (field.type === 'dropdown') {
            return (
                <select className={`form-select ${validClass}`} value={value} onChange={onChange}>
                    {field.options?.map((o) => (<option key={o.label} value={o.value}>{o.label}</option>))}
                </select>
            );
        }

        return (
            <>
                <input type="text" className={`form-control ${validClass}`} value={value} onChange={onChange} />
                <div className="invalid-feedback">{error}</div>
            </>
        );
    };

    return (
        <div className="mb-3">
            <label htmlFor={field.name} className="form-label">{field.label}</label>
            {renderInput()}
        </div>
    );
}
