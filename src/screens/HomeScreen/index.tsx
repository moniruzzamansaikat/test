import { useAppDispatch } from 'app/hooks'
import Search from 'components/Search';
import Characters from 'features/characters/Characters'
import { loadCharacters } from 'features/characters/characterSlice';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './HomeScreen.module.css';

function HomeScreen() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  let page: number = parseInt(new URLSearchParams(location.search).get("page") || '1');

  useEffect(() => {
    dispatch(loadCharacters(page));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(loadCharacters(page));
  }, [dispatch, page]);

  return (
    <div className={styles.home_screen}>
      <Search />
      <Characters onlyFav={false} />
    </div>
  )
}

export default HomeScreen