import { useMemo, useState } from 'react';
import './App.scss';
import { Search } from './Components/Search';
import { ScaleLoader } from 'react-spinners'
import { iUser } from './interfice/interface';
import { AxiosResponse, AxiosError } from "axios";
import { getUser } from './api';
import { toast, ToastContainer } from 'react-toastify';
import User  from './Components/User';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  // hooks 
  const [isSpiner, setIsSpiner] = useState<boolean>(false)
  const [users, setUsers] = useState<iUser[]>([])

  // spiner work
  const openSpiner = (): void => setIsSpiner(true);
  const closeSpiner = (): void => setIsSpiner(false);

  // search user api 
  const searchUser = async (logo: string): Promise<void> => {
    openSpiner()

    try {
      const response: AxiosResponse<iUser> = await getUser(logo);
      const { name, login, avatar_url, html_url, location }: iUser = response.data

      const user: iUser | undefined = users.find(e => e.login === login)

      if (user) { // if user alredy have put it in first place
        const i: number = users.findIndex(e => e.login === login);
        users.splice(i, 1)
        setUsers([user, ...users])
      } else {
        setUsers([{ name, login, avatar_url, html_url, location }, ...users])
      }
    } catch (e: any) {
      const text: string | undefined = e.message;
      toast(text ? text : 'something went wrong ')
    }
    closeSpiner()
  }

  // show users 

  const memoUsers = useMemo(() => users.map((user: iUser) => <User key={user.login} {...user} />), [users])

  return (
    <div className="App">
      <Search searchUser={searchUser} />
      <div className={'users-g-c ' + (isSpiner ? 'disabled' : '')}>
        {memoUsers}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />


      {isSpiner && <ScaleLoader className='spinner' color="#36d7b7" height='3vw' width="1vw" />}
    </div>
  );
}

export default App;
