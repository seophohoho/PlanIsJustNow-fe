import { Image, Stack } from 'react-bootstrap';

function PetCircleImage(props){
    const { petName, isSelected, imagePath, onClick } = props;

    // isSelected 상태에 따라 동적으로 스타일 적용
    const selectedStyle = isSelected
        ? "pet-image border-outline-select"
        : "pet-image border-outline";
        
    return (
        <Stack gap={1}>
            <Image
                onClick={onClick}
                roundedCircle
                src={imagePath} //'/thumbnail.png' 이미지 디자인 완성시 -> state.petImages[i]로 변경 chunkIndex props로 받아와서 i에 적용
                className={selectedStyle}
            />
            <p className='pet-image color-lightPurple'>{petName}</p>
        </Stack>
    )
}

export default PetCircleImage