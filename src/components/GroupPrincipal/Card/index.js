import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Box, SvgIcon} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '80%',
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

export default function RecipeReviewCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [showReactContainer1, setShowReactContainer1] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            {showReactContainer1?
            <Box className={classes.reactContainer} onMouseLeave={() => setShowReactContainer1(false)}>
                <img className={classes.reactImage} src={'https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb'}/>
                <img className={classes.reactImage} src={'https://static-exp1.licdn.com/sc/h/1zk00q5n4o055s08tjpy4rswf'} />
                <img className={classes.reactImage} src={'https://static-exp1.licdn.com/sc/h/6xvr3hrj4c24dak8r7z64pgj3'} />
                <img className={classes.reactImage} src={'https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97'} />
                <img className={classes.reactImage} src={'https://static-exp1.licdn.com/sc/h/9wjxk9w5wguhpev3dm13672dq'} />
                <img className={classes.reactImage} src={'https://static-exp1.licdn.com/sc/h/3tn3hb1r3nls9c4ddwbg2pymr'} />
            </Box>: null
            }
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Guillermo Forero"
                subheader="Enero 14, 2021"
            />
            <CardMedia
                className={classes.media}
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    beneficios de la meditación son muy variados y su práctica puede ayudarnos en numerosas ocasiones. Gracias a la meditación logramos relajarnos, pues no consiste en concentrarse o enfocarse en los pensamientos. Más bien todo lo contrario. Se trata de soltar y dejar ir la mente, de lograr tranquilidad.

                    Los efectos fisiológicos de practicar la meditación en nuestro organismo son muy concretos. Además, cada vez hay más estudios clínicos y científicos que avalan la existencia de dichos efectos.

                    La ventaja de la meditación es que puedes practicar muchas formas diferentes y que la mayoría no requieren de un equipo especializado ni de demasiado espacio. Para practicarlo sólo necesitas unos minutos al día.
                </Typography>
            </CardContent>
            <Box className={classes.reactions}>
                <img className={classes.imgReactions} src={'https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb'}/>
                <img className={classes.imgReactions} src={'https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97'} />
            <Typography className={classes.typoReactions}>20</Typography>
            <Typography className={classes.typoReactions}>·</Typography>
            <Typography className={classes.typoReactions}>2 comentarios</Typography>
            </Box>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <ThumbUpIcon
                        onMouseOver={() => {setShowReactContainer1(true)}}/>
                </IconButton>
                <IconButton aria-label="share">
                    <CommentIcon />
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
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                        and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                        pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                        without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                        medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                        again without stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}