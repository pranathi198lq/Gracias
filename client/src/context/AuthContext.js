import {createContext, useEffect, useReducer} from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
    // user: {
    //     _id: "667d061fe376cd52dac16a8e",
    //     username: "James", 
    //     email: "james@gmail.com",
    //     profilePicture: "",
    //     coverPicture: "",
    //     isAdmin: false,
    //     followers: [],
    //     followings: [],
    // },
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider= ({children})=>{
    const[state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
      },[state.user])

    return(
        <AuthContext.Provider value={{user: state.user, isFetching: state.isFetching, error: state.error, dispatch,}}>
            {/* value above is shared to the children which is the app here as it is imported in index.js */}
            {children}
        </AuthContext.Provider>
    )
}

// export const SavedPostsContext = createContext();

// export const SavedPostsProvider = ({ children }) => {
//     const [savedPosts, setSavedPosts] = useState([]);

//     return (
//         <SavedPostsContext.Provider value={{ savedPosts, setSavedPosts }}>
//             {children}
//         </SavedPostsContext.Provider>
//     );
// };