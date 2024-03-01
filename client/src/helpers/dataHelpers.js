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
        return creation.json();
    } catch (error) {
        throw new Error(error.message)
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
    try {
        const response = await fetch(`${URL}/wiki/${type}/get-${type.slice(0, -1)}/${id}`);
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