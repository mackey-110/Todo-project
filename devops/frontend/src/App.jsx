import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";
import axios from "axios";

// 환경에 따른 API URL 설정
const API_BASE_URL = import.meta.env.PROD
  ? "/api" // 프로덕션: Nginx 프록시 사용
  : "http://localhost:8080/api"; // 개발: 직접 백엔드 연결

function App() {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 할 일 목록 조회
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/todos`);
      setTodos(response.data);
      setError(null);
      // 통계도 함께 조회
      await fetchStats();
    } catch (err) {
      console.error("할 일 조회 실패:", err);
      setError(
        "서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  // 통계 데이터 조회
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos/stats`);
      setStats(response.data);
    } catch (err) {
      console.error("통계 조회 실패:", err);
      // 통계 조회 실패시 클라이언트 사이드에서 계산
      const total = todos.length;
      const completed = todos.filter((todo) => todo.completed).length;
      const pending = total - completed;
      const completionRate =
        total > 0 ? Math.round((completed / total) * 100) : 0;

      setStats({
        total,
        completed,
        pending,
        completionRate,
      });
    }
  };

  // 할 일 추가
  const addTodo = async (title) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, { title });
      setTodos((prev) => [...prev, response.data]);
      setError(null);
      // 통계 업데이트
      await fetchStats();
    } catch (err) {
      console.error("할 일 추가 실패:", err);
      setError("할 일 추가에 실패했습니다.");
    }
  };

  // 할 일 완료 상태 토글
  const toggleTodo = async (id) => {
    try {
      // 백엔드의 toggle 전용 엔드포인트 사용
      const response = await axios.put(`${API_BASE_URL}/todos/${id}/toggle`);
      setTodos((prev) => prev.map((t) => (t.id === id ? response.data : t)));
      setError(null);
      // 통계 업데이트
      await fetchStats();
    } catch (err) {
      console.error("할 일 수정 실패:", err);
      setError("할 일 수정에 실패했습니다.");
    }
  };

  // 할 일 삭제
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setError(null);
      // 통계 업데이트
      await fetchStats();
    } catch (err) {
      console.error("할 일 삭제 실패:", err);
      setError("할 일 삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchTodos();
    };
    initializeData();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* 헤더 섹션 */}
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            color: "white",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 1,
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            🚀 DevOps Todo
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 300,
              opacity: 0.9,
              letterSpacing: 1,
            }}
          >
            Modern Task Management with Spring Boot & React
          </Typography>
        </Box>

        {/* 메인 컨테이너 */}
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {error && (
            <Alert
              severity="error"
              sx={{
                m: 3,
                borderRadius: 2,
                "& .MuiAlert-icon": {
                  fontSize: 24,
                },
              }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          {/* 통계 섹션 */}
          <Box sx={{ p: 3, pb: 0 }}>
            <TodoStats todos={todos} serverStats={stats} />
          </Box>

          {/* 할 일 추가 폼 */}
          <Box sx={{ p: 3, pb: 2 }}>
            <TodoForm onAddTodo={addTodo} />
          </Box>

          {/* 할 일 목록 */}
          <Box sx={{ p: 3, pt: 1 }}>
            {loading ? (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ py: 8 }}
              >
                <CircularProgress size={60} thickness={4} />
                <Typography
                  variant="h6"
                  sx={{ mt: 2, color: "text.secondary" }}
                >
                  Loading your tasks...
                </Typography>
              </Box>
            ) : (
              <TodoList
                todos={todos}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
              />
            )}
          </Box>
        </Paper>

        {/* 푸터 */}
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
            color: "white",
            opacity: 0.7,
          }}
        >
          <Typography variant="body2">
            Built with ❤️ using Spring Boot, React & Material-UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
