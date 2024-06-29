const AuthReducer= (state, action)=>{
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                isFetching:true,
                error:false,
            };
        case "LOGIN_SUCCESS":
            return{
                user:action.payload,
                isFetching:false,
                error:false,
            };
        case "LOGIN_FAIL":
            return{
                user:null,
                isFetching:false,
                error:action.payload,
            };

        case "LOGOUT":
            return{
                // user:localStorage.setItem("user", null),
                user:null,
                isFetching: false,
                error: false
            };

        case "FOLLOW":
            return{
                ...state,
                user:{
                    ...state.user, //copies all the properties of the user from the authcontext
                    followings: [...state.user.followings, action.payload]
                }
            };
        case "UNFOLLOW":
            return{
                ...state,
                user:{
                    ...state.user, //copies all the properties of the user from the authcontext
                    followings: state.user.followings.filter((following)=>following !==action.payload) //if the following is not equal to userId in the payload then it is kept in the followings array, if it is equal then remove
                    
                }
            };
        default:
            return state;
    }
};
export default AuthReducer;
