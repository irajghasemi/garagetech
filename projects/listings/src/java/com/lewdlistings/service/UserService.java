package com.lewdlistings.service;

import com.lewdlistings.entity.User;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {

    User create(User user);
    void delete(User user);
    User findByEmail(String email);
    User findByUsername(String username);
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, DataAccessException;
    User read(Long id);
    void update(User user);
}
