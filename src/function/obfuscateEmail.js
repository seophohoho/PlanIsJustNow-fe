// base64, JS 기본 난독화 모듈 사용
const obfuscateEmail = (email) => {
    return btoa(email);
}
export default obfuscateEmail