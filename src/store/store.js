import { configureStore, createSlice } from '@reduxjs/toolkit'

const petImages = createSlice({//펫 이미지경로
    name : 'petImages', 
    initialState : ['path',], //state 정보(핵심)
    //state 수정, 추가할 때 함수를 생성해서 여기서 실행시킴 외부파일에서는 그냥 해당함수 실행을 요청만함
    reducers : { 
    }
})

const petId = createSlice({//펫 정보
  name : 'petId',
  initialState : [0,],
  reducers : {
  }
}) 

const petName = createSlice({//펫 이름
  name : 'petName',
  initialState : ['햄톨이', "","","","","","","","","","",""],
  reducers:{

  }
})

const inGamePetId = createSlice({
  name : 'inGamePetId',
  initialState : 0,
  reducers:{
    //함수 정의하면 됨.
    test(state,action){
      state = action.payload;
      console.log(state);
    }
  }

})

export const {} = petName.actions

const petInpo = createSlice({//펫 설명
  name : 'petName',
  initialState : [
    '조그만 덩치에 걸맞지 않게 씩씩하고 시끄러운 햄스터!',
  ],
  reducers:{

  }
})

const petSelected = createSlice({
  name : "petSelected",
  initialState : { id : -1 ,name : "petname"},
  reducers:{
    selectPetId(state, action){// 파라미터 설명 : state는 현재 본인이 담고있는 state를 가리킴, action은 요청시 외부에서 전달받은 데이터
      console.log(state.id = action.payload) // action.payload : 전달받은 데이터를 이용할 때 payload를 작성하여 사용
    },
    selectPetName(state, action){
      console.log(state.name = action.payload)
    }
  }
})

export const {selectPetId, selectPetName} = petSelected.actions
export const {test} = inGamePetId.actions
//함수또한 내보내야 요청가능

export default configureStore({// 내보낼 state 작성 문법은 아래와 같음
  reducer: { 
    petImages : petImages.reducer,
    petName : petName.reducer,
    petId : petId.reducer,
    petInpo : petInpo.reducer,
    petSelected : petSelected.reducer,
    inGamePetId: inGamePetId.reducer,
  }
}) 