import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import './posts.scss';
import { fetchPosts } from '../../store/postsSlice';
import Post from '../Post/Post';

const Posts = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.postsSlice);

  useEffect(() => {
    const idFetchFirstMessages = 0;
    dispatch(fetchPosts(idFetchFirstMessages));
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => <Post post={post} key={post.id} />)}
    </div>
  )
};

export default Posts;

