import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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
        width: '40%',
        height: '60%',
        objectFit: 'cover',
        borderRadius: '100%'
    },
}));

export default function Comments() {
    const classes = useStyles();

    return (
        <>
            <Box className={classes.containerMainComments}>
                <Box className={classes.containerImg}>
                    <img className={classes.imgComments} src="https://api.time.com/wp-content/uploads/2017/12/terry-crews-person-of-year-2017-time-magazine-2.jpg" alt=""/>
                </Box>
                <Box className={classes.containerContent}>
                    <Typography className={classes.typography1}>
                        Guillermo Forero
                    </Typography>
                    <Typography className={classes.typography2}>
                        Me gusta esto, muchas gracias
                    </Typography>
                </Box>
            </Box>
            <Box className={classes.containerMainComments}>
                <Box className={classes.containerImg}>
                    <img className={classes.imgComments} src="https://api.time.com/wp-content/uploads/2017/12/terry-crews-person-of-year-2017-time-magazine-2.jpg" alt=""/>
                </Box>
                <Box className={classes.containerContent}>
                    <Typography className={classes.typography1}>
                        Laura
                    </Typography>
                    <Typography className={classes.typography2}>
                        Oye, se ve muy interesante, voy a revisara a ver qué tal está, muchas gracias
                    </Typography>
                </Box>
            </Box>
        </>

    );
}
