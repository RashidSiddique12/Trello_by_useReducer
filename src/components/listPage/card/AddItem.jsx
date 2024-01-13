import { Button, Card, CardContent } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { handleAddItemEP } from "../../Api";



function AddItem({ checkListId,dispatch }) {
  const [add, setAdd] = useState(false);
  const [newAddItem, setNewAddItem] = useState();

  // console.log("tttttttt", checkListId);

  const handleAddItem = async(e) => {
    e.preventDefault();
    if (newAddItem !== "") {
      const newItem = await handleAddItemEP(checkListId, newAddItem);
      dispatch({
        type: "addNewItem",
        payload : newItem
      })

      setNewAddItem("");
    }
  };

  return add ? (
    <Card className="addCard">
      <CardContent>
        <form onSubmit={handleAddItem} className="Cardform">
          <input
            type="text"
            placeholder="Enter the title of a card"
            value={newAddItem}
            onChange={(e) => setNewAddItem(e.target.value)}
          />
          <br />
          <br />
          <div className="CardFormBottom">
            <Button type="submit" variant="contained" size="small">
              Add Item
            </Button>
            <CloseIcon onClick={() => setAdd(false)} />
          </div>
        </form>
      </CardContent>
    </Card>
  ) : (
    <div>
      <Button variant="contained" onClick={() => setAdd(true)}>
        Add Item
      </Button>
    </div>
  );
}

export default AddItem;
