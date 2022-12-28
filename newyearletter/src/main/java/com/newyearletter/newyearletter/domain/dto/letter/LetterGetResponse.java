package com.newyearletter.newyearletter.domain.dto.letter;

import com.newyearletter.newyearletter.domain.entity.Letter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class LetterGetResponse {
    private String author;
    private String content;
    private Integer money;

    public static LetterGetResponse fromEntity(Letter letter) {
        return LetterGetResponse.builder()
                .author(letter.getAuthor())
                .content(letter.getContent())
                .money(letter.getMoney())
                .build();
    }
}
