import { baseURL } from ".";

export const uploadFile = async (data: FormData) : Promise<any> =>{
    return fetch(baseURL + `/document/`, {
      body: data,
      method: 'post'
    }).then((response: any) => response.json());
  }