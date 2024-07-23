import React, { useCallback, useContext, useRef } from 'react'
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';
import styles from './Search.module.scss'




const Search = () => {
  const {searchValue, setSearchValue} = useContext(SearchContext);  //addEventListener
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  }
  
  const onChangeInput =  useCallback(debounce((event) => {
    setSearchValue(event.target.value);
  }, 250), []);

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"
          fill="#6563ff"
        />
      </svg>
      <input
        ref={inputRef}
        value={searchValue}
        className={styles.input}
        placeholder="Поиск пиццы..."
        onChange={onChangeInput}
      />
      
      {searchValue && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          color="#2329D6"
          fill="none"
          stroke="#2329D6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="closeIconTitle" />
          <path d="M6.34314575 6.34314575L17.6568542 17.6568542M6.34314575 17.6568542L17.6568542 6.34314575" />
        </svg>
      )}
    </div>
  );
}

export default Search
