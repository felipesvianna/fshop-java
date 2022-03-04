package com.example.fshop.controller;

import com.example.fshop.models.ERoles;
import com.example.fshop.models.Role;
import com.example.fshop.models.User;
import com.example.fshop.payload.ErrorResponse;
import com.example.fshop.payload.JwtResponse;
import com.example.fshop.payload.LoginRequest;
import com.example.fshop.payload.SignupRequest;
import com.example.fshop.repository.RoleRepository;
import com.example.fshop.security.service.UserDetailsImpl;
import com.example.fshop.service.UserService;
import com.example.fshop.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    UserService userService;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    // Signout endpoint is setted on WebSecurityConfig

    @PostMapping("/signin")
    public ResponseEntity<Object> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody SignupRequest signupRequest) {

        if(userService.emailAlreadyExists(signupRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse(HttpStatus.CONFLICT.value(),
                            HttpStatus.CONFLICT.getReasonPhrase(), "Email already exists"));
        }

        User newUser = new User(
                signupRequest.getUsername(),
                signupRequest.getFirstName(),
                signupRequest.getLastName(),
                signupRequest.getAddress(),
                signupRequest.getEmail(),
                passwordEncoder.encode(signupRequest.getPassword()));

        Set<Role> roles = new HashSet<>();
        Set<String> rolesList = signupRequest.getRoles();

        rolesList.forEach(role -> {
            switch (role) {
                case "ADMIN":
                    Role adminRole = roleRepository.findByName(ERoles.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Role not found"));
                    roles.add(adminRole);
                case "CLIENT":
                    Role clientRole = roleRepository.findByName(ERoles.ROLE_CLIENT)
                            .orElseThrow(() -> new RuntimeException("Role not found"));
                    roles.add(clientRole);
            }
        });

        newUser.setRoles(roles);
        userService.registerNewUser(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

}
