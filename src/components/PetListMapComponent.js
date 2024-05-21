import { Stack } from 'react-bootstrap';
import chunkArray from '../function/chunkArray.js';
import PetCircleImage from "./PetCircleImage.js";

function PetListMapComponent(props) {
    const { petList, selectedPetIndex, eventHandler } = props;

    return (
        <Stack direction="vertical" gap={1} className="margin-bottom-20">
            {chunkArray(petList, 4).map((petDataChunk, chunkIndex) => (
                <Stack direction="horizontal" gap={1} className="margin-bottom-20" key={chunkIndex + 1}>
                    {petDataChunk.map((petData, index) => (
                        petData.petId && (
                            <PetCircleImage
                                key={index}
                                petName={petData.petId.species ? petData.petId.species : petData.petId.nickname}
                                isSelected={(chunkIndex * 4 + index) === selectedPetIndex}
                                imagePath={petData.petId.path ? petData.petId.path : '/thumbnail.png'}
                                onClick={() => eventHandler(chunkIndex, index)}
                            />
                        )
                    ))}
                </Stack>
            ))}
        </Stack>
    );
}

export default PetListMapComponent;
