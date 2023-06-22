import './header.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeOrderNewMessage } from '../../store/postsSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const { isOrderNewMessageFromDown } = useAppSelector((state) => state.postsSlice);

  return (
    <div className="header__container">
      <form className="form">
        <label htmlFor="sortByTitle" className="checkbox-label">
          <input
            type="checkbox"
            name="sortByTitle"
            checked={!isOrderNewMessageFromDown}
            onChange={() => dispatch(changeOrderNewMessage())}
            id="sortByTitle"
            className="checkbox-input"
          />
          Отображать новые посты сверху
        </label>
      </form>
    </div>
  );
};

export default Header;
