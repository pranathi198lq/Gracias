export const LoginStart= (userCreds)=>({ //user credentials are taken as input 
    type:"LOGIN_START",
});
export const LoginSuccess= (user)=>({
    type:"LOGIN_SUCCESS",
    payload: user, //returns the user details upon success, we can write anything instead of payload
});
export const LoginFail= ()=>({
    type:"LOGIN_FAIL",
    payload: error
});

export const Logout=()=>({
    type: "LOGOUT",
});

export const Follow=(userId)=>({
    type: "FOLLOW",
    payload: userId,
});
export const Unfollow=(userId)=>({
    type: "UNFOLLOW",
    payload: userId,
});