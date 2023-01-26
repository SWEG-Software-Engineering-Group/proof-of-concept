export { default as hello } from './hello';
export { default as getTenant } from './tenant/gettenants';
export { default as tentantUsers } from './tenant/getTenantUsers';
export { default as createTenant } from './tenant/createtenant';
export { default as deleteTenant } from './tenant/delete';
export { default as updateTenant } from './tenant/updateTenant';
export { default as newUser } from './user/newUser';
export { default as getUsers } from './user/getUser';
export { default as dbDeleteUser } from './user/deleteUser';
export { default as gettenants } from './user/getTenants';
export { default as getText } from './text/get/Textoriginal';
export { default as getTextlang } from './text/get/TextLanguage';
export { default as getallText } from './text/get/allTexts';
export { default as insertText } from './text/post/insertoriginaltext';
export { default as inserttranslation } from './text/post/insertTranslation';
export { default as getTextuntranslated } from './text/get/UntranslatedText';
export { default as singleTenantinfo } from './tenant/getTenantInfo';
export { default as deleteTextTranslation } from './text/delete/TextTranslated';
export { default as deleteTextOriginal } from './text/delete/TextOriginal';
export { default as updateText } from './text/put/editText';