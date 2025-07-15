package web.mvc.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TodoCreateDto {

    @NotBlank(message = "할 일 제목은 필수입니다")
    @Size(max = 255, message = "할 일 제목은 255자를 초과할 수 없습니다")
    private String title;

    @Size(max = 1000, message = "설명은 1000자를 초과할 수 없습니다")
    private String description;

    // 기본 생성자
    public TodoCreateDto() {
    }

    // 생성자
    public TodoCreateDto(String title, String description) {
        this.title = title;
        this.description = description;
    }

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
