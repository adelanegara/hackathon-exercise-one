const initialState = {
    isLogin: false,
    userData: null,
    account: [
      {
        username: "adele",
        password: "la123",
        role: "owner",
      },
      {
        username: "banban",
        password: "ban123",
        role: "user",
      },
    ],
    slot: [
      {
        location: "B5",
        startDate: "2022-06-27",
        endDate: "2022-06-27",
        startBooking: null,
        endBooking: null,
        isBooking: null,
        status: "available",
        id: 1,
      },
      {
        location: "B8",
        startDate: "2022-06-28",
        endDate: "2022-07-08",
        startBooking: null,
        endBooking: null,
        isBooking: null,
        status: "available",
        id: 2,
      },
      {
        location: "D2",
        startDate: "2022-06-28",
        endDate: "2022-07-15",
        startBooking: null,
        endBooking: null,
        isBooking: null,
        status: "available",
        id: 3,
      },
      {
        location: "D5",
        startDate: "2022-06-29",
        endDate: "2022-07-13",
        startBooking: null,
        endBooking: null,
        isBooking: null,
        status: "unavailable",
        id: 4,
      },
      {
        location: "D8",
        startDate: "2022-06-29",
        endDate: "2022-07-04",
        startBooking: null,
        endBooking: null,
        isBooking: null,
        status: "available",
        id: 5,
      },
      {
        location: "D9",
        startDate: "2022-06-29",
        endDate: "2022-07-21",
        startBooking: null,
        endBooking: null,
        isBooking: null,
        status: "available",
        id: 6,
      },
      {
        location: "F1",
        startDate: "2022-06-29",
        endDate: "2022-07-08",
        startBooking: null,
        endBooking: null,
        isBooking: null,
        status: "available",
        id: 7,
      },
      {
        location: "F4",
        startDate: "2022-06-26",
        endDate: "2022-07-14",
        startBooking: null,
        endBooking: null,
        isBooking: null,
        status: "available",
        id: 8,
      },
      {
        location: "G6",
        startDate: "2022-06-27",
        endDate: "2022-06-28",
        startBooking: null,
        endBooking: null,
        isBooking: null,
        status: "available",
        id: 9,
      },
      {
        location: "H4",
        startDate: "2022-06-27",
        endDate: "2022-06-28",
        startBooking: null,
        endBooking: null,
        isBooking: null,
        status: "available",
        id: 10,
      },
    ],
    request: null,
  };

  export const whitelist = [ "isLogin", "userData", "account"];

   
export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
          return {
            ...state,
            isLogin: true,
          };
        case "LOGOUT":
          return {
            ...state,
            isLogin: false,
          };
        case "SET_USER_DATA":
          return {
            ...state,
            userData: action.payload,
          };
        default:
          return state;
      }
}
