import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { addItem } from "../../Services/ItemService";

const ItemForm = () => {
  const { categories, itemData, setItemData } = useContext(AppContext);

  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (!image) {
    toast.error("Please upload an image");
    setLoading(false);
    return;
  }

  const item = {
    name: data.name,
    categoryId: data.categoryId,
    price: data.price,
    description: data.description
  };

  const formData = new FormData();
  formData.append("item", JSON.stringify(item)); 
  formData.append("file", image);

  try {
    const response = await addItem(formData);

    if (response.status === 201) { 
      toast.success("Item added successfully");
      setItemData([...itemData, response.data]);
      setData({ itemName: "", categoryId: "", price: "", description: "" });
    }
  } catch (error) {
    console.error(error);
    toast.error("Error uploading item");
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      className="item-form-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-8 form-container">
            <div className="card-body">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    <img
                      src={image ? URL.createObjectURL(image) : assets.upload}
                      alt=""
                      width={48}
                    />
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    id="image"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    onChange={onChangeHandler}
                    value={data.name}
                    placeholder="Item Name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="categoryId"
                    onChange={onChangeHandler}
                    value={data.categoryId}
                  >
                    <option value="">--SELECT CATEGORY--</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.categoryId}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    id="price"
                    onChange={onChangeHandler}
                    value={data.price}
                    placeholder="&#8377;200.00"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={5}
                    className="form-control"
                    id="description"
                    onChange={onChangeHandler}
                    value={data.description}
                    placeholder="Write Content here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
