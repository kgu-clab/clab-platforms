import account from '@mocks/data/account.json';
import mainBannerList from '@mocks/data/mainBannerList.json';
import mainAlertList from '@mocks/data/mainAlertList.json';
import noticeBoardList from '@mocks/data/noticeBoardList.json';
import newsList from '@mocks/data/newsList.json';
import qnaBoardList from '@mocks/data/qnaBoardList.json';
import birthdayList from '@mocks/data/birthdayList.json';
import blogList from '@mocks/data/blogList.json';
import itNewsBoardList from '@mocks/data/itNewsBoardList.json';
import hireBoardList from '@mocks/data/hireBoardList.json';
import freeBoardList from '@mocks/data/freeBoardList.json';
import graduatedBoardList from '@mocks/data/graduatedBoardList.json';

const getPokemonImage = (): string => {
  const random = Math.floor(Math.random() * 1008) + 1;
  return `https://cdn-gq.github.io/pokemon/${random}.webp`;
};

// FUNCTIONS
export { getPokemonImage };

// JSON MOCKS
export {
  account,
  newsList,
  mainBannerList,
  mainAlertList,
  birthdayList,
  blogList,
  noticeBoardList,
  qnaBoardList,
  itNewsBoardList,
  hireBoardList,
  freeBoardList,
  graduatedBoardList,
};
