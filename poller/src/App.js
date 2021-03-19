import React, { useState } from "react";
import {
  ThemeProvider,
  Grid,
  Typography,
  Button,
  Paper,
  Tooltip,
} from "@material-ui/core";
import { Replay, BarChart} from "@material-ui/icons";
import PollCreate from "./sections/poll_create";
import PollVote from "./sections/poll_vote";
import PollResults from "./sections/poll_results";
import Theme from "./theme/theme";

function App() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({});

  /**Add a new option */
  const addOption = (option) => {
    if (option && option !== "") {
      //if the option already exists, ignore
      if (options.hasOwnProperty(option)) {
        return;
      } else {
        let _options = { ...options };
        _options[option] = 0;
        setOptions(_options);
      }
    }
  };

  /**Remove an existing option */
  const removeOption = (option) => {
    //if the option does not exists, ignore
    if (options.hasOwnProperty(option)) {
      let _options = { ...options };
      delete _options[option];
      setOptions(_options);
    } else {
      return;
    }
  };

  /**Resets all options */
  const resetAll = () => {
    setQuestion("");
    setOptions({});
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
      let _options = { ...options };
      _options[vote] = _options[vote] + 1;
      setOptions(_options);
    }
  };

  return (
    <div
      className="App"
      style={{
        padding: "20px",
        height: "calc(100vh - 40px)",
        backgroundColor: "#537D8D", //"#eceef6",
        overflow: 'auto',
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <ThemeProvider theme={Theme}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Paper>
              <Typography variant={"h3"}>
                {"Poll creator 2000"}
              </Typography>
              <Tooltip title={'Reset data to initial state'}>
                <Button startIcon={<Replay/>} onClick={resetAll}>Reset</Button>
              </Tooltip>
              <Tooltip title={'Load sample data'}>
                <Button startIcon={<BarChart/>} onClick={insertSample}>Sample</Button>
              </Tooltip>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper style={{minHeight: 'calc(100vh - 240px)'}}>
                  <PollCreate
                    question={question}
                    setQuestion={setQuestion}
                    options={options}
                    addOption={addOption}
                    removeOption={removeOption}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper style={{minHeight: 'calc(100vh - 240px)'}}>
                  <PollVote
                    question={question}
                    options={options}
                    incrementVote={incrementVote}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Paper style={{minHeight: 'calc(100vh - 240px)'}}>
                  <PollResults question={question} options={options} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
