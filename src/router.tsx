import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Root } from './layouts/Root';
import { Inscription } from './pages/Inscription';
import { Merci } from './pages/Merci';
import { Error } from './pages/Error';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <Error/>,
        children: [
            {
                path: 'inscription',
                element: <Inscription/>
            },
            {
                path: 'merci/:name',
                element: <Merci/>
            }
        ]
    }
]);

export default router;
