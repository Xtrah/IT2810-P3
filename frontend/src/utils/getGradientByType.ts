/* eslint-disable import/prefer-default-export */

/**
 * Returns gradient-values based on Pokémon-type
 * @param type string depicting Pokémon-type
 * @returns gradient values on format (gradient-angle, hex1 colorstop1, hex1 colorstop2)
 */
export const getGradientByType = (type: string) => {
  const sizeLeft: number = 20;
  const sizeRight: number = 80;
  const gradientMap = new Map([
    ['normal', `#A8A878 ${sizeLeft}%, #645D23 ${sizeRight}%`],
    ['fire', `#F08030 ${sizeLeft}%, #a04009 ${sizeRight}%`],
    ['water', `#49b9db ${sizeLeft}%, #2249A8 ${sizeRight}%`],
    ['grass', `#50ec65 ${sizeLeft}%, #26a822 ${sizeRight}%`],
    ['electric', `#eeca2c ${sizeLeft}%, #c0a114 ${sizeRight}%`],
    ['ice', `#5eb8d3 ${sizeLeft}%, #27bdc2 ${sizeRight}%`],
    ['fighting', `#f87a7a ${sizeLeft}%, #c23838 ${sizeRight}%`],
    ['poison', `#A040A0 ${sizeLeft}%, #660c66 ${sizeRight}%`],
    ['ground', `#b1a434 ${sizeLeft}%, #908542 ${sizeRight}%`],
    ['flying', `#c580fd ${sizeLeft}%, #8138d4 ${sizeRight}%`],
    ['psychic', `#d4259f ${sizeLeft}%, #e68b24 ${sizeRight}%`],
    ['bug', `#b4e21f ${sizeLeft}%, #88a52a ${sizeRight}%`],
    ['rock', `#88835b ${sizeLeft}%, #6e6b54 ${sizeRight}%`],
    ['ghost', `#611bb1 ${sizeLeft}%, #44384e ${sizeRight}%`],
    ['dark', `#58452c ${sizeLeft}%, #2f2114 ${sizeRight}%`],
    ['dragon', `#6e28dd ${sizeLeft}%, #4f1bdd ${sizeRight}%`],
    ['steel', `#b8b8b8 ${sizeLeft}%, #777777 ${sizeRight}%`],
    ['fairy', `#f3bbfa ${sizeLeft}%, #ce61c8 ${sizeRight}%`],
  ]);

  return gradientMap.get(type)
    ? `linear(to-tl, ${gradientMap.get(type)})`
    : `linear(to-tl, #252525 ${sizeLeft}%, #666666 ${sizeRight}%)`;
};
