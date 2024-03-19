package com.futcards.futcards_backend.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "cards")
public class PlayerCard implements Serializable {
	private static final long serialVersionUID = 1L;

	@Size(min = 5, max = 30, message = "O nome deve ter entre 5 e 30 caracteres")
	private String nome;
	private String posicaoJogador;
	private Double altura;
	private Double massa;
	private Double forca;
	private Double velocidadeX;
	private Double velocidadeY;
	private Double aceleracao;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getPosicaoJogador() {
		return posicaoJogador;
	}

	public void setPosicaoJogador(String posicaoJogador) {
		this.posicaoJogador = posicaoJogador;
	}

	public Double getAltura() {
		return altura;
	}

	public void setAltura(Double altura) {
		this.altura = altura;
	}

	public Double getMassa() {
		return massa;
	}

	public void setMassa(Double massa) {
		this.massa = massa;
	}

	public Double getForca() {
		return forca;
	}

	public void setForca(Double forca) {
		this.forca = forca;
	}

	public Double getVelocidadeX() {
		return velocidadeX;
	}

	public void setVelocidadeX(Double velocidadeX) {
		this.velocidadeX = velocidadeX;
	}

	public Double getVelocidadeY() {
		return velocidadeY;
	}

	public void setVelocidadeY(Double velocidadeY) {
		this.velocidadeY = velocidadeY;
	}

	public Double getAceleracao() {
		return aceleracao;
	}

	public void setAceleracao(Double aceleracao) {
		this.aceleracao = aceleracao;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public PlayerCard(String nome, String posicaoJogador, Double altura, Double massa, Double forca, Double velocidadeX,
			Double velocidadeY, Double aceleracao, Long id) {
		this.nome = nome;
		this.posicaoJogador = posicaoJogador;
		this.altura = altura;
		this.massa = massa;
		this.forca = forca;
		this.velocidadeX = velocidadeX;
		this.velocidadeY = velocidadeY;
		this.aceleracao = aceleracao;
		this.id = id;
	}
	
	
	public PlayerCard() {}

	@Override
	public int hashCode() {
		return Objects.hash(aceleracao, altura, forca, id, massa, nome, posicaoJogador, velocidadeX, velocidadeY);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PlayerCard other = (PlayerCard) obj;
		return Objects.equals(aceleracao, other.aceleracao) && Objects.equals(altura, other.altura)
				&& Objects.equals(forca, other.forca) && Objects.equals(id, other.id)
				&& Objects.equals(massa, other.massa) && Objects.equals(nome, other.nome)
				&& Objects.equals(posicaoJogador, other.posicaoJogador)
				&& Objects.equals(velocidadeX, other.velocidadeX) && Objects.equals(velocidadeY, other.velocidadeY);
	}
	
	
	
	
}
