import { useAppDispatch } from 'app/hooks';
import CharacterDetails from 'components/Character/CharacterDetails';
import Loader from 'components/Loader';
import { characterByURL, selectCharacters } from 'features/characters/characterSlice';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import styles from './DetailScreen.module.css'

function DetailScreen() {
  const dispatch = useAppDispatch();
  const {status} = useSelector(selectCharacters);
  const {url} = useParams();

  useEffect(() => {
    dispatch(characterByURL(url || ''));
  }, [dispatch, url])
  
  return (
    <div className={styles.detail_screen}>
      { status === 'loading' 
        ? <Loader width="200px" />
        : <CharacterDetails />}
    </div>
  )
}

export default DetailScreen