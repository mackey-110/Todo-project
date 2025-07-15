package web.mvc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mvc.dto.TodoCreateDto;
import web.mvc.dto.TodoResponseDto;
import web.mvc.entity.Todo;
import web.mvc.repository.TodoRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TodoService {

    private final TodoRepository todoRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    // 모든 할 일 조회
    @Transactional(readOnly = true)
    public List<TodoResponseDto> getAllTodos() {
        return todoRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // ID로 할 일 조회
    @Transactional(readOnly = true)
    public Optional<TodoResponseDto> getTodoById(Long id) {
        return todoRepository.findById(id)
                .map(this::convertToDto);
    }

    // 할 일 생성
    public TodoResponseDto createTodo(TodoCreateDto todoCreateDto) {
        Todo todo = new Todo(todoCreateDto.getTitle(), todoCreateDto.getDescription());
        Todo savedTodo = todoRepository.save(todo);
        return convertToDto(savedTodo);
    }

    // 할 일 완료 상태 토글
    public Optional<TodoResponseDto> toggleTodoComplete(Long id) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setCompleted(!todo.getCompleted());
                    Todo savedTodo = todoRepository.save(todo);
                    return convertToDto(savedTodo);
                });
    }

    // 할 일 수정
    public Optional<TodoResponseDto> updateTodo(Long id, TodoCreateDto todoCreateDto) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setTitle(todoCreateDto.getTitle());
                    todo.setDescription(todoCreateDto.getDescription());
                    Todo savedTodo = todoRepository.save(todo);
                    return convertToDto(savedTodo);
                });
    }

    // 할 일 삭제
    public boolean deleteTodo(Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // 완료된 할 일 개수
    @Transactional(readOnly = true)
    public long getCompletedCount() {
        return todoRepository.countCompletedTodos();
    }

    // 미완료된 할 일 개수
    @Transactional(readOnly = true)
    public long getPendingCount() {
        return todoRepository.countPendingTodos();
    }

    // 전체 할 일 개수
    @Transactional(readOnly = true)
    public long getTotalCount() {
        return todoRepository.count();
    }

    // Entity를 DTO로 변환
    private TodoResponseDto convertToDto(Todo todo) {
        return new TodoResponseDto(
                todo.getId(),
                todo.getTitle(),
                todo.getDescription(),
                todo.getCompleted(),
                todo.getCreatedAt(),
                todo.getUpdatedAt());
    }
}
