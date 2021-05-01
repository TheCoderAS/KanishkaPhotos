const dishes= (dishes=[],action)=>{
    switch(action.type){
        case 'GET_DISHES':
            return action.payload
        case 'ADD_DISH':
            return [...dishes, action.payload]
        case 'ADD_COMMENT':
            return [...dishes, action.payload]
        case 'ADD_DISH_FAILED':
            alert(action.payload,'Please Login to add dishes!!')
            return dishes
        case 'ADD_COMMENT_FAILED':
            alert(action.payload,'Please Login to add or edit comments!!')
            return dishes
        default:
            return dishes;
    }
};
export default dishes;