import { Character } from 'features/characters/Character.type';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts'
import styles from './Character.module.css'

interface CharacterProp {
  character: Character;
  onlyFav: boolean | undefined;
}

function CharacterCard({ character, onlyFav }: CharacterProp) {
  const navigate = useNavigate();
  const [savedLocal, setSavedLocal] = useLocalStorage<any[]>('urls', []);

  const goToDetail = (url: string) => {
    navigate(`/people/${encodeURIComponent(url)}`);
  }

  const toggleSave = () => {
    if (!alreadySaved) {
      setSavedLocal([...savedLocal, character.url]);
    } else {
      const filtered = savedLocal.filter(url => url !== character.url);
      setSavedLocal(filtered)
    }
  }

  const alreadySaved = useMemo(() => {
    return savedLocal.indexOf(character.url) !== -1;
  }, [savedLocal, character.url])

  // return null if only need favourite
  if (!alreadySaved && onlyFav) return null;

  return (
    <div className={styles.character}>
      <h2>{character.name}</h2>
      <button className='btn' onClick={() => goToDetail(character.url)}>View Details</button>
      <i
        style={{ color: alreadySaved ? 'var(--secondary-color)' : '' }}
        onClick={toggleSave}
        title={`${alreadySaved ? 'Remove from ' : 'Add to '} favourite`}
        className='fa fa-star'
      ></i>
    </div>
  )
}

export default CharacterCard