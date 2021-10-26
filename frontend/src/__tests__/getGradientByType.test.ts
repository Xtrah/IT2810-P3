import getGradientByType from '../utils/getGradientByType';

describe('getGradientByType', () => {
  test('it should return expected gradient according to type input', () => {
    const input = 'fire';

    const output = 'linear(to-tl, #F08030 20%, #a04009 80%)';

    expect(getGradientByType(input)).toEqual(output);
  });

  test('it should return fallback gradient when no type exists', () => {
    const input = 'randomtype123123';

    const output = 'linear(to-tl, #252525 20%, #666666 80%)';

    expect(getGradientByType(input)).toEqual(output);
  });
});
