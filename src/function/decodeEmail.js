// base64, JS 기본 난독화 모듈 사용
const decodeEmail = (obfuscatedEmail) => {
    try{
        //해독한게 이메일 rex와 일치하는지 확인
        //맞으면 -> 보내고 아니면 오류페이지로
        return atob(obfuscatedEmail);
    }
    catch (error){

        //에러 발생시 유요하지 않는 접근 에러 페이지로
    }
};

export default decodeEmail