import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useQuestions } from 'composables/useQuestions';
import { InputField } from 'components/InputField';
import { type Field } from 'assets/misc/form.types';
import { useValidation } from 'composables/useValidation';
import { useStorage } from '../composables/useStorage';

export function Inscription() {
    const questions = useQuestions();
    const validation = useValidation();
    const navigate = useNavigate();
    const storage = useStorage();

    const fields = questions.reduce<Field[]>((acc, q) => [...acc, ...q.fields], []);
    const [formData, setFormData] = useState<Record<string, string>>(
        fields.reduce((obj: Record<string, string>, f) => {
            obj[f.name] = f.default ?? '';
            return obj;
        }, {})
    );
    const [validationState, setValidationState] = useState<Record<string, boolean>>(
        Object.entries(formData).reduce((obj: Record<string, boolean>, [k, v]) => {
            obj[k] = Boolean(v);
            return obj;
        }, {})
    );
    const [formValidated, setFormValidated] = useState(false);
    const [loading, setLoading] = useState(false);

    const isFieldValid = (field: string, value: string) => {
        const regex = validation.regexes[field];
        return regex ? regex.test(value) : Boolean(value);
    };

    const setFormField = (field: string) => (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = field === 'post_code' ? event.currentTarget.value.toUpperCase() : event.currentTarget.value;
        setFormData({
            ...formData,
            [field]: value
        });
        setValidationState({
            ...validationState,
            [field]: isFieldValid(field, value)
        });
    };

    const isFormValid = () => {
        return Object.values(validationState).every(v => v);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormValidated(true);
        if (!isFormValid()) {
            return;
        }

        setLoading(true);
        axios.post('https://enovode7uq1r.x.pipedream.net/', formData)
            .then(() => {
                storage.save('data', formData);
                setLoading(false);
                navigate(`/merci/${formData.first_name}`);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    return (
        <div className="h-100 row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
                <div className="card shadow-lg">
                    <div className="card-body">
                        <h3 className="mb-3 card-title fw-semibold">Inscription</h3>
                        <p>Veuillez remplir le formulaire suivant pour compléter votre inscription.</p>
                        <p>
                            <small>
                                <span className="text-danger me-1">*</span>
                                Tous les champs sont requis.
                            </small>
                        </p>
                        <form noValidate
                            onSubmit={onSubmit}>
                            {
                                questions.map((q, i) => (
                                    <section key={i} className="mb-4">
                                        <h5 className="fw-semibold">{q.title}</h5>
                                        {
                                            q.fields.map((f) => (
                                                <InputField key={f.name}
                                                    field={f }
                                                    value={formData[f.name]}
                                                    onChange={setFormField(f.name)}
                                                    valid={formValidated ? Boolean(validationState[f.name]) : undefined}/>))
                                        }
                                    </section>
                                ))
                            }
                            <div className="text-end">
                                <button type="submit" className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading}>
                                    {loading ? <i className="bi-arrow-repeat" /> : 'Envoyer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
