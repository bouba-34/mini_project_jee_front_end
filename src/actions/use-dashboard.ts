import axios from "axios";
import {Client} from "@/components/dashboard";
import {AddClientProps} from "@/components/clients";
import {AddAccountProps} from "@/components/accounts";
import {AddOperationProps} from "@/components/withdrawals";

export const getDashboard = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/client?limit=10');
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getClients = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/client');
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const addClient = async (data: AddClientProps, account_type: string, decouvert: string, taux: string, solde: string) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/client?account_type=${account_type}&decouvert=${decouvert}&taux=${taux}&solde=${solde}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteClient = async (id: number) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/client/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateClient = async (id: number, data: AddClientProps) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/v1/client/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getComptes = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/compte');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const addCompte = async (data: AddAccountProps) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/compte?accountType=${data.account_type}&clientId=${data.clientId}&decouvert=${data.decouvert || 0}&taux=${data.taux || 0}&solde=${data.solde || 0}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteCompte = async (id: number) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/compte/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getOperations = async (type: string) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/operations?type=${type}`);
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export const addOperation = async (data: AddOperationProps) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/operation?compteId=${data.compteId}&operationType=${data.operationType}&montant=${data.montant}&employeID=${data.employeID}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getClientAccounts = async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/compte/client/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


