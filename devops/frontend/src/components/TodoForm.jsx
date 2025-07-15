import React, { useState } from "react";
import { Box, TextField, Button, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title.trim());
      setTitle("");
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2 }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="새로운 할 일을 입력하세요..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="medium"
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<Add />}
          sx={{ minWidth: 100 }}
          disabled={!title.trim()}
        >
          추가
        </Button>
      </Box>
    </Paper>
  );
};

export default TodoForm;
