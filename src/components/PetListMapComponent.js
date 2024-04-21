import { useDispatch, useSelector } from "react-redux"
import { Stack } from 'react-bootstrap';
import chunkArray from '../function/chunkArray.js';
import PetCircleImage from "./PetCircleImage.js";
import { useState } from "react";
import { selectPetId, selectPetName } from "../store/store.js";

function PetListMapComponent(props){
    const { petList, onSelectPet, selectedPetIndex, setPetPostData } = props

    function petSelectHandler(chunkIndex, index) {
        const listIndex = chunkIndex * 4 + index;
        onSelectPet(listIndex);
        setPetPostData({
            species : petList.data[listIndex].idx,
            nickname : petList.data[listIndex].species
        })
    }

    return(
        <>
        <Stack direction="vertical" gap={1} className="margin-bottom-20">
            {
                chunkArray(petList.data, 4).map((petDataChunk, chunkIndex) => (
                    <Stack direction="horizontal" gap={1} className="margin-bottom-20">
                        {
                            petDataChunk.map((petData, index) => (
                                <PetCircleImage
                                    key={index}
                                    petName={petData.species}
                                    isSelected={(chunkIndex * 4 + index) === selectedPetIndex}
                                    imagePath={petData.path}
                                    onClick={() => petSelectHandler(chunkIndex, index)}
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