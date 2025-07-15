package web.mvc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import web.mvc.entity.Todo;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    // 완료 상태별로 조회
    List<Todo> findByCompleted(Boolean completed);

    // 제목으로 검색
    List<Todo> findByTitleContainingIgnoreCase(String title);

    // 완료된 할 일 개수
    @Query("SELECT COUNT(t) FROM Todo t WHERE t.completed = true")
    long countCompletedTodos();

    // 미완료된 할 일 개수
    @Query("SELECT COUNT(t) FROM Todo t WHERE t.completed = false")
    long countPendingTodos();

    // 생성일 순으로 정렬
    List<Todo> findAllByOrderByCreatedAtDesc();
}
