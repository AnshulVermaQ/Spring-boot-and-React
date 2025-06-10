import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { deleteItem } from "../../Services/ItemService";


const ItemList = () => {
  const { itemData, setItemData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = (itemData || []).filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteItemById = async (itemId) => {
    try {
      const response = await deleteItem(itemId);
      if (response.status === 200) {
        const updatedItems = itemData.filter((item) => item.itemId !== itemId);
        setItemData(updatedItems);
        toast.success("Item deleted");
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting item");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        color: "white",
        padding: "1rem",
      }}
    >
      <div className="input-group mb-3" style={{ maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Search items..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 ? (
        <p>No items found.</p>
      ) : (
        filteredItems.map((item) => (
          <div
            key={item.itemId}
            style={{
              backgroundColor: item.bgColor || "#222",
              marginBottom: "0.8rem",
              padding: "0.8rem",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontSize: "0.9rem",
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <div style={{ flexGrow: 1 }}>
              <h6 style={{ margin: "0 0 0.3rem 0" }}>{item.name}</h6>
              <p style={{ margin: "0 0 0.3rem 0", color: "#ccc", fontSize: "0.8rem" }}>
                {item.description || "No description"}
              </p>
              <span
                style={{
                  backgroundColor: "#ffc107",
                  color: "#000",
                  padding: "0.1rem 0.5rem",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                }}
              >
                {"\u20B9"}{item.price?.toFixed(2) || "0.00"}
              </span>
            </div>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteItemById(item.itemId)}
              style={{ minWidth: "36px", height: "36px", padding: 0 }}
              title="Delete Item"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ItemList;
