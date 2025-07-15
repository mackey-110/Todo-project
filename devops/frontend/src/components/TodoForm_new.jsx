import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Zoom,
} from "@mui/material";
import { Add, Clear, Assignment } from "@mui/icons-material";

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title.trim());
      setTitle("");
    }
  };

  const handleClear = () => {
    setTitle("");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        borderRadius: 3,
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box sx={{ position: "relative", flexGrow: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="새로운 할 일을 입력하세요... 🎯"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="large"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Assignment sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
              endAdornment: title && (
                <InputAdornment position="end">
                  <Zoom in={!!title}>
                    <IconButton
                      onClick={handleClear}
                      size="small"
                      sx={{
                        color: "text.secondary",
                        "&:hover": { color: "error.main" },
                      }}
                    >
                      <Clear />
                    </IconButton>
                  </Zoom>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "white",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                },
                "&.Mui-focused": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                },
              },
              "& .MuiOutlinedInput-input": {
                padding: "18px 14px",
                fontSize: "1.1rem",
              },
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          startIcon={<Add />}
          disabled={!title.trim()}
          sx={{
            minWidth: 120,
            height: 56,
            borderRadius: 3,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a67d8 0%, #667eea 100%)",
              transform: "translateY(-3px)",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
            },
            "&:active": {
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)",
              color: "text.disabled",
              boxShadow: "none",
              transform: "none",
            },
          }}
        >
          Add Task
        </Button>
      </Box>
    </Paper>
  );
};

export default TodoForm;
