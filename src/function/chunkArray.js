// 배열을 지정된 크기의 묶음으로 나누는 함수
function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }// size 만큼 배열을 나눠 줌
    return result;
}

export default chunkArray