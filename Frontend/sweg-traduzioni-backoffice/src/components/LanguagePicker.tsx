import React, { useState, useEffect } from "react";
import {FormControl, Select, MenuItem, InputLabel, SelectChangeEvent, Typography} from "@mui/material";


export default function LanguagePicker(props : any) {
    //hooks
    const [language, setLanguage] = useState<string>(props.default);

    //logics
    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as string);
    };

    // useEffect(() => {
    //   return () => {
    //     language
    //   }
    // }, [language])
    

    //ui
    return (
        <FormControl fullWidth sx={{margin:".5rem"}}>
            <InputLabel id="language-elect-label">Language</InputLabel>
            <Select
                labelId="language-select-label"
                id="language-select"
                value={language}
                label="Language"
                onChange = {(e) => {
                    props.handleLanguageChange(e);
                    setLanguage(e.target.value);
                }}
            >
                <MenuItem value={'English'}>English <Typography display={'inline'} aria-hidden='true'>&nbsp;🇬🇧/🇺🇲</Typography></MenuItem>
                <MenuItem value={'Italian'}>Italiano <Typography display={'inline'} aria-hidden='true'>&nbsp;🇮🇹</Typography></MenuItem>
                <MenuItem value={'Japanese'}>日本語 <Typography display={'inline'} aria-hidden='true'>&nbsp;🇯🇵</Typography></MenuItem>
                <MenuItem value={'Chinese'}>中文 <Typography display={'inline'} aria-hidden='true'>&nbsp;🇨🇳</Typography></MenuItem>
            </Select>
        </FormControl>
    )
}