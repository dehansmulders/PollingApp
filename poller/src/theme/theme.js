import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#222222'
      },
      secondary: {
          main: '#64b7ff'
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
            textOverflow: 'ellipses',
        }
    }
  },
});

export default theme;
