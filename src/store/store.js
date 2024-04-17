import { configureStore, createSlice } from '@reduxjs/toolkit'
/*
json object 만들 때 처음부터 2중으로 설계하는 것도 좋아보임
dateSchedule을 년도->월->일 순으로 접근하게 구조를 변경하려했다가
고칠게 너무 많아서 포기하게 됨
*/
const userPetData = createSlice({
  name: "userPetData",
  initialState:{
    "data": [
      {
        "idx": 1,
        "userId": {
            "email": "testman@gmail.com",
            "password": "$2a$10$MReG7/DP36f7ZFPxMNKEYu6lwjsBA./rrNq3OExhIqfftsUNTnq3K",
            "nickname": "seophohoho",
            "todolistFailureCount": 0
        },
        "petId": {
            "petId": 0,
            "species": "펫_1"
        },
        "natureId": {
            "natureId": 0,
            "name": "장난꾸러기"
        },
        "petName": "꼬부기",
        "maxFriendship": 22616,
        "currentFriendship": 0,
        "runWayCount": 0
      },
      {
        "idx": 2,
        "userId": {
            "email": "testman@gmail.com",
            "password": "$2a$10$MReG7/DP36f7ZFPxMNKEYu6lwjsBA./rrNq3OExhIqfftsUNTnq3K",
            "nickname": "seophohoho",
            "todolistFailureCount": 0
        },
        "petId": {
            "petId": 0,
            "species": "펫_1"
        },
        "natureId": {
            "natureId": 1,
            "name": "활발한"
        },
        "petName": "꼬부기",
        "maxFriendship": 15624,
        "currentFriendship": 0,
        "runWayCount": 0
      },
    ]
  },
  reducers:{
    petdexInit(state, action){
      return action.payload
    }
  }
})

/*아래 분리된 펫 정보 병합 필요!*/
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

//전체 일정 데이터
const dateSchedule = createSlice({
  name : "dateSchedule",
  initialState : {/*"2024-04-16":[{title:"테스트",time:"20:00",important: true,complete:false}]*/},
  reducers:{
    scheduleInit(state, action){//state 초기화
      return action.payload
    },
    scheduleStateAdd(state, action){
      const scheduleState = { 
        title : action.payload.title,
        time: action.payload.time,
        important: action.payload.important, 
        complete : false,
        idx : action.payload.idx
      }

      // 같은 날짜에 important가 true인 일정의 개수를 계산.
      const clickedDate = action.payload.clickedDate;
      const importantCount = state[clickedDate] ? state[clickedDate].filter(item => item.important).length : 0;
      
      //중요표시는 3개까지, 일정은 1글자 이상 입력 require 제어
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
        // 이미 해당 날짜에 일정이 있다면, 새로운 일정을 해당 배열에 추가.
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
    scheduleStateEdit(state, action) {
      const { clickedDate, editDate, title, time, important, index } = action.payload;
      const schedule = state[clickedDate][index];
      const targetDate = editDate === "" ? clickedDate : editDate;
    
      if (title.length === 0) {
        alert("일정을 입력해 주세요!");
        return;
      }
    
      const importantCount = state[targetDate]?.filter((item, idx) => idx !== index && item.important).length || 0;
      if (importantCount >= 3 && important) {
        alert("중요 표시는 3개를 초과하여 등록할 수 없습니다!");
        return;
      }
    
      // 원본 일정을 제거
      if (clickedDate === targetDate) {
        state[clickedDate].splice(index, 1);
        //일정에 있는 기본 정보 + 변경된 값이 들어간 복사본 생성 
        const newScheduleState = { ...schedule, title, time, important, complete: false };
    
        // 중요 여부에 따라 일정 추가 방식 
        if (important) {
          state[targetDate].unshift(newScheduleState);
        } else {
          state[targetDate].push(newScheduleState);
        }
      } else {
        // 대상 날짜가 다른 경우, 먼저 기존 일정을 삭제하고 변경된 새 일정을 추가
        state[clickedDate].splice(index, 1);
        const newScheduleState = { ...schedule, title, time, important, complete: false };
        state[targetDate] = state[targetDate] || [];
        
        if (important) {
          state[targetDate].unshift(newScheduleState);
        } else {
          state[targetDate].push(newScheduleState);
        }
      }
    },    
    scheduleDelete(state, action){
      state[action.payload.clickedDate].splice(action.payload.index, 1); //제거
    },
    scheduleComplete(state, action){
      const scheduleState = state[action.payload.clickedDate][action.payload.index]
      
      scheduleState.complete = action.payload.package
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
      state[action.payload.list].splice(action.payload.index, 1); //제거
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