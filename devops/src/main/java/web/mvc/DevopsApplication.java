package web.mvc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class DevopsApplication {

	public static void main(String[] args) {
		SpringApplication.run(DevopsApplication.class, args);
		System.out.println("🚀 DevOps Spring Boot Application Started!");
		System.out.println("📊 Server running on: http://localhost:8080/api");
		System.out.println("📋 API Endpoints:");
		System.out.println("   - GET    /api/todos        - 모든 할 일 조회");
		System.out.println("   - POST   /api/todos        - 할 일 생성");
		System.out.println("   - PUT    /api/todos/{id}   - 할 일 수정");
		System.out.println("   - DELETE /api/todos/{id}   - 할 일 삭제");
		System.out.println("   - GET    /api/todos/stats  - 통계 조회");
		System.out.println("   - GET    /api/health       - 서버 상태 확인");
	}

}
