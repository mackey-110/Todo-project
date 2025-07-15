import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const TodoItem = ({ todo, onToggle, onDelete }) => {
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
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ListItem
      dense
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        mb: 1,
        backgroundColor: todo.completed ? "action.hover" : "background.paper",
      }}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.completed}
          onChange={handleToggle}
          color="primary"
        />
      </ListItemIcon>

      <ListItemText
        primary={
          <Typography
            variant="body1"
            sx={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "text.secondary" : "text.primary",
            }}
          >
            {todo.title}
          </Typography>
        }
        secondary={
          <div style={{ marginTop: 4 }}>
            <Chip
              label={todo.completed ? "완료" : "진행중"}
              size="small"
              color={todo.completed ? "success" : "warning"}
              variant="outlined"
              sx={{ mr: 1 }}
            />
            {todo.createdAt && (
              <Typography variant="caption" color="text.secondary">
                생성: {formatDate(todo.createdAt)}
              </Typography>
            )}
            {todo.completedAt && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ ml: 1 }}
              >
                완료: {formatDate(todo.completedAt)}
              </Typography>
            )}
          </div>
        }
      />

      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          onClick={handleDelete}
          color="error"
          size="small"
        >
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;
