import { useAppDispatch } from 'app/hooks';
import Characters from 'features/characters/Characters';
import { allChars } from 'features/characters/characterSlice';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts'

function FavouriteScreen() {
  const [savedLocal] = useLocalStorage<any[]>('urls', []);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(allChars(savedLocal));
  }, [dispatch, savedLocal]);

  return (
    <div>
      <h2 className="page_title">Favourites</h2>
      <Characters onlyFav />
    </div>
  )
}

export default FavouriteScreen