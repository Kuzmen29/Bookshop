import React from 'react';

import { Route } from "react-router-dom";

export default function useRoutes(routes: any) {

    if (routes) {
        return routes.map(function (route: any) {
            return <Route key={route.path} path={route.path} Component={route.component}>
                {
                    useRoutes(route.children).map((item: any) => item)
                }
            </Route>
        }
        )
    } else {
        return [];
    }
}
