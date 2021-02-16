import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import {sendCommentCreator} from "../../../store/groupContent/groupContentActions";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    containerMainComments: {
        height: '100px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px',
        paddingRight: '10px',
        paddingBottom: '10px'
    },
    containerContent: {
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '0 20px',
        background: '#efefef',
        width: '80%',
        height: '100%',
        borderRadius: '10px',
    },
    typography1: {
        fontSize: '18px',
        color: 'black',
        fontWeight: '700',
        marginTop: '5px;'
    },
    typography2: {
        fontSize: '18px',
        color: 'black',
        marginTop: '10px'
    },
    containerImg: {
        width: '20%',
        height: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgComments: {
        width: '30%',
        height: '60%',
        objectFit: 'cover',
        borderRadius: '100%'
    },
}));

function Comments(props) {
    const [textValue, setTextValue] = React.useState('');
    const handleSendMessage = (value) => {
        setTextValue('')
        props.dispatch(sendCommentCreator({content: textValue, idGroup: props.groupState.currentGroup.group.id, postId: props.postId}));
    }
    const classes = useStyles();
    if (!props.comments){
        return <Grid container style={{padding: '20px'}}>
            <Grid item xs={10}>
                <TextField id="outlined-basic-email" label="Type Something" fullWidth value={textValue}  onChange={(e) => setTextValue(e.target.value)}/>
            </Grid>
            <Grid xs={1} align="right">
                <Fab style={{backgroundColor: 'var(--terciary)'}} onClick={() => handleSendMessage()} color="primary" aria-label="add"><SendIcon  /></Fab>
            </Grid>
        </Grid>
    }
    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <Grid item xs={10}>
                    <TextField id="outlined-basic-email" label="Type Something" fullWidth value={textValue}  onChange={(e) => setTextValue(e.target.value)}/>
                </Grid>
                <Grid xs={1} align="right">
                    <Fab style={{backgroundColor: 'var(--terciary)'}} onClick={() => handleSendMessage()} color="primary" aria-label="add"><SendIcon  /></Fab>
                </Grid>
            </Grid>
            {props.comments.map((value, index) => {
                return <Box className={classes.containerMainComments} key={index} >
                <Box className={classes.containerImg}>
                <img className={classes.imgComments} src={value.user.photo} alt=""/>
                </Box>
                <Box className={classes.containerContent}>
                <Typography className={classes.typography1}>
                    {value.user.name}
                </Typography>
                <Typography className={classes.typography2}>
                    {value.value}
                </Typography>
                </Box>
                </Box>
            })}
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

export default connect(mapStateToProps)(Comments);
