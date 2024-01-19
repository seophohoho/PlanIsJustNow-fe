import { configureStore, createSlice } from '@reduxjs/toolkit'

const petImages = createSlice({
    name : 'petImages',
    initialState : ['path',],
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

const petSpecies = createSlice({
  name : 'petSpecies',
  initialState : [0],
  reducers : {
  }
}) 

const petName = createSlice({
  name : 'petName',
  initialState : ['햄톨이'],
  reducers:{

  }
})

export default configureStore({
  reducer: { 
    petImages : petImages.reducer,
    petName : petName.reducer,
    petSpecies : petSpecies.reducer,

  }
}) 