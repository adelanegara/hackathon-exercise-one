const initialState = {
    isLogin: false,
    userData: null,
    account: [
        {
            username: "adele",
            password: "la123",
            role: "owner"
          },
          {
            username: "banban",
            password: "ban123",
            role: "user",
          }
    ],
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
