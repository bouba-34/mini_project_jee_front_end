import axios from 'axios'
import {LoginProps} from "@/app/login/page";

export const LoginEmploye = async (data: LoginProps) => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/auth/employe?email=' + data.email + '&password=' + data.password);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}