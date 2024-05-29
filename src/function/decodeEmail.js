// base64, JS 기본 난독화 모듈 사용
const decodeEmail = (obfuscatedEmail) => {
    try{
        const regex =/^[a-zA-Z가-힣0-9]{2,13}$/;

        const Email = atob(obfuscatedEmail)
        
        if(regex.test(Email)){
            return Email
        }
        else{
            //navigate error page
        }
    }
    catch (error){
        // status by navigate error page

    }
};

export default decodeEmail