import React, { useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import {
  ThemeProvider,
  Grid,
  Typography,
  Button,
  Paper,
  Tooltip,
} from "@material-ui/core";
import { Replay, BarChart } from "@material-ui/icons";
import PollCreate from "./sections/poll_create";
import PollVote from "./sections/poll_vote";
import PollResults from "./sections/poll_results";
import Theme from "./theme/theme";
import { SnackbarProvider } from "notistack";

const styles = (Theme) =>
  createStyles({
    successSnackbar: {
      border: "1px solid rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.8) !important",
    },
    errorSnackbar: {
      border: "1px solid rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.8) !important",
    },
  });

function App(props) {
  const defaultQuestion = "";
  const defaultOptions = {
    Option1: 0,
    Option2: 0,
  };
  const [question, setQuestion] = useState(defaultQuestion);
  const [options, setOptions] = useState(defaultOptions);

  /**Add a new option */
  const addOption = (option) => {
    if (option && option !== "") {
      //if the option already exists, ignore
      if (options.hasOwnProperty(option)) {
        return;
      } else {
        let newOptions = { ...options };
        newOptions[option] = 0;
        setOptions(newOptions);
      }
    }
  };

  /**Remove an existing option */
  const removeOption = (option) => {
    //if the option does not exists, ignore
    if (options.hasOwnProperty(option)) {
      let newOptions = { ...options };
      delete newOptions[option];
      setOptions(newOptions);
    } else {
      return;
    }
  };

  /**Edit an existing option */
  const editOption = (prevOption, newOption) => {
    //if the option does not exist or change, ignore
    if (options.hasOwnProperty(prevOption) && prevOption !== newOption) {
      let newOptions = {};
      Object.keys(options).forEach((o) => {
        if (o === prevOption) {
          //check for duplicates
          if(newOptions.hasOwnProperty(newOption)){
            newOptions[newOption + '2'] = options[o];
          } else {
            newOptions[newOption] = options[o];
          }
        } else {
          newOptions[o] = options[o];
        }
      });
      setOptions(newOptions);
    } else {
      return;
    }
  };

  /**Resets all options */
  const resetAll = () => {
    setQuestion(defaultQuestion);
    setOptions(defaultOptions);
  };

  /**Inserts some sample data */
  const insertSample = () => {
    setQuestion("Who is the best Jedi?");
    setOptions({
      "Anakin Skywalker": 2,
      "Han Solo": 1,
      "Obi-Wan Kenobi": 3,
      Yoda: 5,
      "Mace Windu": 2,
    });
  };

  /**Increment the count of the vote */
  const incrementVote = (vote) => {
    if (vote) {
      let newOptions = { ...options };
      newOptions[vote] = newOptions[vote] + 1;
      setOptions(newOptions);
    }
  };

  return (
    <div
      className="App"
      style={{
        padding: "20px",
        height: "calc(100vh - 40px)",
        backgroundColor: "#e0e0e7",
        overflow: "auto",
      }}
    >
      <ThemeProvider theme={Theme}>
        <SnackbarProvider
          maxSnack={3}
          classes={{
            variantSuccess: props.classes?.successSnackbar,
            variantError: props.classes?.errorSnackbar,
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Paper>
                <Typography variant={"h3"}>{"Poll Creator 2000"}</Typography>
                <Tooltip title={"Reset data to initial state"}>
                  <Button startIcon={<Replay />} onClick={resetAll}>
                    Reset
                  </Button>
                </Tooltip>
                <Tooltip title={"Load sample data"}>
                  <Button startIcon={<BarChart />} onClick={insertSample}>
                    Sample
                  </Button>
                </Tooltip>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper style={{ minHeight: "calc(100vh - 240px)" }}>
                    <PollCreate
                      question={question}
                      setQuestion={setQuestion}
                      options={options}
                      addOption={addOption}
                      removeOption={removeOption}
                      editOption={editOption}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper style={{ minHeight: "calc(100vh - 240px)" }}>
                    <PollVote
                      question={question}
                      options={options}
                      incrementVote={incrementVote}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Paper style={{ minHeight: "calc(100vh - 240px)" }}>
                    <PollResults question={question} options={options} />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default withStyles(styles)(App);
