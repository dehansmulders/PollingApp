import React, { useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import {
  TextField,
  Box,
  Grid,
  IconButton,
  Button,
  Tooltip,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { withSnackbar } from "notistack";

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
    },
    header: {
      borderRadius: "5px",
      border: "1px solid rgba(54, 162, 235, 1)",
      background: "rgba(54, 162, 235, 0.2)",
      minHeight: "56px",
    },
    footer: {
      borderRadius: "5px",
      border: "1px solid rgba(75, 192, 192, 1)",
      background: "rgba(75, 192, 192, 0.2)",
      minHeight: "56px",
    },
    button: {
      padding: "6px 16px",
      height: "48px",
    },
    removeButton: {
      color: Theme.palette.secondary.main,
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
            <TextField
              label={""}
              value={option}
              variant={"outlined"}
              size={"small"}
              onChange={(e) => props.editOption(option, e.target.value)}
              inputProps={{ maxLength: 80 }}
              fullWidth
            />
            <Tooltip title={"Remove"}>
              <IconButton
                onClick={() => {
                  if (Object.keys(props.options).length <= 2) {
                    props.enqueueSnackbar(
                      "At least two options are required.",
                      { variant: "error" }
                    );
                  } else {
                    props.removeOption(option);
                  }
                }}
                size={"small"}
                style={{ width: "40px" }}
              >
                <Close className={props.classes?.removeButton} />
              </IconButton>
            </Tooltip>
          </Box>
        ))}
      </Grid>
      <Grid item xs={12} className={props.classes?.footer}>
        <Box className={props.classes?.listOption}>
          <TextField
            value={newOption || ""}
            label={`Type an answer (${
              maxOptionsCount - Object.keys(props.options).length
            } ${
              maxOptionsCount - Object.keys(props.options).length === 1
                ? "slot"
                : "slots"
            } remaining)`}
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
                if (Object.keys(props.options).length >= maxOptionsCount) {
                  props.enqueueSnackbar("Options reached the limit of 10.", {
                    variant: "error",
                  });
                } else if (!newOption || newOption === "") {
                  props.enqueueSnackbar("Please type an answer first.", {
                    variant: "error",
                  });
                } else if (props.options.hasOwnProperty(newOption)) {
                  props.enqueueSnackbar(
                    `'${newOption}' is already an option.`,
                    { variant: "error" }
                  );
                } else {
                  props.addOption(newOption);
                  setNewOption("");
                }
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

export default withStyles(styles)(withSnackbar(PollCreate));
