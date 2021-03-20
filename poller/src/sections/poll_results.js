import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { Bar, Doughnut } from "react-chartjs-2";

const styles = (Theme) =>
  createStyles({
    root: {},
    header: {
      borderRadius: "5px",
      border: "1px solid rgba(54, 162, 235, 1)",
      background: "rgba(54, 162, 235, 0.2)",
      minHeight: "56px",
    },
  });

function buildData(props) {
  let dataObj = {
    labels: [],
    datasets: [
      {
        label: "Votes",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(205, 55, 109, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(208, 217, 68, 0.4)",
          "rgba(32, 67, 195, 0.4)",
          "rgba(97, 201, 85, 0.4)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(205, 55, 109, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(208, 217, 68, 1)",
          "rgba(32, 67, 195, 1)",
          "rgba(97, 201, 85, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  Object.keys(props.options).forEach((option) => {
    dataObj.labels.push(option);
    dataObj.datasets[0].data.push(props.options[option]);
  });

  return dataObj;
}

function getTotalVotes(options) {
  let count = 0;
  Object.keys(options).forEach((option) => {
    count += options[option];
  });
  return count;
}

function PollResult(props) {
  const data = buildData(props);
  const barOptions = {
    legend: { display: false },
    scales: {
      xAxes: [{ gridLines: { display: false } }],
      yAxes: [{ ticks: { beginAtZero: true }, gridLines: { display: true } }],
    },
  };

  const pieOptions = {
    elements: {
      center: {
        text: `Total: ${getTotalVotes(props.options)}`,
      },
    },
  };

  const piePlugins = [
    {
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          var height = chart.chart.height,
            ctx = chart.chart.ctx;

          var centerConfig = chart.config.options.elements.center;
          ctx.restore();
          var fontSize = (height / 240).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          ctx.textAlign = "center";

          var text = centerConfig.text,
            textX = (chart.chartArea.left + chart.chartArea.right) / 2,
            textY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      },
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={props.classes?.header}>
        <Typography variant={"h5"}>{props.question}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Doughnut data={data} options={pieOptions} plugins={piePlugins} />
      </Grid>
      <Grid item xs={12}>
        <Bar data={data} options={barOptions} />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(PollResult);
