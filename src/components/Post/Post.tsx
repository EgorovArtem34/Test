import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import './post.scss';
import userAvatar from '../../assets/icon/userAvatar.png';
import Button from '../Button/Button';
import sendMessageIcon from '../../assets/icon/panelSettings/sendMessageIcon.svg';
import hiddenIcon from '../../assets/icon/panelSettings/hiddenIcon.svg';
import settingIcon from '../../assets/icon/panelSettings/settingIcon.svg';
import { ReactComponent as FavoritesIcon } from '../../assets/icon/panelSettings/favoritesIcon.svg';
import formattedTime from '../../utils/utils';
import Attachments from '../Attachment/Attachment';
import { PostProps } from '../../types';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchPreviousPosts, setLike } from '../../store/postsSlice';

const Post = ({ post }: PostProps) => {
  const dispatch = useAppDispatch();
  const buttonNames = ['Левый', 'Центр', 'Правый'];
  const [showFullText, setShowFullText] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      setIsOverflowing(textElement.clientHeight < textElement.scrollHeight);
    }
  }, []);

  if (isHide) {
    return null;
  }

  const textClass = () => cn('post__text', {
    'show-full': showFullText,
  });
  const favoritesIconClass = (isFavorite: boolean) => cn('panel-settings__icon', 'panel-settings__icon_favoritesIcon', {
    active: isFavorite,
  });
  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  const renderButton = (id: string) => {
    if (isOverflowing) {
      if (!showFullText) {
        return (
          <button type="button" className="post__read-more" onClick={handleToggleText} key={id}>
            Читать далее
          </button>
        );
      }
      return (
        <button type="button" className="post__read-more" onClick={handleToggleText} key={id}>
          Скрыть
        </button>
      );
    }
    return null;
  };

  return (
    <>
      {post.isNew ? null : <button
        type="button"
        className="post__button__add-previous"
        onClick={() => dispatch(fetchPreviousPosts(true))}
      >
        Загрузить предыдущие
      </button>}
      <div className="posts__post post">
        <div className="post__header">
          <div className="post__user">
            <div className="post__avatar">
              <img src={userAvatar} alt="avatar" className="avatar" />
            </div>
            <div className="post__user-data">
              <span className="post__author">{post.author}</span>
              <span className="post__desc">{post.channel}</span>
            </div>
          </div>
          <div className="post__interface">
            <div className="post__buttons">
              <Button buttons={{ buttonNames }} key={post.additional_id} />
            </div>
            <div className="post__panel-settings panel-settings">
              <button type="button" className="panel-settings__btn">
                <img src={sendMessageIcon} alt="sendMessage" className="panel-settings__icon" />
              </button>
              <button type="button" className="panel-settings__btn" onClick={() => setIsHide((prev) => !prev)}>
                <img src={hiddenIcon} alt="hidden" className="panel-settings__icon" />
              </button>
              <button type="button" className="panel-settings__btn">
                <img src={settingIcon} alt="settings" className="panel-settings__icon" />
              </button>
              <button type="button" className="panel-settings__btn" onClick={() => dispatch(setLike(post.additional_id))}>
                <FavoritesIcon fill="white" stroke="rgba(128, 128, 128, 0.4)" className={favoritesIconClass(post.isFavorite)} />
              </button>
            </div>
          </div>
        </div>
        <div className="post__content">
          <span className="post__time">
            {formattedTime(post.date)}
          </span>
          <div className="post__content__container">
            <p ref={textRef} className={textClass()}>
              {post.content || 'Пустое сообщение'}
            </p>
            {renderButton(post.additional_id)}
            {post.attachments.length > 0 ? (
              post.attachments.map((attachment) => (
                <Attachments
                  attachment={attachment}
                  key={post.additional_id}
                />
              ))
            ) : null}
          </div>
        </div>
        <div className="post__tags tags">
          {post.isNew ? <span className="tags__tag tags__tag_new">#Новое</span> : null}
          <span className="tags__tag">#Эксперт</span>
        </div>
      </div>
    </>
  );
};

export default Post;
