"use client"

import { useRouter } from "next/router";
import { useEffect } from "react";

const NotFound = () => {
    const router = useRouter();

    useEffect(()=>{
        const timer = setTimeout(()=> router.push("/"), 3000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <>
            <h1 className="title">404 - Page not found</h1>
            <p className="description">Sorry, the page you are looking for does not exist.</p>
        </>
    )

}

export default NotFound;