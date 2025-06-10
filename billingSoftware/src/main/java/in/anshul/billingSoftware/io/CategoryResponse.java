package in.anshul.billingSoftware.io;

import java.sql.Timestamp;

public class CategoryResponse {
    private String categoryId;
    private String name;
    private String description;

    public CategoryResponse(String categoryId, String name, String bgColor, String description, String imageUrl, Timestamp createdAt, Timestamp updatedAt) {
        this.categoryId = categoryId;
        this.name = name;
        this.bgColor = bgColor;
        this.description = description;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    private String bgColor;

    public CategoryResponse(String categoryId) {
        this.categoryId = categoryId;
    }

    public CategoryResponse() {

    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBgColor() {
        return bgColor;
    }

    public void setBgColor(String bgColor) {
        this.bgColor = bgColor;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    private String imageUrl;
    private Timestamp createdAt;

    public Integer getItems() {
        return items;
    }

    public void setItems(Integer items) {
        this.items = items;
    }

    private Timestamp updatedAt;

    public CategoryResponse(Integer items) {
        this.items = items;
    }

    private Integer items;

    public void setId(Long id) {
    }
}
