import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"

export interface userSchema {
      "id": string,
      "firstName": string,
      "lastName": string,
      "username": string,
      "password": string
}

export const useSearchUser = (name: string) => {

    const[loading, setLoading] = useState(true);
    const [usersData, setUsersData ] = useState<userSchema[]>([]);

    useEffect(() => {
        const fetchUser = async() => {
            const users = await axios(`http://localhost:3000/api/user/search?filter=${name}`)
            setUsersData(users.data.users)
            setLoading(false);
            // console.log(users.data.users);
            
        }

        fetchUser();
    }, [name])

    return {
        usersData,
        loading
    }
}