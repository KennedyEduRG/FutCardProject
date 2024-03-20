package com.futcards.futcards_backend.controllers.User;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futcards.futcards_backend.model.User.User;
import com.futcards.futcards_backend.services.User.UserService;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	UserService userService;

	@GetMapping
	public ResponseEntity<List<User>> findAll() {
		List<User> allusers = userService.findAll();
		return new ResponseEntity<List<User>>(allusers, HttpStatus.OK);
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<User> findById(@PathVariable Long userId) throws Exception {
		User foundeduser = userService.findById(userId);
		return new ResponseEntity<User>(foundeduser, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<User> create(@Valid @RequestBody User user) throws Exception {
		User createduser = userService.create(user);
		return new ResponseEntity<User>(createduser, HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<User> update(@Valid @RequestBody User user) throws Exception {
		User updateduser = userService.update(user);
		return new ResponseEntity<User>(updateduser, HttpStatus.OK);
	}
	
	@DeleteMapping("/{userId}")
	public ResponseEntity<Void> delete(@PathVariable Long userId) throws Exception {
		userService.delete(userId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}

