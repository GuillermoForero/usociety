import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import {Box} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";
import Comments from "../Comments";
import {CreatePostCreator, reactPostCreator} from "../../../store/groupContent/groupContentActions";
import {connect} from "react-redux";
import {isEmpty} from "lodash";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        position: 'relative',
        marginTop: '40px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    reactions: {
        height: '20px',
        paddingLeft: '20px',
        display: 'flex'
    },
    imgReactions: {
        height: '100%'
    },
    reactContainer: {
        height: '50px',
        padding: '2px 0',
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        bottom: '40px',
        left: '10px',
        background: 'white',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        borderRadius: '50px',
        zIndex: '2'
    },
    reactImage: {
        height: '100%',
        cursor: 'pointer'
    },
    typoReactions: {
        fontSize: '14px',
        color: '#666666',
        marginLeft: '5px'
    },
}));

function PostCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [showReactContainer1, setShowReactContainer1] = React.useState(false);
    const [showContainerComments, setShowContainerComments] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleReaction = (value) => {
        props.dispatch(reactPostCreator({postId: props.id, type: value}));
    }
    return (
        <Card className={classes.root}>
            {showReactContainer1?
            <Box className={classes.reactContainer} onMouseLeave={() => setShowReactContainer1(false)}>
                <img onClick={() => handleReaction("LIKE")} className={classes.reactImage} src={'https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb'}/>
                <img onClick={() => handleReaction("DISLIKE")} className={classes.reactImage} src={'https://static-exp1.licdn.com/sc/h/1zk00q5n4o055s08tjpy4rswf'} />
                <img onClick={() => handleReaction("ANGRY")} className={classes.reactImage} src={'https://static-exp1.licdn.com/sc/h/6xvr3hrj4c24dak8r7z64pgj3'} />
                <img onClick={() => handleReaction("LAUGH")} className={classes.reactImage} src={'https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97'} />
            </Box>: null
            }
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={props.user.photo}/>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.user.name}
                subheader={props.creationDate}
            />
            {props.content.type === "IMAGE" && <CardMedia
                className={classes.media}
                image={props.content.type === "IMAGE" ? props.content.value : ""}
                title="Paella dish"
            />}

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.content.type === "IMAGE" ? props.description : props.content.value}
                </Typography>
            </CardContent>
            <Box className={classes.reactions}>
                {!(isEmpty(props.reacts)) && <><img className={classes.imgReactions} src={'https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb'}/>
                    <img className={classes.imgReactions} src={'https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97'} />
                    <Typography className={classes.typoReactions}>{Object.values(props.reacts).reduce((a, b) => a + b)}</Typography>
                    <Typography className={classes.typoReactions}>·</Typography></>}
                {!(isEmpty(props.comments)) &&
                    <Typography className={classes.typoReactions}>{props.comments?.length} {' '}{'comentarios'}</Typography>
                }
            </Box>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <ThumbUpIcon
                        onMouseOver={() => {setShowReactContainer1(true)}}/>
                </IconButton>
                <IconButton aria-label="share">
                    <CommentIcon onClick={() => {setShowContainerComments(!showContainerComments)}}/>
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            {showContainerComments && <Comments comments={props.comments} postId={props.id}/>}
        </Card>
    );
}
const mapStateToProps = state => {
    return {
        groupState: state.group,
        user: state.user.data.user,
        groupContent: state.groupContent,
    }
};

export default connect(mapStateToProps)(PostCard);