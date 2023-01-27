import React, { useState } from 'react'
import { filterNotes } from '../features/notes/notesSlice';
import { useAppDispatch } from '../hooks/redux-hooks';

export const Filter = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');

  const onChangeInput = (name: string) => {
    setValue(name)
    dispatch(filterNotes(name))
  }

  return (
    <form>
      <div className="input-group">
        <label className='filter__lable me-3' htmlFor='search'>Поиск заметки:</label>
        <input
        id='search'
          type="text"
          className="form-control"
          placeholder="Введите название"
          value={value}
          onChange={e => onChangeInput(e.target.value)}
          />
      </div>
    </form>
  )
}
