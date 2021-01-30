import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React from "react";
import HeaderGroupPrincipal from "./HeaderGroupPrincipal";
import RecipeReviewCard from "./Card";
import Chat from "./Chat";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        marginTop: theme.spacing(4),
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function GroupPrincipal() {
    const classes = useStyles();

    return (
        <>
            <Container component="main" maxWidth={"md"} className={classes.container}>
                <HeaderGroupPrincipal />
                <RecipeReviewCard />
                <RecipeReviewCard />
                <RecipeReviewCard />
                <Chat />
            </Container>
        </>

    );
}
