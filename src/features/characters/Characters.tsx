import { useAppSelector } from 'app/hooks';
import CharacterCard from 'components/Character';
import Loader from 'components/Loader';
import styles from './Character.module.css'
import { selectCharacters } from './characterSlice';
import Pagination from 'react-responsive-pagination';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface CharactersProps {
  onlyFav: boolean | undefined;
}

function Characters({ onlyFav }: CharactersProps) {
  const [currentPage, setCurrentPage] = useState(5);
  const { characters, status, totalCount } = useAppSelector(selectCharacters);
  const navigate = useNavigate();
  const location = useLocation();

  const changePage = (page: any) => {
    const params = new URLSearchParams({ page: page + '' });
    navigate({ pathname: location.pathname, search: params.toString() });
    setCurrentPage(page);
  }

  return (
    <div className={styles.characters}>
      {status === 'loading'
        ? <Loader width="100px" />
        : <>
          <div className={styles.list}>
            {characters.map((c, index) => <CharacterCard onlyFav={onlyFav} key={index} character={c} />)}
          </div>

          {!onlyFav && <Pagination
            current={currentPage}
            total={totalCount}
            onPageChange={changePage}
            maxWidth={350}
          />}
        </>}

    </div>
  )
}

export default Characters;