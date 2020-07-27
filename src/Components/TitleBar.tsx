import React, {useState} from 'react'
import {Grid, makeStyles, Typography} from "@material-ui/core";


const useStyles = makeStyles(() => ({
    text: {
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold'
    },
    divider: {
        width: '600px',
        height: '1px',
        backgroundColor: '#CECECE'
    },
    text_sm: {
        color: 'white',
        fontSize: '15px',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'capitalize',
        marginRight: '3px'
    },
    endTextContainer: {
        color: 'white',
        display: 'inline-flex',
        '& svg': {
            height: '19px',
            marginBottom: '1px',
            alignSelf: 'center',
            '&:hover': {
                cursor: 'pointer',
                marginBottom: '3px'
            }
        }
    }
}));

interface Props {
    title: string,
    endIcon?: JSX.Element,
    endText?: string,
    titleEditable: boolean
    titleChange?: (newTitle: string) => void
}

export default function TitleBar(props: Props) {
    const classes = useStyles();
    const [title, setTitle] = useState(props.title)

    return (
        <div style={{margin: 'auto', marginTop: '30px'}}>
            <Grid container direction={"row"} justify={"space-between"}>
                <Typography className={classes.text}>{title}</Typography>
                <div className={classes.endTextContainer}>
                    <Typography className={classes.text_sm}>
                        {props.endText}
                    </Typography>
                    {props.endIcon}
                </div>
            </Grid>
            <div className={classes.divider}/>
        </div>
    )
}
