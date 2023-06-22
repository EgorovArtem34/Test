import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import './posts.scss';
import { fetchNewPosts, fetchPosts } from '../../store/postsSlice';
import Post from '../Post/Post';
import Loader from '../Loader/Loader';

const Posts = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoading } = useAppSelector((state) => state.postsSlice);
  const lastPostId = posts[posts.length - 1]?.id || null;

  useEffect(() => {
    const idFetchFirstMessages = 0;
    dispatch(fetchPosts(idFetchFirstMessages));
  }, [dispatch]);

  useEffect(() => {
    const IntervalOf5Second = 5000;
    const interval = setInterval(() => {
      if (lastPostId) {
        dispatch(fetchNewPosts(Number(lastPostId)));
      }
    }, IntervalOf5Second);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [dispatch, posts, lastPostId]);

  if (isLoading && posts.length === 0) {
    return <Loader />;
  }

  return (
    <div className="posts">
      {posts.map((post) => <Post post={post} key={post.additional_id} />)}
    </div>
  );
};

export default Posts;
