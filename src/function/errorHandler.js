/* axios error handler */
const handleError = (error, navigate) => {
    if (error.response) { // error.response가 있는지 먼저 확인함
      if (error.response.status === 401) { // 토큰 만료 리다이렉트
        console.log("Error status: " + error.response.status);
        alert("로그인을 다시해주세요!");
        navigate('/sign-in');
      } else {
        alert("서버와 연결에 실패했습니다.");
      }
    } else {
      if (error.message) {
        alert("에러: " + error.message);
      } else {
        alert("알 수 없는 에러가 발생했습니다.");
      }
    }
  };

  export default handleError