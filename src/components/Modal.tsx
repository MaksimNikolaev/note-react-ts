import React from "react";
import { hide, show } from "../features/alert/alertSlice";
import { editNote } from "../features/notes/notesSlice";
import { useAppDispatch } from "../hooks/redux-hooks";

type Props = {
  hideModal: () => void,
  value: string,
  setValue: (e:string) => void,
  idNote: string
}

export const Modal: React.FC<Props> = ({ hideModal, value, setValue, idNote }) => {
  let modelStyle = {
    display: "block",
    backgroundColor: "rgba(0,0,0,0.8)",
  };

  const dispatch = useAppDispatch();

  const handleUpdateNote = (id: string, title: string) => {
    if (value.trim()) {
      dispatch(editNote({id, title}))
      dispatch(show({text:'Заметка была успешно изменена', type:'success'}))
      hideModal();
    } else {
      dispatch(show({text:'Заметка не была изменена, так как содержало пустое поле', type:'warning'}))
      hideModal();      
    } 
    setTimeout(() =>  dispatch(hide()), 4000)   
  }

  return (
    <div
      className="modal fade show"
      style={modelStyle}
      id="exampleModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Изменение заметки
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={hideModal}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Название:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="recipient-name"
                  //defaultValue={data}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={hideModal}
            >
              Закрыть
            </button>
            <button type="button" className="btn btn-primary" onClick={() => handleUpdateNote(idNote, value)}>
              Сохранить изменения
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
