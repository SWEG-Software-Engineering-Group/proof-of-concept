interface Text {
    key: string;
    group: string;
    text: string;
    comment: string;
}
interface languageText {
    tenantName: string;
    language: string;
    original:boolean;
    texts:Array<Text>;
}

export { languageText,Text };