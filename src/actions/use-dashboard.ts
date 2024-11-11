import axios from "axios";
import {Client} from "@/components/dashboard";
import {AddClientProps} from "@/components/clients";
import {AddAccountProps} from "@/components/accounts";
import {AddOperationProps} from "@/components/withdrawals";
import {NewEmployeProps} from "@/components/workers";

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

export const getEmployes = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/employe');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getCollaborators = async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/employe/${id}/collaborators`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const addEmploye = async (data: NewEmployeProps, sup_id: number, groupe_id: string) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/employe?employe_sup_id=${sup_id}&groupe_id=${groupe_id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getGroupe = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/groupe');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const addGroupe = async (nomGroupe: string) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/groupe?groupName=${nomGroupe}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const deleteEmploye = async (id: number) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/employe/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getGroupEmployes = async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/groupe/${id}/employes`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteGroup = async (id: number) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/groupe/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
