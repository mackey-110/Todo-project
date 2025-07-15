package web.mvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import web.mvc.dto.TodoCreateDto;
import web.mvc.dto.TodoResponseDto;
import web.mvc.service.TodoService;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001", "http://localhost:5173" })
@Validated
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    // 모든 할 일 조회
    @GetMapping
    public ResponseEntity<List<TodoResponseDto>> getAllTodos() {
        List<TodoResponseDto> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }

    // ID로 할 일 조회
    @GetMapping("/{id}")
    public ResponseEntity<TodoResponseDto> getTodoById(@PathVariable Long id) {
        return todoService.getTodoById(id)
                .map(todo -> ResponseEntity.ok(todo))
                .orElse(ResponseEntity.notFound().build());
    }

    // 할 일 생성
    @PostMapping
    public ResponseEntity<TodoResponseDto> createTodo(@Valid @RequestBody TodoCreateDto todoCreateDto) {
        TodoResponseDto createdTodo = todoService.createTodo(todoCreateDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTodo);
    }

    // 할 일 완료 상태 토글
    @PutMapping("/{id}/toggle")
    public ResponseEntity<TodoResponseDto> toggleTodoComplete(@PathVariable Long id) {
        return todoService.toggleTodoComplete(id)
                .map(todo -> ResponseEntity.ok(todo))
                .orElse(ResponseEntity.notFound().build());
    }

    // 할 일 수정
    @PutMapping("/{id}")
    public ResponseEntity<TodoResponseDto> updateTodo(@PathVariable Long id,
            @Valid @RequestBody TodoCreateDto todoCreateDto) {
        return todoService.updateTodo(id, todoCreateDto)
                .map(todo -> ResponseEntity.ok(todo))
                .orElse(ResponseEntity.notFound().build());
    }

    // 할 일 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        if (todoService.deleteTodo(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // 통계 정보 조회
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalCount = todoService.getTotalCount();
        long completedCount = todoService.getCompletedCount();
        long pendingCount = todoService.getPendingCount();

        stats.put("total", totalCount);
        stats.put("completed", completedCount);
        stats.put("pending", pendingCount);
        stats.put("completionRate", totalCount > 0 ? (double) completedCount / totalCount * 100 : 0);

        return ResponseEntity.ok(stats);
    }
}
