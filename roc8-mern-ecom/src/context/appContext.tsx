import React, { createContext, useContext, useReducer } from "react";

const initialState: DataContextType = {
  loggedInUser: {
    id: 0,
    name: "",
    email: "",
    password: "",
    categoriesLiked: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  tempOtp: 0,
  tempUser: {
    name: "",
    email: "",
    password: "",
  },
};

type AppProviderType = {
  children: React.ReactNode;
};

type UserDetails = {
  id: number;
  name: string;
  email: string;
  password: string;
  categoriesLiked: string[];
  createdAt: Date;
  updatedAt: Date;
};

type TempUserDetails = {
  name: string;
  email: string;
  password: string;
};

type DataContextType = {
  loggedInUser: UserDetails;
  tempOtp: number;
  tempUser: TempUserDetails;
};

// type DataContextProps = {
//   state: DataContextType;
//   dispatch: React.Dispatch<ActionKind>;
// };

export const DataContext = createContext<{
  state: DataContextType;
  dispatch: React.Dispatch<ActionKind>;
}>({
  state: initialState,
  dispatch: () => null,
});

type ActionType = "SET_OTP" | "SET_LOGIN";

type TempDetailsType = {
  otp: number;
  userDetails: TempUserDetails | UserDetails;
};

type LoginDetailsType = {
  user: UserDetails;
};

type ActionPayload = TempDetailsType | LoginDetailsType;

interface ActionKind {
  type: ActionType;
  payload: ActionPayload;
}

const reducerFunction = (
  state: DataContextType,
  action: ActionKind,
): DataContextType => {
  switch (action.type) {
    case "SET_OTP":
      if ("otp" in action.payload) {
        return {
          ...state,
          tempOtp: action.payload.otp,
          tempUser: action.payload.userDetails,
        };
      }

    case "SET_LOGIN":
      if ("user" in action.payload) {
        return {
          ...state,
          loggedInUser: action.payload.user,
        };
      }

    default:
      return state;
  }
};

export const AppProvider: React.FC<AppProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): {
  state: DataContextType;
  dispatch: React.Dispatch<ActionKind>;
} => {
  const contextValue = useContext(DataContext);
  if (contextValue === null) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return contextValue;
};
