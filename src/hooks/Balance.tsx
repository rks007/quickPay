import axios from "axios"
import { useEffect, useState } from "react"

export interface balanceNumber {
    "amount": number
}

export const useBalance = () => {

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const [balance, setBalance] = useState<number | null>(null);


    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await axios.get(`${backendUrl}/api/account/balance`);
                // console.log(res.data.balance);
                
                setBalance(res.data.balance); // Assuming the API response has a "balance" key
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, [])

    return balance;
}