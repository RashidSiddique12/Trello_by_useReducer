export const checkListItemReducer = (state, action) => {
    switch (action.type) {
      case "displayCheckListItem":
        return action.payload;
  
      case "addNewItem":
        return [...state, action.payload];
  
      case "deleteItem":
        return state.filter((st) => st.id !== action.payload);
      case "handleCheckBox":
        return state.map((st)=>{
          if(st.id === action.payload.checkItemId){
            return {...st, state : action.payload.checkItemstate}
          }else{
            return st
          }
        })
      default:
        return state;
    }
  };