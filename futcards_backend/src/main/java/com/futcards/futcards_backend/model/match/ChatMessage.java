package com.futcards.futcards_backend.model.match;

import java.util.Date;
import java.util.Objects;

public class ChatMessage {
	private String nickname;
	private String content;
	private Date timestamp;
	
	
	
	public ChatMessage(String nickname, String content, Date timestamp) {
		super();
		this.nickname = nickname;
		this.content = content;
		this.timestamp = timestamp;
	}
	
	public ChatMessage() {}
	
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	
	@Override
	public int hashCode() {
		return Objects.hash(content, nickname, timestamp);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ChatMessage other = (ChatMessage) obj;
		return Objects.equals(content, other.content) && Objects.equals(nickname, other.nickname)
				&& Objects.equals(timestamp, other.timestamp);
	}

	@Override
	public String toString() {
		return "ChatMessage [nickname=" + nickname + ", content=" + content + ", timestamp=" + timestamp + "]";
	}
	
	
	
	
}
