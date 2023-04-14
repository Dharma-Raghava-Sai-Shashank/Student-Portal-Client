import { APIRequest, baseURL } from ".";

const authBaseURL = baseURL + '/auth';
const adminAuthURL = authBaseURL + '/admin';

export const signin = async (data: User.AuthData) => {
    const response = await APIRequest(authBaseURL + `/signin`, "POST", data);

    if(!response.success)
    return { ...response, role: 'student'};

    localStorage.setItem('token', response?.token);
    localStorage.setItem('role', 'student');
    return { ...response, role: 'student' }
}

export const adminSignin = async (data: User.AuthData) => {
    const response = await APIRequest(adminAuthURL + `/signin`, "POST", data);

    if(!response.success)
    return { ...response, role: 'admin'};

    localStorage.setItem('token', response?.token);
    localStorage.setItem('role', 'admin');
    return { ...response, role: 'admin' }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};