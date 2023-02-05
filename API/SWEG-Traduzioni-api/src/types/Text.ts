interface Text {
    key: string;
    group: string;
    text: string;
    comment: string;
    review:Text;
}
interface languageText {
    tenantName: string;
    language: string;
    original:boolean;
    texts:Array<Text>;
}

export { languageText,Text };