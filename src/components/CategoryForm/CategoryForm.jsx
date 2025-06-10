import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { addCategory } from "../../services/CategoryService";
import { AppContext } from "../../context/AppContext";

const CategoryForm = () => {
  const [loading, setLoading] = useState(false);
  const { categories, setCategories } = useContext(AppContext);
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    bgColor: "#2c2c2c",
  });

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
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

  const formData = new FormData();
  formData.append("category", new Blob([JSON.stringify(data)], { type: "application/json" }));
  formData.append("file", image);                    

  try {
    const response = await addCategory(formData);

    if (response.status === 201) {
      setCategories([...categories, response.data]);
      toast.success("Category added successfully");

      setData({
        name: "",
        description: "",
        bgColor: "#2c2c2c",
      });
      setImage(false);
    } else {
      toast.error("Failed to add category");
    }
  } catch (error) {
    console.error("Error uploading category:", error);
    toast.error("Error uploading category");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-12 form-container">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3" style={{ cursor: "pointer" }}>
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
                  onChange={(e) => setImage(e.target.files[0])}
                  id="image"
                  hidden
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                  className="form-control"
                  id="name"
                  placeholder="Category Name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={5}
                  onChange={onChangeHandler}
                  value={data.description}
                  className="form-control"
                  id="description"
                  placeholder="Write Content here..."
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="bgColor" className="form-label">
                  Background color
                </label>
                <br />
                <input
                  name="bgColor"
                  type="color"
                  id="bgColor"
                  onChange={onChangeHandler}
                  value={data.bgColor}
                  placeholder="#ffffff"
                />
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
