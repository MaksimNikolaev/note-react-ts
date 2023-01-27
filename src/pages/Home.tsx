import { Fragment, useEffect } from "react"
import { Filter } from "../components/Filter"
import { Form } from "../components/Form"
import { Loader } from "../components/Loader"
import { Notes } from "../components/Notes"
import { Sort } from "../components/Sort"
import { getNotes } from "../features/notes/notesSlice"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks"

export const Home = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.notes.status)


  useEffect(() => {
    dispatch(getNotes())
    //eslint-disable-next-line
  }, [])

  return (
    <Fragment>      
      <Form />
      <div className="group-sort-filter">
        <Sort />
        <Filter />
      </div>      
      <hr/>
      {(status === 'loading') 
        ? <Loader/>
        : <Notes/>
      }     
    </Fragment>
  )
}