import { useState } from 'react';
import { toast } from 'react-toastify';
import css from '../Searchbar/SearchBar.module.css';

export const Searchbar = ({ submitFormHandler }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onInputHandler = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.warn('Input value can not be empty');
    }
    submitFormHandler(searchQuery);
    e.target.reset();
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmitHandler}>
        <button type="submit" className={css.searchForm_button}>
          <span className={css.searchForm_button_label}>Search</span>
        </button>

        <input
          onInput={onInputHandler}
          className={css.searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
      {!searchQuery && <p className={css.infoPlease}>Please enter something</p>}
    </header>
  );
};
