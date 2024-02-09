import { URL } from "./urlHelpers";


export const fetchData = async (spec) => {
    try {
        const response = await fetch(`${URL}/wiki/${spec}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch data');
    }
};


export const createData = async(type, token, formData) => {
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
        console.log(error);
        throw new Error('Failed to fetch data');
    } 
}