import { configureStore, createSlice } from '@reduxjs/toolkit'

const petImages = createSlice({//이미지경로
    name : 'petImages', 
    initialState : ['path',], //state 정보(핵심)
    //state 수정, 추가할 때 함수를 생성해서 여기서 실행시킴 외부파일에서는 그냥 해당함수 실행을 요청만함
    reducers : { 
    }
}) 

//signUp email state 가져오기 부분 수정 예정
// const userId = createSlice({
//   name : 'petInpo',
//   initialState : {},
//   reducers : {
//   }
// }) 

const petId = createSlice({//펫 정보
  name : 'petId',
  initialState : [0,],
  reducers : {
  }
}) 

const petName = createSlice({//펫 이름
  name : 'petName',
  initialState : ['햄톨이',],
  reducers:{

  }
})

const petInpo = createSlice({//펫 설명
  name : 'petName',
  initialState : [
    '조그만 덩치에 걸맞지 않게 씩씩하고 시끄러운 햄스터!',
  ],
  reducers:{

  }
})

//함수또한 내보내야 요청가능
export const {} = petName.actions

export default configureStore({// 내보낼 state 작성 문법은 아래와 같음
  reducer: { 
    petImages : petImages.reducer,
    petName : petName.reducer,
    petId : petId.reducer,
    petInpo : petInpo.reducer,
    
  }
}) 