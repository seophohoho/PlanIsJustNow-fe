import { useDispatch, useSelector } from "react-redux"
import { Form, Col, Row, Button, Image, Container, Navbar, Stack } from 'react-bootstrap';
import chunkArray from '../function/chunkArray.js';
import PetCircleImage from "./PetCircleImage.js";
import { useState } from "react";
import { selectPetId, selectPetName } from "../store/store.js";

function PetListMapComponent(){
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [selectedPetIndex, setSelectedPetIndex] = useState(null);

    return(
        <>
        <Stack direction="vertical" gap={1} className="margin-bottom-20">
            {chunkArray(state.petName, 4).map((petNamesChunk, chunkIndex) => (
                <Stack key={chunkIndex} direction="horizontal" gap={1} className="margin-bottom-20">
                    {petNamesChunk.map((petName, index) => (
                        <PetCircleImage
                            key={index}
                            petName={petName}
                            petId={state.petId[chunkIndex * 4 + index]}
                            isSelected={(chunkIndex * 4 + index) === selectedPetIndex}
                            onClick={() => {
                                setSelectedPetIndex(chunkIndex * 4 + index);
                                dispatch(selectPetId(state.petId[chunkIndex * 4 + index]));
                                dispatch(selectPetName(petName));
                            }}
                        />
                    ))}
                </Stack>
            ))}
        </Stack>
        </>
    )
}

export default PetListMapComponent 