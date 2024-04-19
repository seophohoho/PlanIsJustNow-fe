import { configureStore, createSlice } from '@reduxjs/toolkit'
/*
json object 만들 때 처음부터 2중으로 설계하는 것도 좋아보임
dateSchedule을 년도->월->일 순으로 접근하게 구조를 변경하려했다가
고칠게 너무 많아서 포기하게 됨

redux는 그냥 상태관리 도구다. 컴포넌트 재사용 목적으로 props를 안쓴다?
가능은 하지만 너무 맹목적이다. props와 같이 유연하게 쓰는 것이 더 올바르다.
redux의 본질을 잊지 말자 -> 너무 아토믹하게 하면 뭐가뭔지 모르게 된다. 조심

3항 연산자는 컴퓨터도 ㅈㄴ 싫어한다.
퍼포먼스를 위해 앵간하면 줄여보자
*/
const userPetData = createSlice({
  name: "userPetData",
  initialState:{
    "data": [
      {
        "idx": 1,
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
    ],
    "userId": {
      "email": "testman@gmail.com",
      "nickname": "seophohoho",
      "todolistFailureCount": 0
    }
  },
  reducers:{
    petdexInit(state, action){
      return action.payload
    }
  }
})

const petList = createSlice({
  name : 'petImages',
  initialState : {
    "data": [
      {
          "idx": 0,
          "info": "커여운 커비좀 보세요.",
          "path": "/thumbnail.png",
          "species": "커비"
      },
      {
          "idx": 1,
          "info": "테스트2",
          "path": "/thumbnail.png",
          "species": "하하하하하"
      }
      ,
      {
          "idx": 2,
          "info": "테스트3",
          "path": "/thumbnail.png",
          "species": "피카"
      },
      {
          "idx": 3,
          "info": "테스트4",
          "path": "/thumbnail.png",
          "species": "꼬부기"
      },
      {
          "idx": 4,
          "info": "테스트5",
          "path": "/thumbnail.png",
          "species": "????"
      }
    ]
  },
  reducer:{
    petListInit(state, action){
      return action.payload
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

export const {petListInit} = petList.actions
export const {addHandleClose, addHandleShow} = addShow.actions
export const {scheduleInit, scheduleComplete, scheduleStateEdit, scheduleStateAdd, scheduleDelete} = dateSchedule.actions
export const {friendDelete, friendRefuse, friendAccept } = friendList.actions
//함수또한 내보내야 요청가능

export default configureStore({// 내보낼 state, 작성 문법은 아래와 같음
  reducer: { 
    dateSchedule :dateSchedule.reducer,
    addShow : addShow.reducer,
    friendList : friendList.reducer,
    petList : petList.reducer,
    userPetData : userPetData.reducer,
    
  }
}) 