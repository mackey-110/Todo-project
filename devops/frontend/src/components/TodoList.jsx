import React from "react";
import { List, Typography, Box, Paper } from "@mui/material";
import { Assignment } from "@mui/icons-material";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return (
      <Paper elevation={1} sx={{ p: 4, textAlign: "center" }}>
        <Assignment sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          할 일이 없습니다
        </Typography>
        <Typography variant="body2" color="text.secondary">
          위에서 새로운 할 일을 추가해보세요!
        </Typography>
      </Paper>
    );
  }

  // 미완료 항목을 위에, 완료된 항목을 아래에 표시
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) {
      // 같은 상태면 최신순
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    // 미완료가 먼저
    return a.completed - b.completed;
  });

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        할 일 목록 ({todos.length}개)
      </Typography>
      <List sx={{ width: "100%" }}>
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
          />
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;
