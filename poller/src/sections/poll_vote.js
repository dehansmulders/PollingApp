import React, { useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Grid,
  Button,
  Tooltip,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";

const styles = (Theme) =>
  createStyles({
    root: {},
    header: {
      borderRadius: "5px",
      border: "1px solid rgba(255, 99, 132, 1)",
      background: "rgba(255, 99, 132, 0.4)",
      color: Theme.palette.getContrastText("rgba(255, 99, 132, 0.4)"),
      minHeight: "56px",
    },
    footer: {
      borderRadius: "5px",
      border: "1px solid rgba(75, 192, 192, 1)",
      background: "rgba(75, 192, 192, 0.4)",
      color: Theme.palette.getContrastText("rgba(75, 192, 192, 0.4)"),
      minHeight: "56px",
    },
    button: {
      padding: "6px 16px",
      height: "48px",
    },
  });

function PollVote(props) {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={props.classes?.header}>
        <Typography variant={"h5"}>{props.question}</Typography>
      </Grid>
      <Grid item xs={12} style={{marginTop: '15px'}}>
        <RadioGroup onChange={(e) => setSelectedOption(e.target.value)}>
          {Object.keys(props.options).map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio checked={selectedOption === option} />}
              label={option}
              style={index > 0 ? {marginTop: '5px'} : {}}
            />
          ))}
        </RadioGroup>
      </Grid>
      <Grid item xs={12} className={props.classes?.footer}>
        <Box
          className={props.classes?.listOption}
          style={{ textAlign: "center" }}
        >
          <Tooltip title={"Vote"}>
            <Button
              className={props.classes?.button}
              startIcon={<Done />}
              onClick={() => {
                props.incrementVote(selectedOption);
                setSelectedOption("");
              }}
            >
              {"Vote"}
            </Button>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(PollVote);
