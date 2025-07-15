import React from "react";
import {
  Box,
  Paper,
  Typography,
  Checkbox,
  IconButton,
  Chip,
  Avatar,
  Fade,
  useTheme,
} from "@mui/material";
import {
  Delete,
  CheckCircle,
  RadioButtonUnchecked,
  Schedule,
  Done,
} from "@mui/icons-material";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const theme = useTheme();

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Fade in={true} timeout={300}>
      <Paper
        elevation={todo.completed ? 2 : 6}
        sx={{
          mb: 2,
          borderRadius: 3,
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          background: todo.completed
            ? "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          border: `2px solid ${todo.completed ? "#e9ecef" : "transparent"}`,
          transform: todo.completed ? "scale(0.98)" : "scale(1)",
          "&:hover": {
            transform: todo.completed ? "scale(0.99)" : "scale(1.02)",
            boxShadow: todo.completed ? theme.shadows[4] : theme.shadows[12],
            "& .delete-button": {
              opacity: 1,
              transform: "scale(1)",
            },
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* 커스텀 체크박스 */}
            <Box
              onClick={handleToggle}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: todo.completed
                  ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                  : "transparent",
                border: todo.completed ? "none" : "2px solid #e0e0e0",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: todo.completed
                    ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  transform: "scale(1.1)",
                },
              }}
            >
              {todo.completed ? (
                <Done sx={{ color: "white", fontSize: 20 }} />
              ) : (
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "transparent",
                  }}
                />
              )}
            </Box>

            {/* 할 일 내용 */}
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "text.secondary" : "text.primary",
                  opacity: todo.completed ? 0.7 : 1,
                  fontWeight: todo.completed ? 400 : 600,
                  transition: "all 0.3s ease",
                  wordBreak: "break-word",
                }}
              >
                {todo.title}
              </Typography>

              {/* 날짜 정보 */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <Chip
                  icon={todo.completed ? <CheckCircle /> : <Schedule />}
                  label={todo.completed ? "완료됨" : "진행 중"}
                  size="small"
                  sx={{
                    background: todo.completed
                      ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                      : "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                    color: "white",
                    fontWeight: 600,
                    "& .MuiChip-icon": {
                      color: "white",
                    },
                  }}
                />
                {todo.createdAt && (
                  <Typography variant="caption" color="text.secondary">
                    생성: {formatDate(todo.createdAt)}
                  </Typography>
                )}
                {todo.completedAt && (
                  <Typography variant="caption" color="text.secondary">
                    완료: {formatDate(todo.completedAt)}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* 삭제 버튼 */}
            <IconButton
              className="delete-button"
              onClick={handleDelete}
              sx={{
                opacity: 0,
                transform: "scale(0.8)",
                transition: "all 0.3s ease",
                background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
                color: "white",
                width: 40,
                height: 40,
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #ff5252 0%, #f44336 100%)",
                  transform: "scale(1.1)",
                },
              }}
            >
              <Delete sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>

        {/* 하단 진행률 바 (완료된 항목에만 표시) */}
        {todo.completed && (
          <Box
            sx={{
              height: 4,
              background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
              animation: "progress 0.8s ease-out",
              "@keyframes progress": {
                from: { width: "0%" },
                to: { width: "100%" },
              },
            }}
          />
        )}
      </Paper>
    </Fade>
  );
};

export default TodoItem;
