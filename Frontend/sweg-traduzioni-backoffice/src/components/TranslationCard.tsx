import {useState} from "react";
import {Card, Grid, CardActionArea, CardContent, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import TranslationCardAdminActions from "./TranslationCardAdminActions";


export default function TranslationCard(props: any) {
//hooks
const [text, setText] = useState<string>(props.text);
const {translationId} : {translationId : string} = props;

//logics

//ui
    return(
        <Grid item xs={12} sm={4}>            
                {(props.blocked) 
                ? 
                <Card sx={{bgcolor:'#999999', color:'text.disabled'}}>
                {/* <Typography sx={{color: 'text.disabled', margin:0, padding:'1rem 1rem 0rem'}}>Text {translationId}</Typography>                 */}
                <CardActionArea>
                    <CardContent>
                        <Typography sx={{overflow:'scroll', minHeight:'7rem',  maxHeight:'7em'}}>
                            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorum excepturi, illum explicabo veritatis atque architecto. Suscipit odio culpa qui fugiat labore id exercitationem autem assumenda, quisquam voluptatibus fuga porro. */}
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                    <TranslationCardAdminActions translationId={translationId}/>
                </Card>
                : 
                
                <Card>
                    {/* <Typography sx={{color: 'text.disabled', margin:0, padding:'1rem 1rem 0rem'}}>Text {translationId}</Typography>                 */}
                    <Link to={`/todo/translate/${props.language}/${translationId}`} style={{textDecoration:"none"}}>
                    <CardActionArea>
                        <CardContent>
                            <Typography sx={{overflow:'scroll', minHeight:'7rem',  maxHeight:'7em'}}>
                                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorum excepturi, illum explicabo veritatis atque architecto. Suscipit odio culpa qui fugiat labore id exercitationem autem assumenda, quisquam voluptatibus fuga porro. */}
                                {text}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Link>
                    <TranslationCardAdminActions translationId={translationId}/>
                </Card>
                }                
        </Grid>
    )
}