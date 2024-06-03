import { Image, Stack } from 'react-bootstrap';

function PetCircleImage(props) {
    const { petName, isSelected, imagePath, onClick } = props;

    // isSelected 상태에 따라 동적으로 스타일 적용
    const selectedStyle = isSelected
        ? "pet-image border-outline-select"
        : "pet-image border-outline";

    // 이미지 로드 중 에러가 발생하면 호출되는 함수
    const handleError = (e) => {
        e.target.src = '/thumbnail.png';
    };

    return (
        <Stack gap={1}>
            <Image
                onClick={onClick}
                roundedCircle
                src={imagePath}
                className={selectedStyle}
                onError={handleError} // 이미지 로드 에러 핸들러 추가
            />
            <p className='pet-image color-lightPurple'>{petName}</p>
        </Stack>
    )
}

export default PetCircleImage;
