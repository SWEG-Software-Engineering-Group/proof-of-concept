import React, { useState, useEffect } from "react";
import {FormControl, Select, MenuItem, InputLabel, SelectChangeEvent, Typography} from "@mui/material";


export default function LanguagePicker(props : any) {
    //hooks
    const [language, setLanguage] = useState<string>(props.default);

    //logics
    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value);
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

            {props.secondaryLanguages === undefined
            
            ?

            <Select
                labelId="language-select-label"
                id="language-select"
                value={language ? language : ''}
                label="Language"
                onChange = {(e) => {
                    console.log(e);
                    props.handleLanguageChange(e);
                    setLanguage(e.target.value);
                }}
            >
                {/* <MenuItem value={'English'}>English <span aria-hidden='true'>&nbsp;🇬🇧/🇺🇲</span></MenuItem>
                <MenuItem value={'Italian'}>Italiano <span aria-hidden='true'>&nbsp;🇮🇹</span></MenuItem>
                <MenuItem value={'Japanese'}>日本語 <span aria-hidden='true'>&nbsp;🇯🇵</span></MenuItem>
                <MenuItem value={'Chinese'}>中文 <span aria-hidden='true'>&nbsp;🇨🇳</span></MenuItem> */}

                <MenuItem value={"Afrikaans"}>Afrikaans <span aria-hidden='true'>&nbsp;🇿🇦</span></MenuItem>
                <MenuItem value={"Albanian"}>Albanian <span aria-hidden='true'>&nbsp;🇦🇱</span></MenuItem>
                <MenuItem value={"Arabic"}>Arabic <span aria-hidden='true'>&nbsp;🇸🇦</span></MenuItem>
                <MenuItem value={"Armenian"}>Armenian <span aria-hidden='true'>&nbsp;🇦🇲</span></MenuItem>
                {/* <MenuItem value={"Basque"}>Basque <span aria-hidden='true'>&nbsp;</span></MenuItem> */}
                {/* <MenuItem value={"Bengali"}>Bengali <span aria-hidden='true'>&nbsp;</span></MenuItem> */}
                <MenuItem value={"Bulgarian"}>Bulgarian <span aria-hidden='true'>&nbsp;🇧🇬</span></MenuItem>
                {/* <MenuItem value={"Catalan"}>Catalan <span aria-hidden='true'>&nbsp;</span></MenuItem> */}
                <MenuItem value={"Cambodian"}>Cambodian <span aria-hidden='true'>&nbsp;🇰🇭</span></MenuItem>
                <MenuItem value={"Chinese (Mandarin)"}>Chinese (Mandarin) <span aria-hidden='true'>&nbsp;🇨🇳</span></MenuItem>
                <MenuItem value={"Croatian"}>Croatian <span aria-hidden='true'>&nbsp;🇭🇷</span></MenuItem>
                <MenuItem value={"Czech"}>Czech <span aria-hidden='true'>&nbsp;🇨🇿</span></MenuItem>
                <MenuItem value={"Danish"}>Danish <span aria-hidden='true'>&nbsp;🇩🇰</span></MenuItem>
                <MenuItem value={"Dutch"}>Dutch <span aria-hidden='true'>&nbsp;🇳🇱</span></MenuItem>
                <MenuItem value={"English"}>English <span aria-hidden='true'>&nbsp;🇬🇧/🇺🇲</span></MenuItem>
                <MenuItem value={"Estonian"}>Estonian <span aria-hidden='true'>&nbsp;🇪🇪</span></MenuItem>
                <MenuItem value={"Fiji"}>Fiji <span aria-hidden='true'>&nbsp;🇫🇯</span></MenuItem>
                <MenuItem value={"Finnish"}>Finnish <span aria-hidden='true'>&nbsp;🇫🇮</span></MenuItem>
                <MenuItem value={"French"}>French <span aria-hidden='true'>&nbsp;🇫🇷</span></MenuItem>
                <MenuItem value={"Georgian"}>Georgian <span aria-hidden='true'>&nbsp;🇬🇪</span></MenuItem>
                <MenuItem value={"German"}>German <span aria-hidden='true'>&nbsp;🇩🇪</span></MenuItem>
                <MenuItem value={"Greek"}>Greek <span aria-hidden='true'>&nbsp;🇬🇷</span></MenuItem>
                {/* <MenuItem value={"Gujarati"}>Gujarati <span aria-hidden='true'>&nbsp;</span></MenuItem> */}
                <MenuItem value={"Hebrew"}>Hebrew <span aria-hidden='true'>&nbsp;🇮🇱</span></MenuItem>
                <MenuItem value={"Hindi"}>Hindi <span aria-hidden='true'>&nbsp;🇮🇳</span></MenuItem>
                <MenuItem value={"Hungarian"}>Hungarian <span aria-hidden='true'>&nbsp;🇭🇺</span></MenuItem>
                <MenuItem value={"Icelandic"}>Icelandic <span aria-hidden='true'>&nbsp;🇮🇸</span></MenuItem>
                <MenuItem value={"Indonesian"}>Indonesian <span aria-hidden='true'>&nbsp;🇮🇩</span></MenuItem>
                <MenuItem value={"Irish"}>Irish <span aria-hidden='true'>&nbsp;</span>🇮🇪</MenuItem>
                <MenuItem value={"Italian"}>Italian <span aria-hidden='true'>&nbsp;🇮🇹</span></MenuItem>
                <MenuItem value={"Japanese"}>Japanese <span aria-hidden='true'>&nbsp;🇯🇵</span></MenuItem>
                {/* <MenuItem value={"Javanese"}>Javanese <span aria-hidden='true'>&nbsp;</span></MenuItem> */}
                <MenuItem value={"Korean"}>Korean <span aria-hidden='true'>&nbsp;🇰🇷</span></MenuItem>
                {/* <MenuItem value={"Latin"}>Latin <span aria-hidden='true'>&nbsp;</span></MenuItem> */}
                <MenuItem value={"Latvian"}>Latvian <span aria-hidden='true'>&nbsp;🇱🇻</span></MenuItem>
                <MenuItem value={"Lithuanian"}>Lithuanian <span aria-hidden='true'>&nbsp;🇱🇹</span></MenuItem>
                <MenuItem value={"Macedonian"}>Macedonian <span aria-hidden='true'>&nbsp;🇲🇰</span></MenuItem>
                <MenuItem value={"Malay"}>Malay <span aria-hidden='true'>&nbsp;</span>🇲🇾</MenuItem>
                {/* <MenuItem value={"Malayalam"}>Malayalam <span aria-hidden='true'>&nbsp;</span></MenuItem> */}
                <MenuItem value={"Maltese"}>Maltese <span aria-hidden='true'>&nbsp;🇲🇾</span></MenuItem>
                {/* <MenuItem value={"Maori"}>Maori <span aria-hidden='true'>&nbsp;</span></MenuItem> */}
                {/* <MenuItem value={"Marathi"}>Marathi <span aria-hidden='true'>&nbsp;</span></MenuItem> */}
                <MenuItem value={"Mongolian"}>Mongolian <span aria-hidden='true'>&nbsp;🇲🇳</span></MenuItem>
                <MenuItem value={"Nepali"}>Nepali <span aria-hidden='true'>&nbsp;🇳🇵</span></MenuItem>
                <MenuItem value={"Norwegian"}>Norwegian <span aria-hidden='true'>&nbsp;🇳🇴</span></MenuItem>
                <MenuItem value={"Persian"}>Persian <span aria-hidden='true'>&nbsp;🇮🇷</span></MenuItem>
                <MenuItem value={"Polish"}>Polish <span aria-hidden='true'>&nbsp;🇵🇱</span></MenuItem>
                <MenuItem value={"Portuguese"}>Portuguese <span aria-hidden='true'>&nbsp;🇵🇹</span></MenuItem>
                {/* <MenuItem value={"Punjabi"}>Punjabi <span aria-hidden='true'>&nbsp;</span></MenuItem> */}
                {/* <MenuItem value={"Quechua"}>Quechua <span aria-hidden='true'>&nbsp;</span></MenuItem> */}
                <MenuItem value={"Romanian"}>Romanian <span aria-hidden='true'>&nbsp;🇷🇴</span></MenuItem>
                <MenuItem value={"Russian"}>Russian <span aria-hidden='true'>&nbsp;🇷🇺</span></MenuItem>
                <MenuItem value={"Samoan"}>Samoan <span aria-hidden='true'>&nbsp;🇼🇸</span></MenuItem>
                <MenuItem value={"Serbian"}>Serbian <span aria-hidden='true'>&nbsp;🇷🇸</span></MenuItem>
                <MenuItem value={"Slovak"}>Slovak <span aria-hidden='true'>&nbsp;🇸🇰</span></MenuItem>
                <MenuItem value={"Slovenian"}>Slovenian <span aria-hidden='true'>&nbsp;🇸🇮</span></MenuItem>
                <MenuItem value={"Spanish"}>Spanish <span aria-hidden='true'>&nbsp;🇪🇸</span></MenuItem>
                <MenuItem value={"Swahili"}>Swahili <span aria-hidden='true'>&nbsp;🇰🇪</span></MenuItem>
                <MenuItem value={"Swedish "}>Swedish  <span aria-hidden='true'>&nbsp;🇸🇪</span></MenuItem>
                <MenuItem value={"Tamil"}>Tamil <span aria-hidden='true'>&nbsp;🇱🇰</span></MenuItem>
                {/* <MenuItem value={"Tatar"}>Tatar <span aria-hidden='true'>&nbsp;</span></MenuItem> */}
                {/* <MenuItem value={"Telugu"}>Telugu <span aria-hidden='true'>&nbsp;</span></MenuItem> */}
                <MenuItem value={"Thai"}>Thai <span aria-hidden='true'>&nbsp;🇹🇭</span></MenuItem>
                {/* <MenuItem value={"Tibetan"}>Tibetan <span aria-hidden='true'>&nbsp;</span></MenuItem> */}
                <MenuItem value={"Tonga"}>Tonga <span aria-hidden='true'>&nbsp;🇹🇴</span></MenuItem>
                <MenuItem value={"Turkish"}>Turkish <span aria-hidden='true'>&nbsp;🇹🇷</span></MenuItem>
                <MenuItem value={"Ukrainian"}>Ukrainian <span aria-hidden='true'>&nbsp;🇺🇦</span></MenuItem>
                <MenuItem value={"Urdu"}>Urdu <span aria-hidden='true'>&nbsp;🇵🇰</span></MenuItem>
                <MenuItem value={"Uzbek"}>Uzbek <span aria-hidden='true'>&nbsp;🇺🇿</span></MenuItem>
                <MenuItem value={"Vietnamese"}>Vietnamese <span aria-hidden='true'>&nbsp;🇻🇳</span></MenuItem>
                <MenuItem value={"Welsh"}>Welsh <span aria-hidden='true'>&nbsp;🏴󠁧󠁢󠁷󠁬󠁳󠁿</span></MenuItem>
                <MenuItem value={"Xhosa"}>Xhosa <span aria-hidden='true'>&nbsp;🇱🇸/🇿🇦</span></MenuItem>

            </Select>
            
            :

            <Select
                labelId="language-select-label"
                id="language-select"
                value={language ? language : ''}
                label="Language"
                onChange = {(e) => {
                    console.log(e);
                    props.handleLanguageChange(e);
                    setLanguage(e.target.value);
                }}
            >
                {props.secondaryLanguages.map((secondaryLanguage : string) => <MenuItem key={secondaryLanguage} value={secondaryLanguage}>{secondaryLanguage}</MenuItem>)}
            </Select>

            }
        </FormControl>
    )
}