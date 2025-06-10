package in.anshul.billingSoftware.io;

public class CategoryRequest {

    private String name;

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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CategoryRequest(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public CategoryRequest(String name, String description, String bgColor) {
        this.name = name;
        this.description = description;
        this.bgColor = bgColor;
    }
    public CategoryRequest() {}

    private String description;
    private String bgColor;
    private String imageUrl;

}
