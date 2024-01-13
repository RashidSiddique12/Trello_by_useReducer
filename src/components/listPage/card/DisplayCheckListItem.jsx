import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import DeleteItem from "./DeleteItem";
import AddItem from "./AddItem";
import { DisplayCheckListItemEP, handleCheckBoxEP } from "../../Api";
import { BorderLinearProgress } from "./ProgressLine";

const checkListItemReducer = (state, action) => {
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

function DisplayCheckListItem({ id, cardId }) {
  const [checkItems, dispatch] = useReducer(checkListItemReducer, []);
  const [progress, setProgress] = useState(0);

  const fetchData = async () => {
    const itemData = await DisplayCheckListItemEP(id);
    dispatch({
      type: "displayCheckListItem",
      payload: itemData,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const checkedNo = checkItems.filter((item) => item.state === "complete");
    setProgress(((checkedNo.length / checkItems.length) * 100).toFixed(2));
  }, [checkItems]);

  const handleCheckBox = async (checkItemId, state) => {
    const checkItemstate = state === "complete" ? "incomplete" : "complete";
    await handleCheckBoxEP(cardId, checkItemId, checkItemstate);
    dispatch({
      type : "handleCheckBox",
      payload: {checkItemId: checkItemId,checkItemstate:checkItemstate }
    })
  };

  return (
    <div>
      <div className="progress">
        <p>{progress === "NaN" ? 0 : progress}%</p>
        <BorderLinearProgress
          sx={{ margin: "1rem" }}
          variant="determinate"
          value={progress}
        />
      </div>
      {checkItems.map((item) => (
        <div key={item.id} className="checkListItem">
          <FormGroup sx={{ display: "flex" }}>
            <FormControlLabel
              onClick={() => handleCheckBox(item.id, item.state)}
              control={
                <Checkbox checked={item.state === "complete" ? true : false} />
              }
              label={item.name}
            />
          </FormGroup>
          <DeleteItem
            checkItemsId={item.id}
            checkListId={id}
            dispatch={dispatch}
          />
        </div>
      ))}
      <AddItem checkListId={id} dispatch={dispatch} />
    </div>
  );
}
export default DisplayCheckListItem;
