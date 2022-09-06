import { useAppDispatch } from 'app/hooks';
import PlanetModal from 'components/PlanetModal';
import { CharacterState, selectCharacters } from 'features/characters/characterSlice';
import { toggleModal } from 'features/planet/planetSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocalStorage } from 'usehooks-ts'
import styles from './CharacterDetails.module.css';

function CharacterDetails() {
  const [savedLocal, setSavedLocal] = useLocalStorage<any>('urls', [])
  const { character }: CharacterState = useSelector(selectCharacters)
  const dispatch = useAppDispatch();

  const alreadySaved = useMemo(() => {
    return savedLocal.indexOf(character?.url) !== -1;
  }, [savedLocal, character?.url])

  const toggleSave = () => {
    if (!alreadySaved) {
      setSavedLocal([...savedLocal, character?.url]);
    } else {
      const filtered = savedLocal.filter((url: string) => url !== character?.url);
      setSavedLocal(filtered)
    }
  }

  return (
    <div className={styles.char_details}>
      <PlanetModal url={character?.homeworld || ''} />
      <h2>Charcter's details</h2>
      {
        alreadySaved
          ? <button className='btn-danger' onClick={toggleSave}>Remove from favourite <i className="fa fa-trash"></i></button>
          : <button onClick={toggleSave}>Add to favourite <i className="fa fa-star"></i></button>
      }

      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{character?.name}</td>
          </tr>
          <tr>
            <td>Birth Year</td>
            <td>{character?.birth_year}</td>
          </tr>
          <tr>
            <td>Eye Color</td>
            <td>{character?.eye_color}</td>
          </tr>
          <tr>
            <td>Skin Color</td>
            <td>{character?.skin_color}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{character?.gender}</td>
          </tr>
          <tr>
            <td>Hair Color</td>
            <td>{character?.hair_color}</td>
          </tr>
          <tr>
            <td>Homeworld</td>
            <td>
              <button onClick={() => dispatch(toggleModal())}>View Details <i className="fa fa-paper-o"></i></button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* <h2>Homeworld's</h2> */}
    </div>
  )
}

export default CharacterDetails