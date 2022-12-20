import {useState} from "react";
import {Card, Grid, CardActionArea, CardContent, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import TranslationCardAdminActions from "./TranslationCardAdminActions";


export default function TranslationCard() {
//hooks
const [text, setText] = useState<string>('lorem ipsum');
const [userType, setUserType] = useState<string>('admin');

//logics

//ui
    return(
        <Grid item xs={12} sm={4}>            
            <Card>
                <Link to="/" style={{textDecoration:"none"}}>
                <CardActionArea>
                    <CardContent>
                        <Typography sx={{overflow:'scroll', minHeight:'7rem',  maxHeight:'7em'}}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorum excepturi, illum explicabo veritatis atque architecto. Suscipit odio culpa qui fugiat labore id exercitationem autem assumenda, quisquam voluptatibus fuga porro.
                        </Typography>
                    </CardContent>
                    <Typography sx={{color: 'text.disabled', margin:0, padding:'0 1rem'}}>Text</Typography>
                </CardActionArea>
                </Link>
                {userType == 'admin' ? <TranslationCardAdminActions/>: null}
            </Card>
        </Grid>
    )
}