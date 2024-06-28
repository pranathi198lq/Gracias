import axios from "axios"

export const loginCall = async(userCreds, dispatch)=>{
    dispatch({type: "LOGIN_START"});
    try{
        const res= await axios.post("auth/login", userCreds);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data}); //res includes user, status, timestamp etc we only want the user
    }catch(err){
        dispatch({type: "LOGIN_FAIL", payload: err});
    }
}