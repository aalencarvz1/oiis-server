import Utils from "../../../../dist/api/controllers/utils/Utils";

const stringTest = 'TEST';

describe(Utils.name, () => {

    test('typeOf', () => {
        expect(Utils.typeOf('')).toBe('string');
        /*expect(Utils.typeOf(1)).toBe('number');
        expect(Utils.typeOf(true)).toBe('boolean');
        expect(Utils.typeOf({})).toBe('object');
        expect(Utils.typeOf([])).toBe('array');*/
    });

    /*test('hasValue', () => {
        expect(Utils.hasValue(null)).toBe(false);
        expect(Utils.hasValue(undefined)).toBe(false);
        expect(Utils.hasValue([])).toBe(false);
        expect(Utils.hasValue([1])).toBe(true);
        expect(Utils.hasValue({})).toBe(false);
        expect(Utils.hasValue({a:1})).toBe(true);
        expect(Utils.hasValue('')).toBe(false);
        expect(Utils.hasValue('a')).toBe(true);
        expect(Utils.hasValue(0)).toBe(true);
        expect(Utils.hasValue(1)).toBe(true);
        expect(Utils.hasValue(false)).toBe(true);
        expect(Utils.hasValue(true)).toBe(true);
    });

    test('firstValid', () => {
        expect(Utils.firstValid([null,undefined,false])).toBe(false);
        expect(Utils.firstValid([null,undefined,true])).toBe(true);
        expect(Utils.firstValid([null,undefined,''])).toBe('');
    });*/
    
});
