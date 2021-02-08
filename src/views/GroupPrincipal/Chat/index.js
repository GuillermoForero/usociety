import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import {Button} from "@material-ui/core";
import {connect} from "react-redux";
import {getGroupCreator} from "../../../store/group/groupActions";
import {sendMessageCreator} from "../../../store/groupContent/groupContentActions";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    },
    containerChat: {
        position: 'fixed',
        bottom: '0',
        right: '0',
        width: '35%',
        justifyContent: 'flex-end'
    }
});

const Chat = (props) => {
    const classes = useStyles();
    const [showChat, setShowChat] = React.useState(false);
    const [textValue, setTextValue] = React.useState('');

    const handleSendMessage = (value) => {
        setTextValue('')
        props.dispatch(sendMessageCreator({content: textValue, idGroup: props.groupState.currentGroup.group.id}));
    }
    return (
        <>
            <Grid container className={classes.containerChat} xs={3}>
            {showChat ?
            <Grid container component={Paper} className={classes.chatSection} xs={12}>
                <Grid item xs={12}>
                    <Button variant="contained" style={{backgroundColor: 'var(--secondary)'}} fullWidth onClick={() => setShowChat(false)}>Chat</Button>
                </Grid>
                <Grid item xs={12}>
                    <List className={classes.messageArea}>
                        {props.groupContent.messages.map((value, index) => {
                            return <ListItem key={index}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" primary={value.content}></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" secondary={`${value.creationDate} ${value.user.name}`}></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        })}
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary="¿Hola, Cómo están?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="09:30 - Guillermo F"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="left" primary="Hey, muy bien, ¿qué tal vas tú?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="left" secondary="09:31- Susan Alvarez"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="left" primary="Hey, Guillermo, ¿cómo va todo?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="left" secondary="09:31- Juan Gaviria"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary="Genial, les queria preguntar, ¿qué harán mañana?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="09:30 - Guillermo F"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid container style={{padding: '20px'}}>
                        <Grid item xs={10}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth value={textValue}  onChange={(e) => setTextValue(e.target.value)}/>
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab style={{backgroundColor: 'var(--terciary)'}} onClick={() => handleSendMessage()} color="primary" aria-label="add"><SendIcon  /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>:
                <Button variant="contained" style={{width: '80%', backgroundColor: 'var(--secondary)'}} onClick={() => setShowChat(true)}>Chat</Button>
            }
            </Grid>
        </>
    );
}

const mapStateToProps = state => {
    return {
        groupState: state.group,
        user: state.user.userData,
        groupContent: state.groupContent,
    }
};

export default connect(mapStateToProps)(Chat);