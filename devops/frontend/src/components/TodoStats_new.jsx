import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Fade,
  useTheme,
} from "@mui/material";
import {
  Assignment,
  CheckCircle,
  Schedule,
  TrendingUp,
} from "@mui/icons-material";

const TodoStats = ({ todos }) => {
  const theme = useTheme();
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = totalCount - completedCount;
  const completionRate =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const statCards = [
    {
      title: "전체 할 일",
      value: totalCount,
      icon: <Assignment />,
      color: "#3f51b5",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "완료됨",
      value: completedCount,
      icon: <CheckCircle />,
      color: "#4caf50",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      title: "진행 중",
      value: pendingCount,
      icon: <Schedule />,
      color: "#ff9800",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      title: "완료율",
      value: `${completionRate}%`,
      icon: <TrendingUp />,
      color: "#9c27b0",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      showProgress: true,
    },
  ];

  return (
    <Grid container spacing={3}>
      {statCards.map((stat, index) => (
        <Grid item xs={6} md={3} key={index}>
          <Fade in={true} timeout={500 + index * 200}>
            <Card
              elevation={8}
              sx={{
                background: stat.gradient,
                color: "white",
                borderRadius: 3,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: theme.shadows[20],
                },
              }}
            >
              <CardContent
                sx={{ p: 3, position: "relative", overflow: "hidden" }}
              >
                {/* 배경 아이콘 */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    opacity: 0.1,
                    transform: "scale(2)",
                    color: "white",
                  }}
                >
                  {stat.icon}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {React.cloneElement(stat.icon, { sx: { fontSize: 24 } })}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.9, fontWeight: 500 }}
                  >
                    {stat.title}
                  </Typography>
                </Box>

                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    fontWeight: 800,
                    mb: stat.showProgress ? 2 : 0,
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {stat.value}
                </Typography>

                {stat.showProgress && (
                  <Box>
                    <LinearProgress
                      variant="determinate"
                      value={completionRate}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 4,
                          backgroundColor: "white",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 1,
                        display: "block",
                        opacity: 0.9,
                        fontWeight: 500,
                      }}
                    >
                      {completedCount} of {totalCount} tasks completed
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      ))}
    </Grid>
  );
};

export default TodoStats;
