import {useState} from "react";
import {Card, Grid, CardActionArea, CardContent, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import TranslationFolderAdminActions from "./TranslationFolderAdminActions";
import { Palette } from "@mui/icons-material";

export default function TranslationFolder(props:any) {
//hooks
const [title, setTitle] = useState<string>('lorem ipsum');
const [userType, setUserType] = useState<string>('admin');
const {folderId} = props;
//logics

//ui
    return(
        <Grid item xs={12} sm={4} sx={{}}>  
            <Card sx={{bgcolor: 'primary.main'}}>
                <Typography>{folderId}</Typography>
                <Link to="/" style={{textDecoration:"none"}}>
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h4" maxHeight={'7em'} sx={{overflow:'scroll', color: 'text.secondary', minHeight:'7rem'}}>
                            Header section texts
                        </Typography>
                    </CardContent>
                    <Typography sx={{color: 'text.disabled', margin:0, padding:'0 1rem'}}>Folder</Typography>
                </CardActionArea>
                </Link>
                {userType == 'admin' ? <TranslationFolderAdminActions/> : null}
            </Card>
        </Grid>
    )
}