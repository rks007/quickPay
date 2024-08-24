import axios from "axios"
import { log } from "console";
import { useEffect, useState } from "react"

export interface balanceNumber {
    "amount": number
}

export const useBalance = () => {

    const [balance, setBalance] = useState<number | null>(null);


    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/account/balance");
                console.log(res.data.balance);
                
                setBalance(res.data.balance); // Assuming the API response has a "balance" key
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, [])

    return balance;
}