import { ChangeEvent, FC, useState } from "react"
import './search.scss'
interface iSearch {
    searchUser : (logo : string) => void 
}


export const Search : FC<iSearch> = ({searchUser}) => {
    const [value, setValue] = useState<string>('');

    const change = (e : ChangeEvent<HTMLInputElement>) : void => setValue(e.target.value)

   const findUser = () : void => {
        if(value.trim() === '') return;
        searchUser(value)
        setValue('')
   }


    return <div className="search-c">
        <input value={value} onChange={change}/>
        <button onClick={findUser}>search</button>
    </div>
}