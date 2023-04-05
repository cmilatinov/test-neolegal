import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function Error() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <>
                {error.statusText}
            </>
        );
    }

    return (
        <>
            An error has occurred.
        </>
    );
}
