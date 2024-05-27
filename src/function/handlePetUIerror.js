
const handlePetUIerror = (error, id, navigate) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                console.log("Error status: " + error.response.status);
                alert("로그인을 다시해주세요!");
                navigate('/');
                break;
            case 400:
                if (id === 'hands') {
                    alert("하루 할당량을 모두 사용하였습니다!");
                } else if (id === 'feed') {
                    alert("현재 할당량 모두 사용!\n각 시간대에 한번씩 사용가능! \n07:00 ~ 09:00\n12:00 ~ 14:00\n17:00 ~ 22:00");
                }
                break;
            default:
                alert("서버와 연결에 실패했습니다.");
        }
    } else {
        console.error("Error: ", error);
        alert("에러: " + (error.message || "알 수 없는 에러가 발생했습니다."));
    }
};

export default handlePetUIerror;