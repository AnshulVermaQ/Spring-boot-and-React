package in.anshul.billingSoftware.service.implementation;

import in.anshul.billingSoftware.entity.UserEntity;
import in.anshul.billingSoftware.io.UserRequest;
import in.anshul.billingSoftware.io.UserResponse;
import in.anshul.billingSoftware.repository.UserRepository;
import in.anshul.billingSoftware.service.UserService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponse createUser(UserRequest request) {

        UserEntity newUser = convertToEntity(request);
        newUser = userRepository.save(newUser);
        return convertToResponse(newUser);

    }

    private UserEntity convertToEntity(UserRequest request) {
        UserEntity entity = new UserEntity();
        entity.setUserId(UUID.randomUUID().toString());
        entity.setEmail(request.getEmail());
        entity.setName(request.getName());
        entity.setPassword(request.getPassword());
        entity.setRole(request.getRole());
        return entity;
    }

    private UserResponse convertToResponse(UserEntity entity) {
        UserResponse response = new UserResponse(entity.getUserId());
        response.setEmail(entity.getEmail());
        response.setName(entity.getName());
        response.setPassword(entity.getPassword());
        response.setRole(entity.getRole());
        response.setCreatedAt(entity.getCreatedAt());
        response.setUpdatedAt(entity.getUpdatedAt());
        return response;
    }

    @Override
    public String getUserRole(String email) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow();
        return existingUser.getRole();

    }

    @Override
    public List<UserResponse> readUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> convertToResponse(user))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {

       UserEntity existingUser = userRepository.findByUserId(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        userRepository.delete(existingUser);
    }
}
