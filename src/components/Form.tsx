import { useState } from "react";
import { hide, show } from "../features/alert/alertSlice";
import { addNote } from "../features/notes/notesSlice";
import { useAppDispatch } from "../hooks/redux-hooks";

export const Form = () => {
  const [value, setValue] = useState<string>('');
  const dispatch = useAppDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    if (value.trim()) {
      dispatch(addNote(value.trim())).unwrap()
        .then(() => dispatch(show({text:'Заметка была создана', type:'success'})))  
        .catch(() => dispatch(show({text:'Что-то пошло не так', type:'danger'})))
      setValue('')
    } else {
      dispatch(show({text:'Введите название заметки', type:'warning'}))
    }
    setTimeout(() =>  dispatch(hide()), 2000)
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Введите название заметки"
          value={value}
          onChange={e => setValue(e.target.value)}
          />
        <button
          className="btn btn-outline-primary"
          type="submit" id="button-addon2">Добавить</button>
      </div>
    </form>
  )
}