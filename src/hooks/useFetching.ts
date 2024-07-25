import { useState } from "react";

interface IError {
    success : boolean;
    message: string;
    status : number;
}

export const useFetching = (callback: any) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<IError>();

    async function fetching (...args: any) {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error] as const
}
