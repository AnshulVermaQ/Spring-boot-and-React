package in.anshul.billingSoftware.controller;


import in.anshul.billingSoftware.io.AuthRequest;
import in.anshul.billingSoftware.io.AuthResponse;
import in.anshul.billingSoftware.service.UserService;
import in.anshul.billingSoftware.service.implementation.AppUserDetailsService;
import in.anshul.billingSoftware.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private final PasswordEncoder passwordEncoder;

    private final JwtUtils jwtUtils;

    public AuthController(PasswordEncoder passwordEncoder, JwtUtils jwtUtils, AuthenticationManager authenticationManager, AppUserDetailsService appUserDetailsService) {
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.appUserDetailsService = appUserDetailsService;
    }

    @Autowired
    private UserService userService;

    private final AuthenticationManager authenticationManager;

    private final AppUserDetailsService appUserDetailsService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) throws Exception {
        authenticate(request.getEmail(),request.getPassword());
        final UserDetails userDetails = appUserDetailsService.loadUserByUsername(request.getEmail());

        final String jwtToken = jwtUtils.generateToken(userDetails);

        String role = userService.getUserRole(request.getEmail());

        return new AuthResponse(request.getEmail(),role,jwtToken);

    }

    private void authenticate(String email,String password) throws Exception {

        try{

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));

        }catch (DisabledException e){

            throw new Exception("User disabled");

        }catch(BadCredentialsException e){

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Email or password is incorrect");
        }
    }

    @PostMapping("/encode")
    public String encodePassword(@RequestBody Map<String,String> req){
        return passwordEncoder.encode(req.get("password"));
    }
}
