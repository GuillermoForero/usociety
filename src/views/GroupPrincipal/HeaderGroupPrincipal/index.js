import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React from "react";
import {Box, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";

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
        width: '50%',
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
                    <img className={classes.imgImg} src="https://concepto.de/wp-content/uploads/2013/08/matematicas-e1551990337130.jpg" alt=""/>
                </Box>
                <Box className={classes.containerContent}>
                    <Box className={classes.textContainer}>
                        <Typography className={classes.typography1}>
                            {props.currentGroup.name}
                        </Typography>
                        <Typography className={classes.subtitle}>
                            Descripción:
                        </Typography>
                        <Typography className={classes.typography2}>
                            {props.currentGroup.description}
                        </Typography>
                        <Typography className={classes.subtitle}>
                            Objetivos:
                        </Typography>
                        <ul className={classes.objetives}>
                            {props.currentGroup.objetives.map((value, index) => {
                                return <li key={index} className={classes.objetivesLi}>{value}</li>;
                            })}
                        </ul>
                    </Box>
                    <Box className={classes.buttonsContainer}>
                        {props.user.type === 'admin'?<><Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{backgroundColor: 'var(--primary)', marginBottom: '10px'}}
                            className={classes.submit}
                        >Unirse</Button> <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{backgroundColor: 'var(--primary)', textAlign: 'center'}}
                            className={classes.submit}
                            onClick={() => props.handleCreatePost(true)}
                        >Crear Post</Button></> : <Button
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
        group: state.group,
        user: state.user.userData,
        currentGroup: state.currentGroup
    }
};

export default connect(mapStateToProps)(HeaderGroupPrincipal);
