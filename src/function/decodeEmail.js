// base64, JS 기본 난독화 모듈 사용
const decodeEmail = (obfuscatedEmail) => {
    return atob(obfuscatedEmail);
};

export default decodeEmail