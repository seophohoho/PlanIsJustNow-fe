import { configureStore } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : 'kim',
    reducers : {
      changeName(state){
        return 'john ' + state
      }
    }
  }) 

export default configureStore({
  reducer: { }
}) 