import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React from "react";
import {Box, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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
        marginTop: '10px'
    },
    container: {
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        borderRadius: '4px',
        paddingLeft: '0',
        paddingRight: '0',
        overflow: 'hidden'
    }
}));

export default function HeaderGroupPrincipal() {
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
                            Matemáticas
                        </Typography>
                        <Typography className={classes.typography2}>
                            Descripción: Este grupo es el grupo de matemáticas, unete si te apasionan las matematicas o simplemente quieres mejorar en ellas
                        </Typography>
                        <Typography className={classes.typography2}>
                            Objetivos: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, blanditiis culpa debitis earum et hic incidunt ipsa laborum laudantium magni maiores neque obcaecati ratione recusandae similique tempora ut vel vero!
                        </Typography>
                    </Box>
                    <Box className={classes.buttonsContainer}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >Unirse</Button>
                    </Box>
                </Box>
            </Container>
        </>

    );
}
