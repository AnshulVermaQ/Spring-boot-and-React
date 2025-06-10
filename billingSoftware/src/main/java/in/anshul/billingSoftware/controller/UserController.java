package in.anshul.billingSoftware.controller;

import in.anshul.billingSoftware.io.UserRequest;
import in.anshul.billingSoftware.io.UserResponse;
import in.anshul.billingSoftware.service.UserService;
import jakarta.persistence.GeneratedValue;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }



    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse registerUser(@RequestBody UserRequest request){

        try{

            return userService.createUser(request);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Unable to create user");
        }
    }

    @GetMapping
    public List<UserResponse> readUsers(){
        return userService.readUsers();
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id){

        try{

            userService.deleteUser(id);

        }
        catch (Exception e){

            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"User not found");
        }
    }



}
