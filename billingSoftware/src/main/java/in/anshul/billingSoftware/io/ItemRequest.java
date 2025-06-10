package in.anshul.billingSoftware.io;

import java.math.BigDecimal;

public class ItemRequest {

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ItemRequest() {
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

    public ItemRequest(String name, BigDecimal price, String categoryId, String description) {
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.description = description;
    }

    private String name;
    private BigDecimal price;
    private String categoryId;
    private String description;


    public String getItemId() {
        return "id";
    }
}
