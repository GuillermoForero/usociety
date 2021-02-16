import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React, {useEffect, useState} from "react";
import HeaderGroupPrincipal from "./HeaderGroupPrincipal";
import PostCard from "./Card";
import Chat from "./Chat";
import {useParams} from "react-router";
import CreatePost from "./CreatePost";
import {connect} from "react-redux";
import * as actionTypes from "../../store/actionsTypes";
import {getGroupCreator} from "../../store/group/groupActions";
import Loader from "../../components/Loader/Loader";
import PageError from "../../components/PageError/PageError";
import {getMessagesCreator, loadPostsCreator} from "../../store/groupContent/groupContentActions";

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

function GroupPrincipal(props) {
    const classes = useStyles();
    const {slug} = useParams();
    const [showCreatePost, setShowCreatePost] = useState(false);
    useEffect(() => {
        props.dispatch({type: actionTypes.SET_MAIN_TITLE, payload: {title: 'U Society - Sergio Arboleda'}});
        props.dispatch(getGroupCreator(slug));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if(props.groupState.currentGroup.group){
            props.dispatch(loadPostsCreator({groupId: props.groupState.currentGroup.group.id}));
            props.dispatch(getMessagesCreator({groupId: props.groupState.currentGroup.group.id}));
        }
    },[props.groupState.currentGroup])
    console.log(props.groupContent)
    return (
        <>
            <Loader isOpen={props.groupState.isLoading}/>
            <PageError
                isOpen={props.groupState.hasError}
                errorDescription={props.groupState.errorDescription}/>
            {props.groupState.operationCompleted && <Container component="main" maxWidth={"md"} className={classes.container}>
                <HeaderGroupPrincipal handleCreatePost={setShowCreatePost} />
                {showCreatePost && <CreatePost />}
                {props.groupContent.posts.map((post, index) => {
                    return <PostCard {...post} />
                })}
                <Chat />
            </Container>}
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

export default connect(mapStateToProps)(GroupPrincipal);