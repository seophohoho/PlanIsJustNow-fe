// base64, JS 기본 난독화 모듈 사용
const decodeEmail = (obfuscatedEmail) => {
    try{
        const Email = atob(obfuscatedEmail)
        return Email
    }
    catch (error){
        // status by navigate error page

    }
};

export default decodeEmail