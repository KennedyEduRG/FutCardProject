package com.futcards.futcards_backend.repositories.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.futcards.futcards_backend.model.User.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
