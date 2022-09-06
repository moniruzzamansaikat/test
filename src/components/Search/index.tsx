import { useAppDispatch } from 'app/hooks'
import { searchCharacters } from 'features/characters/characterSlice';
import React from 'react'
import styles from './Search.module.css'

function Search() {
  const dispatch = useAppDispatch();

  const handleSearch = (e: any) => {
    dispatch(searchCharacters(e.target.value));
  }
  
  return (
    <div className={styles.search}>
      <h2>Filter</h2>
      <input placeholder='Search by name...' onInput={handleSearch} />
      
      <label htmlFor=""></label>
    </div>
  )
}

export default Search