export const getPokemon = (): string => {
  const id = Math.floor(Math.random() * 898) + 1;
  return `https://cdn-gq.github.io/pokemon/${id}.webp`;
};
