// utils/getQueryParams.js
import { useSearchParams } from "next/navigation";

const getQueryParams = () => {
    const searchParams = useSearchParams();
    const params = {};

    for (const [key, value] of searchParams) {
        params[key] = value;
    }

    return params;
};

export default getQueryParams;