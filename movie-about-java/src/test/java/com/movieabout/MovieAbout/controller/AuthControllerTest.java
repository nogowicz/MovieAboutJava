package com.movieabout.MovieAbout.controller;

import com.movieabout.MovieAbout.dto.LoginDto;
import com.movieabout.MovieAbout.dto.SignUpDto;
import com.movieabout.MovieAbout.model.Role;
import com.movieabout.MovieAbout.model.User;
import com.movieabout.MovieAbout.repository.RoleRepository;
import com.movieabout.MovieAbout.repository.UserRepository;
import com.movieabout.MovieAbout.security.JwtAuthenticationResponse;
import com.movieabout.MovieAbout.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class AuthControllerTest {

    @InjectMocks
    AuthController authController;

    @Mock
    AuthenticationManager authenticationManager;

    @Mock
    UserRepository userRepository;

    @Mock
    RoleRepository roleRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @Mock
    JwtTokenProvider tokenProvider;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void authenticateUserTest() {
        LoginDto loginDto = new LoginDto();
        loginDto.setUsernameOrEmail("test");
        loginDto.setPassword("password");

        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(), loginDto.getPassword()))).thenReturn(authentication);

        String jwt = "jwt";
        int expiryDate = 3600;
        when(tokenProvider.generateToken(authentication)).thenReturn(jwt);
        when(tokenProvider.getExpiryDate()).thenReturn(expiryDate);

        JwtAuthenticationResponse response = (JwtAuthenticationResponse) authController.authenticateUser(loginDto).getBody();

        assertEquals(jwt, response.getAccessToken());
        assertEquals(expiryDate, response.getExpiresIn());
    }

    @Test
    public void registerUserTest() {
        SignUpDto signUpDto = new SignUpDto();
        signUpDto.setUsername("test");
        signUpDto.setEmail("test@test.com");
        signUpDto.setPassword("password");

        when(userRepository.existsByUsername(signUpDto.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(signUpDto.getEmail())).thenReturn(false);

        User user = new User();
        user.setUsername(signUpDto.getUsername());
        user.setEmail(signUpDto.getEmail());
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));

        Role role = new Role();
        role.setName("ROLE_USER");
        when(roleRepository.findByName("ROLE_USER")).thenReturn(Optional.of(role));

        user.setRoles(Collections.singleton(role));

        when(userRepository.save(user)).thenReturn(user);

        ResponseEntity<?> response = authController.registerUser(signUpDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User registered successfully", response.getBody());
    }


}
