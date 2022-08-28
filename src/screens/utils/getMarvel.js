import _ from 'lodash';

import axios from 'axios';

import {
  DEFAULT_PAGE_LIMIT, SERVICE_CHARACTERS, SERVICE_COMICS, IMG_NOT_FOUND,
} from './constants';

const URL_API = process.env.URL_API || 'https://gateway.marvel.com:443/v1/public';
const API_KEY = process.env.API_KEY || 'bff521f6f3f5a5068ad5683fb31a74c0';

/**
 * @typedef ReturnCharacters
 * @property {Number} [limit]
 * @property {Number} [total]
 * @property {Number} [count]
 * @property {Object[]} [results]
 */

const parseItems = (items) => _.map(items, (item) => ({
  ...item,
  isImageAvailable: item?.thumbnail?.path !== IMG_NOT_FOUND,
}));

/**
 * función para construir la url para peticiones desde una base
 * @param {Object} entrada
 * @param {String} entrada.principalService
 * @param {Number} [entrada.id]
 * @param {String} [entrada.secondaryService]
 * @returns {String}
 */
export const buildUrlByIds = ({ principalService, id, secondaryService }) => {
  const result = { url: `${URL_API}/${principalService}` };

  if (id) {
    result.url = `${result.url}/${id}`;
  }

  if (secondaryService) {
    result.url = `${result.url}/${secondaryService}`;
  }

  return result.url;
};

/**
 * función para obtener un listado de caracteres a partir de parametos de búsqueda
 * @param {Object} [params]
 * @param {String} [params.characterId]
 * @param {String} [params.name]
 * @param {String} [params.nameStartsWith]
 * @param {String[]} [params.comics]
 * @param {Number} [params.limit]
 * @returns {Promise<ReturnCharacters>}
 */
export const getCharacters = async (params = {}) => {
  const urlCharacters = buildUrlByIds({
    principalService: SERVICE_CHARACTERS,
    id: params.characterId,
  });

  const { limit = DEFAULT_PAGE_LIMIT } = params;
  try {
    const res = await axios.get(urlCharacters, {
      params: {
        ...params,
        limit,
        apikey: API_KEY,
      },
    });

    const { data } = res.data;

    return {
      characters: parseItems(data.results),
      offset: data.offset,
      limit: data.limit,
      total: data.total,
      count: data.count,
    };
  } catch (error) {
    console.error(error);
    throw new Error('error al realizar la petición');
  }
};

/**
 * función para obtener un listado de comics por personaje
 * @param {Object} params
 * @param {String} params.characterId
 * @param {String} [params.name]
 * @param {String} [params.nameStartsWith]
 * @param {String[]} [params.comics]
 * @param {Number} [params.limit]
 */
export const getComicsByCharacter = async (params = {}) => {
  const urlComicsOfCharacters = buildUrlByIds({
    principalService: SERVICE_CHARACTERS,
    id: params.characterId,
  });

  const { limit = DEFAULT_PAGE_LIMIT } = params;

  try {
    const res = await axios.get(urlComicsOfCharacters, {
      params: {
        ...params,
        limit,
        apikey: API_KEY,
      },
    });

    const { data } = res.data;

    return {
      comics: data.results,
      offset: data.offset,
      limit: data.limit,
      total: data.total,
      count: data.count,
    };
  } catch (error) {
    console.error(error);
    throw new Error('error al realizar la petición');
  }
};

/**
 * función para obtener un listado de comics por queries
 * @param {Object} params
 * @param {String} params.comicId
 * @param {String} [params.name]
 * @param {String} [params.nameStartsWith]
 * @param {String[]} [params.comics]
 * @param {Number} [params.limit]
 */
export const getComics = async (params = {}) => {
  const urlComics = buildUrlByIds({
    principalService: SERVICE_COMICS,
    id: params.comicId,
  });

  const {
    limit = DEFAULT_PAGE_LIMIT,
    orderBy = 'title',
  } = params;

  try {
    const res = await axios.get(urlComics, {
      params: {
        ...params,
        limit,
        apikey: API_KEY,
        orderBy,
      },
    });

    const { data } = res.data;

    console.log(res);

    return {
      comics: parseItems(data.results),
      offset: data.offset,
      limit: data.limit,
      total: data.total,
      count: data.count,
    };
  } catch (error) {
    console.error(error);
    throw new Error('error al realizar la petición');
  }
};

/**
 * función para obtener un listado de comics por personaje
 * @param {Object} params
 * @param {String} params.comicId
 * @param {String} [params.name]
 * @param {String} [params.nameStartsWith]
 * @param {String[]} [params.comics]
 * @param {Number} [params.limit]
 */
export const getCharactersByComic = async (params = {}) => {
  const urlCharactersByComic = buildUrlByIds({
    principalService: SERVICE_COMICS,
    id: params.comicId,
    secondaryService: SERVICE_CHARACTERS,
  });

  const { limit = DEFAULT_PAGE_LIMIT } = params;

  try {
    const res = await axios.get(urlCharactersByComic, {
      params: {
        ...params,
        limit,
        apikey: API_KEY,
      },
    });

    const { data } = res.data;

    return {
      characters: data.results,
      offset: data.offset,
      limit: data.limit,
      total: data.total,
      count: data.count,
    };
  } catch (error) {
    console.error(error);
    throw new Error('error al realizar la petición');
  }
};
