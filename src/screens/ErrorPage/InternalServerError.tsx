import React from 'react';
import { Typography, Container, Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import loc from './what-is-500-internal-server-error.jpg'
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '400px',
    margin: theme.spacing(2, 0),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const InternalServerError: React.FC = () => {
  const classes = useStyles();

  const handleReturnHome = () => {
    
  };

  return (
    <Container className={classes.root}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography variant="h4" color="primary" gutterBottom>
            Internal Server Error
          </Typography>
          <Typography variant="body1" color="primary" gutterBottom>
            Oops! Something went wrong. Please try again later.
          </Typography>
          <div>
            <img
              src={loc}
              alt="Error"
              className={classes.imagePreview}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReturnHome}
            className={classes.button}
          >
            Reload
          </Button>
        </Paper>
      </Grid>
      </Container>
  );
};

export default InternalServerError;
