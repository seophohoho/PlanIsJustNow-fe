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

//전체 일정 보여주는 스케줄 추후에 완전히 비워야함
const dateSchedule = createSlice({
  name : "dateSchedule",
  initialState : {
    "2024-03-17" : [
      {title : "운동", time: "20:00", important: true, complete : false},
      {title : "식사", time: "17:00", important: false , complete : true},
    ],
    "2024-03-19" : [
      {title : "회의", time: "12:00", important: true, complete : false},
      {title : "간식", time: "15:51", important: false, complete : false},
      {title : "후식", time: "18:11", important: true, complete : false},
      {title : "가나다라마바사", time: "17:21", important: false, complete : true},
      {title : "공부", time: "17:23", important: false, complete : false},

    ],
  },
  reducers:{
    scheduleInit(state, action){//state 초기화
      return state
    },
    scheduleStateAdd(state, action){
      const scheduleState = { 
        title : action.payload.title,
        time: action.payload.time,
        important: action.payload.important, 
        complete : false 
      }

      // 같은 날짜에 important가 true인 일정의 개수를 계산.
      const clickedDate = action.payload.clickedDate;
      const importantCount = state[clickedDate] ? state[clickedDate].filter(item => item.important).length : 0;
      
      //중요표시는 3개까지, 일정은 1글자 이상 입력 제어
      if((importantCount === 3 && action.payload.important === true) || action.payload.title.length === 0){
        if(action.payload.title.length === 0){
          alert("일정을 입력해 주세요!")
        }
        else{
            alert("중요 표시는 3개를 초과하여 등록할 수 없습니다!")
        }
      }
      else{
        // 새로운 날짜가 주어진 경우, 해당 날짜에 대한 새로운 배열을 생성하고 일정을 추가
        // 이미 해당 날짜에 일정이 있다면, 새로운 일정을 해당 배열에 추가합니다.
        if (!state[clickedDate]) {
          state[clickedDate] = [scheduleState];
        } else {
          if (scheduleState.important) {
            state[clickedDate].unshift(scheduleState);
          } else {
            state[clickedDate].push(scheduleState);
          }
        }
      }
    },
    scheduleStateEdit(state, action){//아래 post로 전부 보내야함 axios 함수도 여기서 관리?
      const scheduleState = state[action.payload.clickedDate][action.payload.index]
      
      // 같은 날짜에 important가 true인 일정의 개수를 계산.
      const clickedDate = action.payload.clickedDate;
      const importantCount = state[clickedDate] ? state[clickedDate].filter(item => item.important).length : 0;
      //중요표시가 3개 + 전달 받은 중요가 true일때만  
      if((importantCount === 3 && action.payload.important === true) || action.payload.title.length === 0){
        if(action.payload.title.length === 0){
          alert("일정을 입력해 주세요!")
        }
        else{
            alert("중요 표시는 3개를 초과하여 등록할 수 없습니다!")
        }
      }
      else{
        if (action.payload.important) {
          // 기존의 important가 false였으나 true로 변경되는 경우, 최상단으로 이동
          state[clickedDate].splice(action.payload.index, 1); // 기존 위치에서 제거
          state[clickedDate].unshift(scheduleState); // 최상단에 추가
          scheduleState.title = action.payload.title
          scheduleState.time = action.payload.time
          scheduleState.important = action.payload.important
        } else {
          if(scheduleState.important != action.payload.important){
            state[clickedDate].splice(action.payload.index, 1); // 기존 위치에서 제거
            state[clickedDate].push(scheduleState); // 최상단에 추가
          }
          // important가 true로 변경되지 않는 경우, 기존 위치에서 업데이트만 수행
          scheduleState.title = action.payload.title
          scheduleState.time = action.payload.time
          scheduleState.important = action.payload.important
        }
      }

    },
    scheduleDelete(state, action){
      state[action.payload.clickedDate].splice(action.payload.index, 1); //제거
    },
    scheduleComplete(state, action){
      const scheduleState = state[action.payload.clickedDate][action.payload.index]
      
      scheduleState.complete = action.payload.package
      scheduleState.important = false 

    },
  }
})


//add modal handler
const addShow = createSlice({
  name : "addShow",
  initialState : {show: false},
  reducers:{
    addHandleClose(state, action){
      state.show = false;
    },
    addHandleShow(state, action){
      state.show = true;
    }
  }
})

const friendList = createSlice({
  name : "friendsList",
  initialState : {
    "userList" : [
      {userName : "홍일동", userEmail : "example1@email.com"},
      {userName : "홍이동", userEmail : "example2@email.com"},
      {userName : "홍삼동", userEmail : "example3@email.com"},

    ],
    "userRequest":[
      {userName : "홍사동", userEmail : "example4@email.com"},
      {userName : "홍오동", userEmail : "example5@email.com"},
      {userName : "홍육동", userEmail : "example6@email.com"},
      {userName : "홍칠동", userEmail : "example7@email.com"},
      {userName : "홍팔동", userEmail : "example8@email.com"},
    ]
  },
  reducers: {
    friendDelete(state, action){/*payload ---> list: userlist or userRequest, index: there index*/
      state[action.payload.list].splice(action.payload.index, 1); //제거
    },
    friendRefuse(state, action){

    },
    friendAccept(state, action){

    },
  
  }
})

export const {addHandleClose, addHandleShow} = addShow.actions
export const {scheduleInit, scheduleComplete, scheduleStateEdit, scheduleStateAdd, scheduleDelete} = dateSchedule.actions
export const {selectPetId, selectPetName} = petSelected.actions
export const {friendDelete, friendRefuse, friendAccept } = friendList.actions
//함수또한 내보내야 요청가능

export default configureStore({// 내보낼 state, 작성 문법은 아래와 같음
  reducer: { 
    petImages : petImages.reducer,
    petName : petName.reducer,
    petId : petId.reducer,
    petInpo : petInpo.reducer,
    petSelected : petSelected.reducer,
    dateSchedule :dateSchedule.reducer,
    addShow : addShow.reducer,
    friendList : friendList.reducer,
    
  }
}) 