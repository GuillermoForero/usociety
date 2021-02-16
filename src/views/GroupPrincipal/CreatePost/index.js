import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {red} from '@material-ui/core/colors';
import {Box, Button, FormControl, MenuItem, Select, TextField} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import {CreatePostCreator} from "../../../store/groupContent/groupContentActions";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        position: 'relative',
        marginTop: '40px'
    },
    media: {
        backgroundSize: 'contain',
        height: '300px'
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
    formControl: {
        marginLeft: '73px',
        marginTop: '-20px',
        height: '40px'
    },
}));

function CreatePost(props) {
    const classes = useStyles();
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [valueSelect, setValueSelect] = useState(0);
    const handleClickButtonAddPhoto = () => {
            const fileInput = document.getElementById('fileInput');
            if (fileInput) {
                fileInput.click();
            }
        }
    const handleSelectFile = async (file) => {
        if (file && file[0]){
            var reader = new FileReader();
            reader.onload = function (e) {
                setImage(e.target.result);
            };

            reader.readAsDataURL(file[0]);
        }
    };
    const handleSubmit = () => {
        props.dispatch(CreatePostCreator({image: image, groupId: props.groupState.currentGroup.group.id, isPublic: valueSelect === 0, value: text}));
    }
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                title="Guillermo Forero"
            />
            <FormControl variant="filled" className={classes.formControl}>
                <Select
                    style={{height: '40px'}}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={valueSelect}
                    onChange={(e) => setValueSelect(e.target.value)}
                >
                    <MenuItem value={0}>Público</MenuItem>
                    <MenuItem value={1}>Privado</MenuItem>
                </Select>
            </FormControl>
            <CardMedia
                className={classes.media}
                image={image}
                style={{display: image? "block": "none"}}
                title="Paella dish"
            />
            <CardContent>
                <TextField
                    id="filled-textarea"
                    placeholder="¿Sobre qué quieres hablar?"
                    multiline
                    fullWidth
                    onChange={(e) => setText(e.target.value)}
                    style={{color: 'black'}}
                />
            </CardContent>
            <CardActions disableSpacing style={{justifyContent: 'space-between'}}>
                <IconButton aria-label="add to favorites" onClick={handleClickButtonAddPhoto}>
                    <ImageIcon />
                </IconButton>
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }}
                    title="inputFile"
                    accept="image/*"
                    onChange={event => handleSelectFile(event.target.files)}
                    alt="input image"
                />
                <Button type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        style={{backgroundColor: 'var(--primary)', width: '20%'}}
                        className={classes.submit}>Publicar</Button>
            </CardActions>
        </Card>
    );
}
const mapStateToProps = state => {
    return {
        groupState: state.group,
        user: state.user.userData,
    }
};

export default connect(mapStateToProps)(CreatePost);