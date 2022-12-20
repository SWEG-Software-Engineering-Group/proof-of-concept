import {useState} from "react";

export default function TranslationCard() {
//hooks

const [text, setText] = useState<string>('A');

//logics
const updateText = (text:string) =>{
    text=='A' ? setText('M') : setText(text+'H');
    return 1;
} 

//ui
    return(
        <div onClick={ () => updateText(text)}>
            {text}
        </div>
    )
}