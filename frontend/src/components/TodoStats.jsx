import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import {
  Assignment,
  CheckCircle,
  Schedule,
  TrendingUp,
} from "@mui/icons-material";

const TodoStats = ({ todos, serverStats }) => {
  // 서버 통계가 있으면 우선 사용, 없으면 클라이언트에서 계산
  const totalCount = serverStats?.total ?? todos.length;
  const completedCount =
    serverStats?.completed ?? todos.filter((todo) => todo.completed).length;
  const pendingCount = serverStats?.pending ?? totalCount - completedCount;
  const completionRate =
    serverStats?.completionRate ??
    (totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0);

  const statCards = [
    {
      title: "전체",
      value: totalCount,
      icon: <Assignment />,
      color: "primary.main",
    },
    {
      title: "완료",
      value: completedCount,
      icon: <CheckCircle />,
      color: "success.main",
    },
    {
      title: "진행중",
      value: pendingCount,
      icon: <Schedule />,
      color: "warning.main",
    },
    {
      title: "완료율",
      value: `${completionRate}%`,
      icon: <TrendingUp />,
      color: "info.main",
    },
  ];

  return (
    <Grid container spacing={2}>
      {statCards.map((stat, index) => (
        <Grid item xs={6} sm={3} key={index}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: "center", py: 2 }}>
              <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
              <Typography variant="h4" component="div" fontWeight="bold">
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TodoStats;
