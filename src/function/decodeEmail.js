// base64, JS 기본 난독화 모듈 사용
const decodeEmail = (obfuscatedEmail) => {
    try{
        return atob(obfuscatedEmail);
    }
    catch (error){
        //에러 발생시 유요하지 않는 접근
        
    }
};

export default decodeEmail