const user= (user=[],action)=>{
    switch(action.type){
        case 'LOGIN':
            return action.payload
        case 'SIGNUP':
            return action.payload
        case 'LOGOUT':
            return action.payload
        default:
            return user;
    }
};
export default user;