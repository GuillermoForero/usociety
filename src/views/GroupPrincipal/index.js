import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React, {useState} from "react";
import HeaderGroupPrincipal from "./HeaderGroupPrincipal";
import RecipeReviewCard from "./Card";
import Chat from "./Chat";
import {useHistory, useParams} from "react-router";
import CreatePost from "./CreatePost";

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
        backgroundColor: 'var(--primary)',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function GroupPrincipal(props) {
    const classes = useStyles();
    const {slug} = useParams();
    const [showCreatePost, setShowCreatePost] = useState(false)
    return (
        <>
            <Container component="main" maxWidth={"md"} className={classes.container}>
                {showCreatePost && <CreatePost />}
                <HeaderGroupPrincipal handleCreatePost={setShowCreatePost} />
                <RecipeReviewCard />
                <RecipeReviewCard />
                <RecipeReviewCard />
                <Chat />
            </Container>
        </>

    );
}
