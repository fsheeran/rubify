export const hanRegExp = new RegExp(/\p{Script=Han}/u);
export const notHanRegExp = new RegExp(/\P{Script=Han}/u);
export const allCjkRegExp = new RegExp(/^[\p{Script=Han}\p{Script=Bopo}\p{Script=Hangul}\p{Script=Hiragana}\p{Script=Katakana}]+$/u);