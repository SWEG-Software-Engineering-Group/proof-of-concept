import React, { useState, useEffect } from "react";
import {FormControl, Select, MenuItem, InputLabel, SelectChangeEvent, Typography} from "@mui/material";


export default function LanguagePicker() {
    //hooks
    const [language, setLanguage] = useState<string>('English');

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
        <FormControl fullWidth>
            <InputLabel id="language-elect-label">Language</InputLabel>
            <Select
                labelId="language-select-label"
                id="language-select"
                value={language}
                label="Language"
                onChange={handleChange}
            >
                <MenuItem value={'English'}>English <Typography aria-hidden='true'>&nbsp;🇬🇧/🇺🇲</Typography></MenuItem>
                <MenuItem value={'Italian'}>Italiano <Typography aria-hidden='true'>&nbsp;🇮🇹</Typography></MenuItem>
                <MenuItem value={'Japanese'}>日本語 <Typography aria-hidden='true'>&nbsp;🇯🇵</Typography></MenuItem>
                <MenuItem value={'Chinese'}>中文 <Typography aria-hidden='true'>&nbsp;🇨🇳</Typography></MenuItem>
            </Select>
        </FormControl>
    )
}