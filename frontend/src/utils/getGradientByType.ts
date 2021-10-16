/**
 * Returns gradient-values based on Pokémon-type
 * @param type string depicting Pokémon-type
 * @returns gradient values on format (gradient-angle, hex1 colorstop1, hex1 colorstop2)
 */
export const getGradientByType = (type: string) => {
  let sizeLeft: number = 20;
  let sizeRight: number = 80;
  const gradientMap = new Map([
    ['normal', `to-tl, #A8A878 ${sizeLeft}% ,#645D23 ${sizeRight}%`],
    ['fire', `to-tl, #F08030 ${sizeLeft}% ,#a04009 ${sizeRight}%`],
    ['water', `to-tl, #49b9db ${sizeLeft}% ,#2249A8 ${sizeRight}%`],
    ['grass', `to-tl, #50ec65 ${sizeLeft}% ,#26a822 ${sizeRight}%`],
    ['electric', `to-tl, #eeca2c ${sizeLeft}% ,#c0a114 ${sizeRight}%`],
    ['ice', `to-tl, #5eb8d3 ${sizeLeft}% ,#27bdc2 ${sizeRight}%`],
    ['fighting', `to-tl, #f87a7a ${sizeLeft}% ,#c23838 ${sizeRight}%`],
    ['poison', `to-tl, #A040A0 ${sizeLeft}% ,#660c66 ${sizeRight}%`],
    ['ground', `to-tl, #b1a434 ${sizeLeft}% ,#908542 ${sizeRight}%`],
    ['flying', `to-tl, #c580fd ${sizeLeft}% ,#8138d4 ${sizeRight}%`],
    ['psychic', `to-tl, #d4259f ${sizeLeft}% ,#e68b24 ${sizeRight}%`],
    ['bug', `to-tl, #b4e21f ${sizeLeft}% ,#88a52a ${sizeRight}%`],
    ['rock', `to-tl, #88835b ${sizeLeft}% ,#6e6b54 ${sizeRight}%`],
    ['ghost', `to-tl, #611bb1 ${sizeLeft}% ,#44384e ${sizeRight}%`],
    ['dark', `to-tl, #58452c ${sizeLeft}% ,#2f2114 ${sizeRight}%`],
    ['dragon', `to-tl, #6e28dd ${sizeLeft}% ,#4f1bdd ${sizeRight}%`],
    ['steel', `to-tl, #b8b8b8 ${sizeLeft}% ,#777777 ${sizeRight}%`],
    ['fairy', `to-tl, #f3bbfa ${sizeLeft}% ,#ce61c8 ${sizeRight}%`],
  ]);

  return (
    'linear(' + gradientMap.get(type) + ')' ||
    'linear(#252525 10%, #666666 80%)'
  );
};
