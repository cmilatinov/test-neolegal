import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export function Merci() {
    const { name } = useParams();
    const [nameState, setNameState] = useState(name);
    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
                <div className="card shadow-lg">
                    <div className="card-body">
                        <h3 className="mb-3 card-title fw-semibold">Inscription Terminée</h3>
                        <p className="mb-3">
                            Merci <em className="text-decoration-underline">{nameState}</em> pour votre inscription!
                        </p>
                        <input type="text" value={nameState}
                            onChange={(e) => {
                                setNameState(e.target.value);
                            }}
                            className="form-control"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
