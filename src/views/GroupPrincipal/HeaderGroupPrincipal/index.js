import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React from "react";
import {Box, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {ACTIVE} from "../../../store/group/groupInterfaces";

const useStyles = makeStyles((theme) => ({
    imageContainer: {
        height: '400px',
        width: '100%'
    },
    imgImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%'
    },
    buttonsContainer: {

    },
    containerContent: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        padding: '0 20px'
    },
    typography1: {
        fontSize: '40px',
        color: 'black',
        fontWeight: '700'
    },
    typography2: {
        fontSize: '15px',
        color: 'gray',
        marginTop: '5px'
    },
    container: {
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        padding: '10px 0',
        borderRadius: '4px',
        overflow: 'hidden'
    },
    submit: {
        justifyContent: 'center'
    },
    subtitle: {
        fontSize: '25px',
        color: 'black',
        fontWeight: '700',
        marginTop: '10px'
    },
    objetives: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: '20px'
    },
    objetivesLi: {
        width: '100%',
        fontSize: '15px',
        color: 'gray',
    }
}));

function HeaderGroupPrincipal(props) {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth={"md"} className={classes.container}>
                <Box className={classes.imageContainer}>
                    <img className={classes.imgImg} src={props.groupState.currentGroup.group.photo} alt=""/>
                </Box>
                <Box className={classes.containerContent}>
                    <Box className={classes.textContainer}>
                        <Typography className={classes.typography1}>
                            {props.groupState.currentGroup.group.name}
                        </Typography>
                        <Typography className={classes.subtitle}>
                            Descripción:
                        </Typography>
                        <Typography className={classes.typography2}>
                            {props.groupState.currentGroup.group.description}
                        </Typography>
                        <Typography className={classes.subtitle}>
                            Objetivos:
                        </Typography>
                        <ul className={classes.objetives}>
                            {props.groupState.currentGroup.group.objectives.map((value, index) => {
                                return <li key={index} className={classes.objetivesLi}>{value}</li>;
                            })}
                        </ul>
                    </Box>
                    <Box className={classes.buttonsContainer}>
                        {props.groupState.currentGroup.isAdmin ?<><Link to={`/group/${props.groupState.currentGroup.group.slug}/management`}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{backgroundColor: 'var(--primary)', marginBottom: '10px'}}
                                className={classes.submit}
                            >Administrar</Button>
                        </Link> <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{backgroundColor: 'var(--primary)', textAlign: 'center'}}
                            className={classes.submit}
                            onClick={() => props.handleCreatePost(true)}
                        >Crear Post</Button></> :props.groupState.currentGroup.membershiptStatus? null: <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{backgroundColor: 'var(--primary)', marginBottom: '10px'}}
                                className={classes.submit}
                            >Unirse</Button>}
                    </Box>
                </Box>
            </Container>
        </>

    );
}
const mapStateToProps = state => {
    return {
        groupState: state.group,
        user: state.user.userData,
    }
};

export default connect(mapStateToProps)(HeaderGroupPrincipal);
