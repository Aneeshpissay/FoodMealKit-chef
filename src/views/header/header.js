import React from 'react';
import clsx from 'clsx';
import { makeStyles, Drawer, CssBaseline, AppBar, Toolbar, List, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Button, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import AddIcon from '@material-ui/icons/Add';
import { primary, black, white, grey } from '../../constants/Colors';
import { bold } from '../../constants/Font';
import {withRouter} from 'react-router';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: white,
    color: black
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: primary
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  text: {
    fontFamily: bold,
    fontSize: 17,
    color: primary
  }
}));

const CustomButton = withStyles((theme) => ({
  root: {
    color: primary,
    backgroundColor: 'transparent',
    fontFamily: bold,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: grey,
    },
  },
}))(Button);

const Header = props => {
  const {history, children} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [itemIndex, setItemIndex] = React.useState(0);
  const itemsList = [
    {
      text: "Create Recipe",
      icon: <AddIcon style={{color: primary}} />,
      onClick: ()=> {
        history.push('/create-recipe');
        setItemIndex(1);
      }
    },
    {
      text: "Orders",
      icon: <ShoppingCartIcon style={{color: primary}}/>,
      onClick: ()=> {
        history.push('/orders');
        setItemIndex(2);
      }
    }
  ]
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          {/* <img src="https://procivil.in/assets/img/logox.png" alt="Procivil"/> */}
          <div style={{marginLeft: 'auto'}}>
              <CustomButton>Logout</CustomButton>
              <CustomButton>Aneesh Pissay</CustomButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose} style={{color: primary}}>
            <CloseRoundedIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Dashboard'].map((text, index) => (
            <ListItem button selected={itemIndex === 0} key={text} onClick={()=> {
              history.push('/dashboard');
              setItemIndex(0);
            }}>
              <ListItemIcon><DashboardRoundedIcon style={{color: primary}}/></ListItemIcon>
              <ListItemText primary={text} classes={{primary:classes.text}}/>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {itemsList.map((item, index) => {
            const {text, icon, onClick} = item;
            return (
              <ListItem button selected={index + 1 === itemIndex} key={index} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} classes={{primary:classes.text}}/>
             </ListItem>
            )
          })}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
            {children}
      </main>
    </div>
  );
}

export default withRouter(Header);