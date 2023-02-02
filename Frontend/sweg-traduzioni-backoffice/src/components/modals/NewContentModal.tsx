import React, { useState } from "react";
import { Button, Card } from "@mui/material";
import NewFolderModal from "./NewFolderModal";
import EmptyModal from "./EmptyModal";
import NewTextModal from "./NewTextModal";

export default function NewContentModal(props: any) {
    const [visibleModalA, setVisibleModalA] = useState<boolean>(false);
    const [visibleModalB, setVisibleModalB] = useState<boolean>(false);

    const closeInnerModal = (modal:string) =>{
        modal == 'a' ? setVisibleModalA(false) : setVisibleModalB(false);
    }
    const openInnerModal = (modal:string) =>{
        modal == 'a' ? setVisibleModalA(true) : setVisibleModalB(true);
    }

    return(
        <Card style={{
            margin:'1.5rem auto',
            minHeight:'calc(100% - 3rem)',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        }}>
            {/* <Button variant="contained" sx={{padding:'2rem', width:'200px'}} onClick={()=>setVisibleModalA(true)}>
                Create new Folder / Category
            </Button> */}
            <Button variant="contained" sx={{padding:'2rem', width:'200px'}} onClick={()=>setVisibleModalB(true)}>
                Create new Text
            </Button>


            {/* <EmptyModal open={visibleModalA} closeModal={()=>closeInnerModal('a')} openModal={()=>openInnerModal('a')} specificModal={<NewFolderModal closeModal={()=>closeInnerModal('a')} openModal={()=>openInnerModal('a')}/>}></EmptyModal> */}
            <EmptyModal open={visibleModalB} closeModal={()=>closeInnerModal('b')} openModal={()=>openInnerModal('b')} specificModal={<NewTextModal closeModal={()=>closeInnerModal('b')} openModal={()=>openInnerModal('b')}/>}></EmptyModal>
        </Card>           
    )
}
