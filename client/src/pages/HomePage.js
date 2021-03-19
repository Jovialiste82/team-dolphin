import React, { useContext, useEffect, useState } from "react";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import { Grid, Typography, Box } from "@material-ui/core";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import Mention from "../layout/Mention";
import MentionList from "../layout/MentionList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    alignItems: "center",
    margin: theme.spacing(6, 3, 4, 0),
    width: "80%",
  },
}));

const HomePage = () => {
  let history = useHistory();
  const classes = useStyles();
  const [mentionDatas, setMentionDatas] = useState([]);
  const { isAuthenticated, getMentions } = useContext(UserContext);

  useEffect(() => {
    getMentions().then((data) => setMentionDatas(data));
  }, [getMentions]);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  if (isAuthenticated === false) {
    history.push("/login");
  }

  return (
    <>
      <AppBarLoggedIn />
      <Grid container style={{ backgroundColor: "#fff", height: "100vh" }}>
        <Grid item xs>
          <MentionList />
        </Grid>
        <Grid item xs={7} style={{ backgroundColor: "#FAFBFF" }} align="right">
          <Box className={classes.box}>
            <Typography variant="h3" align="left">
              My mentions
            </Typography>
          </Box>
          {mentionDatas.map((mentionData) => (
            <Mention key={mentionData._id} mention={mentionData} />
          ))}
        </Grid>
        <Grid item xs={2} style={{ backgroundColor: "#FAFBFF" }}></Grid>
      </Grid>
    </>
  );
};

export default HomePage;
