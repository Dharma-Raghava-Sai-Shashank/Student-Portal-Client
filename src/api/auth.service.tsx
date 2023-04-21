import { APIRequest, baseURL } from ".";
import { ADMIN, STUDENT } from '../Admin/constants';

const authBaseURL = baseURL + '/auth';
const adminAuthURL = authBaseURL + '/admin';

export const signin = async (data: User.AuthData) => {
    const response = await APIRequest(authBaseURL + `/signin`, "POST", data);

    if(!response.success)
    return { ...response, role: STUDENT};

    localStorage.setItem('token', response?.token);
    localStorage.setItem('role', STUDENT);
    return { ...response, role: STUDENT }
}

export const adminSignin = async (data: User.AuthData) => {
    const response = await APIRequest(adminAuthURL + `/signin`, "POST", data);

    if(!response.success)
    return { ...response, role: ADMIN};

    localStorage.setItem('token', response?.token);
    localStorage.setItem('role', ADMIN);
    return { ...response, role: ADMIN }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};