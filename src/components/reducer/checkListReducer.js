export const checkListReducer = (state, action)=>{
    switch(action.type){
        case "displayCheckList":
            return action.payload
  
        case "addNewCheckList":
          return [...state, action.payload]
        
        case "deleteCheckList":
          return state.filter((st)=>st.id !== action.payload)
        default : 
        return state
    }
  }

