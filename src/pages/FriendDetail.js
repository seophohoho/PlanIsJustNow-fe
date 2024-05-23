import { useNavigate, useParams } from 'react-router-dom';
import decodeEmail from "../function/decodeEmail";
import { useEffect } from 'react';
import axios from 'axios';
import serverUrl from '../serverConfig';
import handleError from '../function/errorHandler';

function FriendDetail(){
    const { obfuscatedEmail } = useParams();
    const navigate = useNavigate();

    const email = decodeEmail(obfuscatedEmail); // 이메일 디코딩

    useEffect(()=>{
        const fetch = async () =>{
            try{
                const todolistResponse = await axios.post(`${serverUrl}/api/friend/select-detail-todolist`,{email : email},{withCredentials: true})
                const petReseponse = await axios.post(`${serverUrl}/api/friend/select-detail-pet`,{email : email},{withCredentials: true})
                console.log(todolistResponse)
                console.log(petReseponse)
            }catch (error){
                handleError(error, navigate);
            }
        }

        fetch();
    },[])

    return (
    <div>
        <h1>{email}의 세부 정보</h1>
    </div>
    )
}

export default FriendDetail