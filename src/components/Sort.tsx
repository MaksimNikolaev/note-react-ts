import React, { useState } from 'react'
import { sortInAscending, sortInDescending } from '../features/notes/notesSlice';
import { useAppDispatch } from '../hooks/redux-hooks';
import { ArrowDown } from './ArrowDown';
import { ArrowUp } from './ArrowUp';

export const Sort = () => {
  const [directionSort, setDirectionSort] = useState(true);
  const [field, setField] = useState('');
  const dispatch = useAppDispatch();

  const Arrow = () => {
    return (
      directionSort ? <ArrowUp/> : <ArrowDown/>
    )
  }

  const fieldSort = (field: string) => {
    updateSort(field)
    setField(field)
  }

  const updateSort = (field: string) => {
    directionSort ? dispatch(sortInAscending(field)) : dispatch(sortInDescending(field))
    setDirectionSort(!directionSort)
  }

  return (
      <div>Сортировать по:
        <span className={field === 'title' ? 'sort sort_active' : 'sort'} onClick={() => fieldSort('title')}>Названию</span>{field === 'title' && <Arrow/>}
        <span className={field === 'date' ? 'sort sort_active' : 'sort'} onClick={() => fieldSort('date')}>Дате</span>{field === 'date' && <Arrow/>}
      </div>    
  )
}
