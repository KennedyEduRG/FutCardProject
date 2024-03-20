package com.futcards.futcards_backend.services.User;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.futcards.futcards_backend.model.User.User;
import com.futcards.futcards_backend.repositories.User.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public List<User> findAll() {
		List<User> finances = userRepository.findAll();
		return finances;
	}
	
	public User findById(Long userId) throws Exception {
		User entity = userRepository.findById(userId)
				.orElseThrow(() -> new Exception("Não foi possível atualizar"));

		return entity;
	}
	
	
	public User create(User user) throws Exception {
		/*if(user.getNome().length() < 5) {
			throw new Exception("Nome da carta tem que ter pelo "
					+ "menos 5 caracteres");
		}*/
		User createduser = userRepository.save(user);
		return createduser;
	}
	
	public User update(User user) throws Exception {
		User entity = userRepository.findById(user.getId())
				.orElseThrow(() -> new Exception("Não foi possível atualizar"));
		
		User updateduser = userRepository.save(user);
		return updateduser;
	}
	
	
	public void delete(Long userId) throws Exception {
		User entity = userRepository.findById(userId)
				.orElseThrow(() -> new Exception("Não foi possível atualizar"));

		userRepository.delete(entity);
	}
}
