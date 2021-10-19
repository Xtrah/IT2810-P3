import getIconByType from '../utils/getIconByType';
import fire from '../utils/getIconByType/fire.svg';
import normal from '../utils/getIconByType/normal.svg';

describe('getIconByType', () => {
  test('it should return expected svg according to type input', () => {
    const input = 'fire';

    const output = fire;

    expect(getIconByType(input)).toEqual(output);
  });

  test('it should return fallback svg when no type exists', () => {
    const input = 'randomtype123123';

    const output = normal;

    expect(getIconByType(input)).toEqual(output);
  });
});
