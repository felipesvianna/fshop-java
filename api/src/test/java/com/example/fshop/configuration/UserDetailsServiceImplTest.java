package com.example.fshop.configuration;

import com.example.fshop.models.ERoles;
import com.example.fshop.models.Role;
import com.example.fshop.models.User;
import com.example.fshop.repository.UserRepository;
import com.example.fshop.security.service.UserDetailsImpl;
import com.example.fshop.security.service.UserDetailsServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class UserDetailsServiceImplTest {
    @MockBean
    UserRepository userRepository;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

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

    @Test
    void shouldFindUserByEmail() {
        UserDetails expectedUser = UserDetailsImpl.build(userInstance);

        when(userRepository.findUserByEmail("asouza@email.com")).thenReturn(Optional.of(userInstance));

        UserDetails userDetails = userDetailsService.loadUserByUsername("asouza@email.com");

        assertThat(userDetails).isEqualTo(expectedUser);
    }

    @Test
    void shouldThrownAnExceptionWhenDoNotFindUserByEmail() {
        when(userRepository.findUserByEmail("asouza@email.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userDetailsService.loadUserByUsername("asouza@email.com"))
                .isInstanceOf(UsernameNotFoundException.class);
    }
}