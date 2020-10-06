import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import ShoppingCartTwoToneIcon from "@material-ui/icons/ShoppingCartTwoTone";
import ListAltTwoToneIcon from "@material-ui/icons/ListAltTwoTone";
import SupervisorAccountTwoToneIcon from "@material-ui/icons/SupervisorAccountTwoTone";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import { Button } from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: "auto"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    flexGrow: 1
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary
  }
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
              Ferreteria
            </Typography>
            <Button variant="text" color="inherit">
              <ExitToAppTwoToneIcon />
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemIcon>
                  <HomeTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ShoppingCartTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Ventas" />
              </ListItem>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <ListAltTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Productos" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Categoria" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button>
                <ListItemIcon>
                  <SupervisorAccountTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
              <Link to="/categoria" className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <ExitToAppTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
              </Link>
            </List>
          </div>
        </Drawer>
        <Switch>
          <Route exact path="/categoria"></Route>
        </Switch>
      </div>
    </Router>
  );
}
