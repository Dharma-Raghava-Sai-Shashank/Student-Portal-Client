import { APIRequest, baseURL } from ".";

const authBaseURL = baseURL + '/auth';
const adminAuthURL = authBaseURL + '/admin';

export const signin = async (data: User.AuthData) => {
    const response = await APIRequest(authBaseURL + `/signin`, "POST", data);

    if(!response.success)
    return response?.message;

    localStorage.setItem('token', response?.token);
    localStorage.setItem('role', 'student');
    return response?.studentData
}

export const adminSignin = async (data: User.AuthData) => {
    const response = await APIRequest(adminAuthURL + `/signin`, "POST", data);

    if(!response.success)
    return response?.message;

    localStorage.setItem('token', response?.token);
    localStorage.setItem('role', 'admin');
    return response?.user
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};