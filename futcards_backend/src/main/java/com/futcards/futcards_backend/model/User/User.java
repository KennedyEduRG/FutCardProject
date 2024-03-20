package com.futcards.futcards_backend.model.User;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Users")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Size(min = 5, max = 30, message = "O nome deve ter entre 5 e 30 caracteres")
	private String nome;
	private String senha;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private boolean itsLoged;

	public boolean isItsLoged() {
		return itsLoged;
	}

	public void setItsLoged(boolean itsLoged) {
		this.itsLoged = itsLoged;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	
	public Long getId() {
		return id;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public User(String nome, String senha, boolean itsLoged) {
		this.nome = nome;
		this.itsLoged = itsLoged;
		if(this.itsLoged){
			this.senha = senha;
		}
	}
	
	
	public User() {}

	@Override
	public int hashCode() {
		return Objects.hash(id, nome, itsLoged, senha);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return 
				Objects.equals(id, other.id)
				&& Objects.equals(nome, other.nome)
				&& Objects.equals(itsLoged, other.itsLoged)
				&& Objects.equals(senha, other.senha);
	}
	
	
	
	
}
