package in.anshul.billingSoftware.io;

import java.sql.Timestamp;

public class UserResponse {

    private String name;
    private String email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public UserResponse(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public UserResponse(String email, String name, String password, Timestamp createdAt, String role, Timestamp updatedAt) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.createdAt = createdAt;
        this.role = role;
        this.updatedAt = updatedAt;
    }

    private String password;
    private String userId;
    private String role;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
