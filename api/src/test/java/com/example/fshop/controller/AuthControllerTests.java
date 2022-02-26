package com.example.fshop.controller;

import com.example.fshop.models.ERoles;
import com.example.fshop.models.Role;
import com.example.fshop.models.User;
import com.example.fshop.payload.ErrorResponse;
import com.example.fshop.repository.RoleRepository;
import com.example.fshop.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    UserRepository userRepository;
    @MockBean
    RoleRepository roleRepository;

    private User userInstance;

    @BeforeEach
    void setUp() {
        Set<Role> authorities = new HashSet<>();
        authorities.add(new Role(ERoles.ROLE_CLIENT));
        userInstance = new User(
                "asouza@email.com",
                "Airton",
                "Souza",
                "Rua das Laranjeiras 12",
                "asouza@email.com",
                "senhasenha");
        userInstance.setId("1");
        userInstance.setRoles(authorities);
    }

    private final String contentData = "{"
            + "\"firstName\": \"Airton\","
            + "\"lastName\" : \"Santos\","
            + "\"email\": \"asouza@email.com\","
            + "\"address\":\"Rua das Laranjeiras 12\","
            + "\"password\":\"senhasenha\","
            + "\"roles\": ["
            + "\"CLIENT\""
            + "]"
            + "}";

    @Test
    void shouldRegisterNewUserWithValidData() throws Exception{
        Role role = new Role(ERoles.ROLE_CLIENT);

        when(roleRepository.findByName(ERoles.ROLE_CLIENT)).thenReturn(Optional.of(role));
        when(userRepository.save(userInstance)).thenReturn(userInstance);

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(contentData))
                .andExpect(status().isCreated());

        ArgumentCaptor<User> argumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(argumentCaptor.capture());

        User createdUser = argumentCaptor.getValue();
        assertEquals(createdUser.getEmail(), "asouza@email.com");
    }

    @Test
    void shouldReturnResponseError409WhenEmailAlreadyExists() throws Exception{
        String userEmail = userInstance.getEmail();
        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(), "Email already exists");

        when(userRepository.existsByEmail(userEmail)).thenReturn(true);

        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isConflict())
                .andExpect(content().string(objectMapper.writeValueAsString(expectedContent)));

        verify(userRepository, times(0)).save(userInstance);
    }

    @Test
    void shouldReturnResponseError500WhenUserRoleDoNotExists() throws Exception{
        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(), "Role not found");

        when(userRepository.existsByEmail(userInstance.getEmail())).thenReturn(false);
        when(roleRepository.findByName(ERoles.ROLE_CLIENT)).thenReturn(Optional.empty());

        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string(objectMapper.writeValueAsString(expectedContent)));

        verify(userRepository, times(0)).save(userInstance);
    }
}
