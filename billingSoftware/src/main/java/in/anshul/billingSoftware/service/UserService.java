package in.anshul.billingSoftware.service;

import in.anshul.billingSoftware.io.UserRequest;
import in.anshul.billingSoftware.io.UserResponse;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserService {

    UserResponse createUser(UserRequest request);
    String getUserRole(String email);
    List<UserResponse> readUsers();
    void deleteUser(String id);
}
