import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#222222'
      },
      secondary: {
          main: 'rgba(255, 99, 132, 1)'
      },
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: '20px',
        backgroundColor: '#FEF6FF'
      },
    },
    MuiTypography: {
        root: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }
    },
    MuiFormControlLabel: {
      root: {
        width: '100%',
      }
    }
  },
});

export default theme;
