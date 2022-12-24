package com.newyearletter.newyearletter.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {
    DUPLICATED_EMAIL(HttpStatus.CONFLICT, "이메일이 중복됩니다."),
    DUPLICATED_USER_NICKNAME(HttpStatus.CONFLICT, "닉네임이 중복됩니다."),
    EMAIL_NOT_FOUND(HttpStatus.NOT_FOUND,"Not founded"),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "패스워드가 잘못되었습니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "잘못된 토큰입니다."),
    INVALID_PERMISSION(HttpStatus.UNAUTHORIZED, "사용자가 권한이 없습니다."),
    DATABASE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "DB에러")
    ;

    private HttpStatus status;
    private String message;
}
