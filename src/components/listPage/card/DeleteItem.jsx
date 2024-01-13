import { Button, Popover } from "@mui/material";
import { useState } from "react";
import { DeleteCheckItemEP } from "../../Api";

function DeleteItem({ checkItemsId, checkListId, dispatch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const DeleteCheckItem = async() => {
    await DeleteCheckItemEP(checkListId, checkItemsId);
    dispatch({
      type : "deleteItem",
      payload : checkItemsId
    })

  };
  return (
    <div>
      <Button onClick={handleClick}>...</Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Button onClick={DeleteCheckItem} color="warning">
          Delete
        </Button>
      </Popover>
    </div>
  );
}

export default DeleteItem;
