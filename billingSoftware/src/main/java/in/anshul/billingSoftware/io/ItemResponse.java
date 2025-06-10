package in.anshul.billingSoftware.io;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class ItemResponse {

    public ItemResponse(String itemId, String name, BigDecimal price, String categoryId, String description) {
        this.itemId = itemId;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.description = description;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private String itemId;

    public ItemResponse(Timestamp updatedAt, Timestamp createdAt, String imageUrl, String categoryName) {
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.imageUrl = imageUrl;
        this.categoryName = categoryName;
    }

    private String name;
    private BigDecimal price;

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    private String categoryId;

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    private String description;
    private String categoryName;
    private String imageUrl;
    private Timestamp createdAt;
    private Timestamp updatedAt;

}
