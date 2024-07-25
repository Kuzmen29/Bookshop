import React from 'react';

import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop() : undefined {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    // return <>{props.children}</>
    // return null;
};

export default ScrollToTop;