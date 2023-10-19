import { ApiRounded } from "@mui/icons-material";
import { APIRequest, baseURL } from ".";
import { ADMIN, STUDENT, COMPANY } from '../Admin/constants';

const authBaseURL = baseURL + '/auth';
const adminAuthURL = authBaseURL + '/admin';

export const signin = async (data: User.AuthData) => {
    const response = await APIRequest(authBaseURL + `/signin`, "POST", data);

    if (!response.success)
        return { ...response, role: STUDENT };

    localStorage.setItem('token', response?.token);
    localStorage.setItem('role', STUDENT);
    return { ...response, role: STUDENT }
}

export const adminSignin = async (data: User.AuthData) => {
    const response = await APIRequest(adminAuthURL + `/signin`, "POST", data);

    if (!response.success)
        return { ...response, role: ADMIN };

    localStorage.setItem('token', response?.token);
    localStorage.setItem('role', ADMIN);
    return { ...response, role: ADMIN }
}


export const companySignup = async (data: User.CompanySignup) => {
    const response = await APIRequest(authBaseURL + '/company/signup', "POST", data)
    return response;
}

export const companyLogin = async (email: string) => {
    return APIRequest(authBaseURL + '/company/login', "POST", { email: email });
}

export const verifyCompanyToken = async (token: string) => {
    const response = await APIRequest(authBaseURL + `/company/verify/${token}`, "GET");
    if (!response.success)
        return { ...response, role: COMPANY };

    localStorage.setItem('token', response?.token);
    localStorage.setItem('role', COMPANY);
    console.log("response:", response)
    return { ...response, role: COMPANY }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};