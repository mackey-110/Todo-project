import React from "react";
import { Box, Typography, Paper, Divider, Fade, useTheme } from "@mui/material";
import { Assignment, EmojiEvents, TrendingUp } from "@mui/icons-material";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  const theme = useTheme();

  if (todos.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 6,
          textAlign: "center",
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          borderRadius: 4,
          border: "2px dashed #dee2e6",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Assignment sx={{ fontSize: 40, color: "white" }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            시작할 준비가 되었습니다! 🚀
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 400 }}
          >
            위의 폼에서 첫 번째 할 일을 추가하여 생산성 여정을 시작해보세요.
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 2, opacity: 0.6 }}>
            <Typography variant="body2">
              💡 팁: Enter키로 빠르게 추가할 수 있습니다
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  }

  // 미완료 항목을 위에, 완료된 항목을 아래에 표시
  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <Box>
      {/* 헤더 */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          📋 할 일 목록
        </Typography>
        <Typography variant="body1" color="text.secondary">
          총 {todos.length}개의 작업 | {pendingTodos.length}개 진행 중 |{" "}
          {completedTodos.length}개 완료
        </Typography>
      </Box>

      {/* 진행 중인 할 일 */}
      {pendingTodos.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TrendingUp sx={{ mr: 1, color: "warning.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              진행 중 ({pendingTodos.length})
            </Typography>
          </Box>
          {pendingTodos.map((todo, index) => (
            <Fade key={todo.id} in={true} timeout={300 + index * 100}>
              <div>
                <TodoItem
                  todo={todo}
                  onToggle={onToggleTodo}
                  onDelete={onDeleteTodo}
                />
              </div>
            </Fade>
          ))}
        </Box>
      )}

      {/* 완료된 할 일 */}
      {completedTodos.length > 0 && (
        <Box>
          {pendingTodos.length > 0 && (
            <Divider
              sx={{
                my: 3,
                borderColor: "rgba(0,0,0,0.08)",
                borderWidth: 1,
              }}
            />
          )}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <EmojiEvents sx={{ mr: 1, color: "success.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              완료됨 ({completedTodos.length})
            </Typography>
            {completedTodos.length > 0 && (
              <Typography
                variant="body2"
                sx={{
                  ml: 2,
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                🎉 잘했어요!
              </Typography>
            )}
          </Box>
          {completedTodos.map((todo, index) => (
            <Fade key={todo.id} in={true} timeout={300 + index * 100}>
              <div>
                <TodoItem
                  todo={todo}
                  onToggle={onToggleTodo}
                  onDelete={onDeleteTodo}
                />
              </div>
            </Fade>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TodoList;
