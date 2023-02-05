import {useState} from "react";
import {Card, Grid, CardActionArea, CardContent, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import TranslationFolderAdminActions from "./TranslationFolderAdminActions";
import { palette } from "@mui/system";

export default function TranslationFolder(props:any) {
//hooks
const [title, setTitle] = useState<string>('lorem ipsum');
const [userType, setUserType] = useState<string>('admin');
const {folderId} : {folderId : string} = props;
//logics

//ui
    return(
        <Grid item xs={6} sm={3}>  
            <Card sx={{bgcolor: 'primary.main'}}>
                <Link to={`/todo/${folderId}`} style={{textDecoration:"none"}}>
                <CardActionArea>
                    <CardContent>
                        <Typography>{folderId}</Typography>
                        <Typography variant="h6" sx={{overflow:'scroll', color: 'text.secondary', minHeight:'4rem', maxHeight:'4rem'}}>
                            Header section texts blah blah asjda
                        </Typography>
                    </CardContent>
                    <Typography sx={{color: 'text.disabled', margin:0, padding:'0 1rem'}}>Folder</Typography>
                </CardActionArea>
                </Link>
                {userType == 'admin' ? <TranslationFolderAdminActions folderId={folderId}/> : null}
            </Card>
        </Grid>
    )
}