import * as _ from 'lodash';
import { PostType } from '../types';

const formattedTime = (data: string) => {
  const time = data.split(' ')[1];
  const timeWithoutSecond = time.split(':').slice(0, 2).join(':');
  return timeWithoutSecond;
};

export const setNewPosts = (posts: PostType[]) => posts.map((post: PostType) => ({
  ...post, additional_id: _.uniqueId(), isNew: true, isFavorite: false,
}));
export const setOldPosts = (posts: PostType[]) => posts.map((post: PostType) => (
  { ...post, isNew: false }
));

export const modifyPosts = (posts: PostType[], type = 'new') => {
  const favorites = JSON.parse(localStorage.getItem('favorites') ?? JSON.stringify({}));
  return posts.map((post: PostType) => ({
    ...post,
    additional_id: type === 'new' ? post.id : _.uniqueId(),
    isFavorite: post.id in favorites,
    isNew: type === 'new',
  }));
};

export default formattedTime;
