package com.newyearletter.newyearletter.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtTokenUtil {
    private static Claims extractClaims(String token, String key) {
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
    }

    public static String getUserID(String token, String key) {
        // createToken 메서드에서 put한 "userID"을 불러온다.
        return extractClaims(token, key).get("userID").toString();
    }

    public static boolean isExpired(String token, String secretkey) {
        Date expiredDate = extractClaims(token, secretkey).getExpiration();
        return expiredDate.before(new Date());
    }

    public static String createToken(String userID, String key, long expireTimeMs) {
        Claims claims = Jwts.claims();
        // Map 형식으로 되어 있음
        claims.put("userID", userID);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTimeMs))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }
}

