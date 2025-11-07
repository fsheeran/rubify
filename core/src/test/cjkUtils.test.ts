import { expect, test } from 'vitest';
import { hanRegExp, allCjkRegExp } from '../lib/cjkUtils';

test('hanRegExp matches ideographs', () => {
    expect(hanRegExp.test('漢字')).toBe(true)
});

test('hanRegExp matches ideographs with non-ideographs', () => {
    expect(hanRegExp.test('吾輩は猫である')).toBe(true)
});

test('hanRegExp does not match kana', () => {
    expect(hanRegExp.test('やまもとたろう')).toBe(false)
});

test('hanRegExp does not match latin', () => {
    expect(hanRegExp.test('john smith')).toBe(false)
});

test('hanRegExp does not match hangul', () => {
    expect(hanRegExp.test('홍길동')).toBe(false)
});

test('allCjkRegExp matches ideographs', () => {
    expect(allCjkRegExp.test('滿本都寫著兩個字吃人')).toBe(true)
});

test('allCjkRegExp matches kana', () => {
    expect(allCjkRegExp.test('なまえはまだない')).toBe(true)
});

test('allCjkRegExp matches hangul', () => {
    expect(allCjkRegExp.test('박제가되어버린천재를아시오')).toBe(true)
});

test('allCjkRegExp matches bopomofo', () => {
    expect(allCjkRegExp.test('ㄔㄖㄣ')).toBe(true)
});

test('allCjkRegExp does not match latin', () => {
    expect(allCjkRegExp.test('kentō')).toBe(false)
});
