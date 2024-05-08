import { useDispatch, useSelector } from "react-redux"
import { Stack } from 'react-bootstrap';
import chunkArray from '../function/chunkArray.js';
import PetCircleImage from "./PetCircleImage.js";
import { useState } from "react";
import { selectPetId, selectPetName } from "../store/store.js";

function PetListMapComponent(props){
    const { petList, selectedPetIndex, setPetPostData, eventHandler } = props


    return(
        <>
        <Stack direction="vertical" gap={1} className="margin-bottom-20">
            {//petList.data 컴포넌트에서 이걸로 접근하는 건 좀 그런데 부모에서 그냥 확실한 값을 전달해야함
            // key 값이 같은거를 천운으로 생각해라
                chunkArray(petList, 4).map((petDataChunk, chunkIndex) => (
                    <Stack direction="horizontal" gap={1} className="margin-bottom-20" key={chunkIndex+1}>
                        {
                            petDataChunk.map((petData, index) => (
                                <PetCircleImage
                                    key={index}
                                    petName={petData.petId.species ? petData.petId.species : petData.petId.nickname}
                                    isSelected={(chunkIndex * 4 + index) === selectedPetIndex}
                                    imagePath={petData.petId.path}
                                    onClick={() => eventHandler(chunkIndex, index)}
                                />
                                
                            ))
                        }
                    </Stack>
                ))
            }
        </Stack>
        </>
    )
}

export default PetListMapComponent 