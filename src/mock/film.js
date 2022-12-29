const FILMS_NAMES = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Great Flamarion`,
  `Made for Each Other`,
];

const FILMS_POSTERS = [
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/made-for-each-other.png`,
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amettempus.`,
];

const GENRES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
  `Film-Noir`,
];

const COMMENT_EMOJIS = [
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`,
];

const COMMENT_MEASSAGES = [
  `Almost two hours? Seriously?`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Interesting setting and a good cast`,
];

const COMMENT_AUTHORS = [
  `Tim Macoveev`,
  `John Doe`,
  `Rustamov Kemran`,
  `Jane Doe`,
];

const getRandomArrayItem = (array) => {
  return array[getRandomInteger(0, array.length)];
};

const getRandomInteger = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const generateRandomDescription = (sentensesCount) => {
  let sentenses = [];

  let prevIndex = -1;

  for (let index = 0; index <= sentensesCount; index++) {
    let currentIndex = getRandomInteger(0, DESCRIPTIONS.length);

    while (prevIndex === currentIndex) {
      currentIndex = getRandomInteger(0, DESCRIPTIONS.length);
    }

    sentenses.push(DESCRIPTIONS[currentIndex]);
    prevIndex = currentIndex;
  }

  return sentenses.join(` `);
};

const generateRandomComments = (commentsCount) => {
  let comments = [];

  for (let index = 0; index <= commentsCount; index++) {
    const randomCommentIndex = getRandomInteger(0, COMMENT_EMOJIS.length);

    const currentComment = {
      author: getRandomArrayItem(COMMENT_AUTHORS),
      emoji: COMMENT_EMOJIS[randomCommentIndex],
      message: COMMENT_MEASSAGES[randomCommentIndex],
      date: getRandomDate(),
    };

    comments.push(currentComment);
  }

  return comments;
};

const generateRandomGenres = (genressCount) => {
  let genres = [];

  let prevIndex = -1;

  for (let index = 0; index <= genressCount; index++) {
    let currentIndex = getRandomInteger(0, GENRES.length);

    while (prevIndex === currentIndex) {
      currentIndex = getRandomInteger(0, GENRES.length);
    }

    genres.push(GENRES[currentIndex]);

    prevIndex = currentIndex;
  }

  return genres;
};

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomInteger(100, 3366);

  targetDate.setDate(targetDate.getDate() - diffValue);

  return targetDate;
};


const generateFilm = () => {
  const randomFilmIndex = getRandomInteger(0, FILMS_NAMES.length);

  const rating = (5 + Math.random() * 5).toFixed(1);
  const description = generateRandomDescription(getRandomInteger(1, 5));
  const comments = generateRandomComments(getRandomInteger(0, 5));
  const genres = generateRandomGenres(getRandomInteger(1, 5));
  const duration = `${getRandomInteger(1, 4)}h ${getRandomInteger(1, 60)}m`;

  const originalName = `The Great Flamarion`;
  const director = `Anthony Mann`;
  const writers = `Anne Wigton, Heinz Herald, Richard Weil`;
  const actors = `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`;
  const releaseDate = getRandomDate();
  const country = `USA`;

  return {
    title: FILMS_NAMES[randomFilmIndex],
    poster: FILMS_POSTERS[randomFilmIndex],
    description,
    rating,
    duration,
    genres,
    comments,
    originalName,
    director,
    writers,
    actors,
    releaseDate,
    country,
    isOnWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

export const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => generateFilm());
};
