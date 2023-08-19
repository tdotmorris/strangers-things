//import { useState } from "react";
const cohort = '2305-FTB-ET-WEB-PT'
const BaseURL=`https://strangers-things.herokuapp.com/api/${cohort}`
//import { useNavigate } from "react-router-dom";
//import App from "../App";
const tokenString= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUxMGY5MmJlYjkzNTAwMTRjMzg2MzUiLCJ1c2VybmFtZSI6InN1cGVybWFuMzAiLCJpYXQiOjE2OTI0NzExODZ9.NZKPRcqxYRxX8so2l7FEJGMA9-O0IlHYjBk-PtWtFGM"

    export default async function Authenticate(token){
            try {
                const APIResponse= await fetch(`${BaseURL}/users/me`,
                {
                methods: "GET",
                headers: {
                        'Content-type':'application/json',
                        'Authorization': `Bearer ${tokenString}`,
                    },
            
                });
                const result= await APIResponse.json();
                console.log(result);
                return result;
            } catch (error) {
                console.log(error)
            }
        }

