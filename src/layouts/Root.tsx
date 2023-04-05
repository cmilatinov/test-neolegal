import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import background from 'assets/img/background.jpg';

export function Root() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/inscription');
        }
    });
    return (
        <div className="h-100 container-fluid px-0 overflow-auto"
            style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
            <div className="container-md py-3 d-flex flex-column justify-content-center" style={{ minHeight: '100%' }}>
                <Outlet/>
            </div>
        </div>
    );
}
