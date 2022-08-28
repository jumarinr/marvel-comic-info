export const equalOptions = (option, value) => option.id === value.id;
export const getTitleCharacter = (option) => option.name;
export const getTitleComic = (option) => option.title;

export const buildLimitAndSkip = ({ limit, page }) => ({
  offset: (limit * page) - limit,
  limit,
});
