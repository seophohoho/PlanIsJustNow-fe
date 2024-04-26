import { useDispatch, useSelector } from "react-redux"
import { Stack } from 'react-bootstrap';
import chunkArray from '../function/chunkArray.js';
import PetCircleImage from "./PetCircleImage.js";
import { useState } from "react";
import { selectPetId, selectPetName } from "../store/store.js";

function PetListMapComponent(props){
    const { petList, onSelectPet, selectedPetIndex, setPetPostData } = props

    function petSelectHandler(chunkIndex, index) {//handler 이름 변경 Choice? 기능도 몇개 추가
        const listIndex = chunkIndex * 4 + index;
        onSelectPet(listIndex);
        setPetPostData({
            species : petList.data[listIndex].idx,
            nickname : petList.data[listIndex].species
            /* 변경된 lastChoice 부분을 추가로 post, 여기서는 state만 업데이트 보내는 것은 부모에서
            이동할 때 서버에서 get 하니 클라 쪽 업데이트는 필요 X*/
        })
    }

    return(
        <>
        <Stack direction="vertical" gap={1} className="margin-bottom-20">
            {//petList.data 컴포넌트에서 이걸로 접근하는 건 좀 그런데 부모에서 그냥 확실한 값을 전달해야함
            // key 값이 같은거를 천운으로 생각해라
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