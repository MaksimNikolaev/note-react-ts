export const url ='https://note-react-ts-default-rtdb.firebaseio.com'

export type Note = {
  [index: string]: string;
  id: string,
  title: string,
  date: string,  
}