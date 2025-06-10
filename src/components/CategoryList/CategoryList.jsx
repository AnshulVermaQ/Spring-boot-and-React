import React, { useContext, useState } from "react";
import "./CategoryList.css";
import { AppContext } from "../../context/AppContext";
import { deleteCategory } from "../../services/CategoryService";
import toast from "react-hot-toast";

const CategoryList = () => {
  const { categories ,setCategories} = useContext(AppContext);
  console.log(categories);

  const [searchTerm, setSearchTerm ] = useState("");

  const filteredCategories = (categories || []).filter((category) =>
  category && category.name && category.name.toLowerCase().includes(searchTerm.toLowerCase())
);


  const deleteCategoryById = async (categoryId) => {

    try{

      const response = await deleteCategory(categoryId);
      if (response.status === 200) {

        const updatedCategories =  categories.filter((category) => category.categoryId !== categoryId);
        setCategories(updatedCategories);
        toast.success("Category deleted");
        
      }else{
        console.error("Failed to delete category");
        toast.error("Failed to delete category");
      }

    }catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category");
    }
  }


  return (
    <div>
      <div
        className="category-list-container"
        style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
      >
        <div className="row pe-2">
          <div className="input-group mb-3">
            <input
              type="text"
              name="keyword"
              id="keyword"
              placeholder="Search By Keyword"
              className="form-control"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <span className="input-group-text bg-warning">
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>

        <div className="row g-3 pe-3">
          {filteredCategories.map((category, index) => (
            <div key={index} className="col-12">
              <div
                className="card p-3"
                style={{ backgroundColor: category.bgColor }}
              >
                <div className="d-flex align-items-center">
                  <div style={{ marginRight: "15px" }}>
                    <img
                      src={category.imageUrl}
                      alt="category"
                      className="category-image"
                    />
                  </div>

                  <div className="flex-grow-1">
                    <h5 className="mb-1 text-white"> {category.name} </h5>
                    <p className="mb-0 text-white">{category.items} Items</p>
                  </div>

                  <div>
                    <button className="btn btn-danger btn-sm" 
                    onClick={() => deleteCategoryById(category.categoryId)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
