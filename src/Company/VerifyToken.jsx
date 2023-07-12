import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyCompanyToken } from '../api/auth.service';


const VerifyToken = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const [verifing, setVerifing] = useState(true);


    const verificationToken = queryParams.get('verificationToken');

    const handleVerification = async () => {
        try {
            const res = await verifyCompanyToken(verificationToken);
            console.log("res", res);
            navigate('/company/dashboard')
        }
        catch (error) {
            setVerifing(false);
        }
    }

    useEffect(() => {
        handleVerification()
    }, [])

    if (verifing)
        return <div>Verifing</div>


    return <div>Verification Failed Wrong login link or something went wrong</div>
}

export default VerifyToken