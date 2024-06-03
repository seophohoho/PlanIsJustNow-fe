import { configureStore, createSlice } from '@reduxjs/toolkit'
/*
json object 만들 때 처음부터 2중으로 설계하는 것도 좋아보임
dateSchedule을 년도->월->일 순으로 접근하게 구조를 변경하려했다가
고칠게 너무 많아서 포기하게 됨

redux는 그냥 상태관리 도구다. 컴포넌트 재사용 목적으로 props를 안쓴다?
가능은 하지만 너무 맹목적이다. props와 같이 유연하게 쓰는 것이 더 올바르다.
redux의 본질을 잊지 말자 -> 너무 아토믹하게 하면 뭐가뭔지 모르게 된다. 조심

3항 연산자는 컴퓨터도 싫어한다.
퍼포먼스를 위해 앵간하면 줄여보자
*/
const userData = createSlice({
  name: "userData",
  initialState: {
    profileUrl: undefined,
    nickname: "",
    userId: ""
  },
  reducers: {
    userDataInit(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

const userPetData = createSlice({
  name: "userPetData",
  initialState: {
    data: [
      { petId: {} },
      { petId: {} },
    ],
    userId: {}
  },
  reducers: {
    petdexInit(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

const petList = createSlice({
  name: 'petList',
  initialState: {
    data: [{}, {}]
  },
  reducers: {
    petListInit(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

// 전체 일정 데이터
const dateSchedule = createSlice({
  name: "dateSchedule",
  initialState: {},
  reducers: {
    scheduleInit(state, action) {
      return { ...state, ...action.payload };
    },
    scheduleStateAdd(state, action) {
      const scheduleState = {
        title: action.payload.title,
        time: action.payload.time,
        important: action.payload.important,
        complete: false,
        idx: action.payload.idx
      };

      const clickedDate = action.payload.clickedDate;
      if (!state[clickedDate]) {
        state[clickedDate] = [scheduleState];
      } else {
        if (scheduleState.important) {
          state[clickedDate].unshift(scheduleState);
        } else {
          state[clickedDate].push(scheduleState);
        }
      }
    },
    scheduleStateEdit(state, action) {
      const { clickedDate, editDate, title, time, important, index } = action.payload;
      const schedule = state[clickedDate][index];
      const targetDate = editDate === "" ? clickedDate : editDate;

      if (clickedDate === targetDate) {
        state[clickedDate].splice(index, 1);
        const newScheduleState = { ...schedule, title, time, important, complete: false };

        if (important) {
          state[targetDate].unshift(newScheduleState);
        } else {
          state[targetDate].push(newScheduleState);
        }
      } else {
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
    scheduleDelete(state, action) {
      state[action.payload.clickedDate].splice(action.payload.index, 1);
    },
    scheduleComplete(state, action) {
      const scheduleState = state[action.payload.clickedDate][action.payload.index];
      scheduleState.complete = action.payload.package;
    }
  }
});

// add modal handler
const addShow = createSlice({
  name: "addShow",
  initialState: { show: false },
  reducers: {
    addHandleClose(state) {
      state.show = false;
    },
    addHandleShow(state) {
      state.show = true;
    }
  }
});

const friendsRequest = createSlice({
  name: "friendsRequest",
  initialState: [],
  reducers: {
    initFriendRequest(state, action) {
      return [...action.payload];
    },
  }
});

const friendList = createSlice({
  name: "friendsList",
  initialState: [],
  reducers: {
    initFriendList(state, action) {
      return [...action.payload];
    },
    friendDelete(state, action) {
      state.splice(action.payload.index, 1);
    },
  }
});

const requestCount = createSlice({
  name: "requestCount",
  initialState: 0,
  reducers: {
    initCount(state, action) {
      return action.payload;
    },
    subCount(state) {
      return state - 1;
    }
  }
});

export const { userDataInit } = userData.actions;
export const { petdexInit } = userPetData.actions;
export const { petListInit } = petList.actions;
export const { addHandleClose, addHandleShow } = addShow.actions;
export const { scheduleInit, scheduleComplete, scheduleStateEdit, scheduleStateAdd, scheduleDelete } = dateSchedule.actions;
export const { friendDelete, initFriendList } = friendList.actions;
export const { initFriendRequest } = friendsRequest.actions;
export const { initCount, subCount } = requestCount.actions;

export default configureStore({
  reducer: {
    dateSchedule: dateSchedule.reducer,
    addShow: addShow.reducer,
    friendList: friendList.reducer,
    userPetData: userPetData.reducer,
    petList: petList.reducer,
    userData: userData.reducer,
    friendsRequest: friendsRequest.reducer,
    requestCount: requestCount.reducer,
  }
});
