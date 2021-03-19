import React, { useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import {
  TextField,
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
  Tooltip,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const styles = (Theme) =>
  createStyles({
    root: {},
    listOptionContainer: {},
    listOption: {
      display: "flex",
    },
    listOptionText: {
      flexGrow: 1,
      padding: Theme.spacing(1),
      borderRadius: "5px",
      border: "1px solid #d3d5dd",
      //backgroundColor: "#eceef6"
    },
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

function PollCreate(props) {
  const maxOptionsCount = 10;
  const [newOption, setNewOption] = useState("");
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={props.classes?.header}>
        <TextField
          value={props.question || ""}
          label={"What is the question?"}
          type={"text"}
          onChange={(e) => props.setQuestion(e.target.value)}
          inputProps={{ maxLength: 80 }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        {Object.keys(props.options).map((option, index) => (
          <Box
            className={props.classes?.listOption}
            key={index}
            style={index > 0 ? { marginTop: "5px" } : {}}
          >
            <Typography className={props.classes?.listOptionText}>
              {option}
            </Typography>
            <Tooltip title={"Remove"}>
              <IconButton
                onClick={() => props.removeOption(option)}
                size={"small"}
                style={{ width: "40px" }}
              >
                <Close />
              </IconButton>
            </Tooltip>
          </Box>
        ))}
      </Grid>
      {Object.keys(props.options).length < 2 && (
        <Grid item xs={12}>
          <Typography>{"You need at least two options *"}</Typography>
        </Grid>
      )}
      <Grid item xs={12} className={props.classes?.footer}>
        <Box className={props.classes?.listOption}>
          <TextField
            value={newOption || ""}
            label={"Type an answer"}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props.addOption(newOption);
                setNewOption("");
              }
            }}
            disabled={Object.keys(props.options).length >= maxOptionsCount}
            inputProps={{ maxLength: 80 }}
            fullWidth
          />
          <Tooltip title={"Add"}>
            <Button
              className={props.classes?.button}
              //startIcon={<Add />}
              onClick={() => {
                props.addOption(newOption);
                setNewOption("");
              }}
            >
              {"Add"}
            </Button>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(PollCreate);
