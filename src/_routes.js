import React from 'react';
import Upload from './upload';
import Login from './login';

const routes=[
    {
        path: "/",
        element:<Login />
    },
    {
        path: "/upload",
        element:<Upload/>
    },
]

export default routes;
