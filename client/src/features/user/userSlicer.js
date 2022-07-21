const initialState = { status: "idle", errors: [], searchedUsers: [] };

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case "login":
      //   console.log(action.payload);
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    case "search":
      return { ...state, searchedUsers: action.payload };

    default:
      return state;
  }
}
