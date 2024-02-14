import { URL } from "./urlHelpers";


export const fetchData = async (spec) => {
    try {
        const response = await fetch(`${URL}/wiki/${spec}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return error
    }
};


export const createData = async(type, token, formData, id) => {
    try {
        const creation = await fetch(`${URL}/admin/create-${type}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        if (!creation.ok) {
            // Si le statut n'est pas OK (200), rejetez la promesse avec un objet d'erreur
            throw new Error(`Erreur: ${creation.status} - ${creation.statusText}`);
        }

        return creation.json();
    } catch (error) {
        throw new Error(`Error: ${error.status} - ${error.statusText}`)
    } 
}


export const updateData = async(type, token, formData, id) => {
    try {
        const update = await fetch(`${URL}/admin/update-${type}/${id}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        return update.json();
    } catch (error) {
        return error;
    } 
}


export const readData = async (type, id) => {
    let search

    switch (type) {
        case "roman":
            search = "romans/get-roman"
            break;
        case "lieu":
            search = "lieux/get-lieu"
            break;
        case "personnage":
            search = "personnages/get-personnage"
            break;
        default:
            search = ""
            break;
    }

    try {
        const response = await fetch(`${URL}/wiki/${search}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return error
    }
};


export const deleteData = async (type, token, id) => {

    try {
        const response = await fetch(`${URL}/admin/delete-${type}/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
};