import { useUserInfoContext } from "./component/Context/userInfoContext";
import Authentication from "./component/Authentication";
import Homepage from "./component/Homepage";

function App() {

  const {userId, updateUserId, updateUserName} = useUserInfoContext()

  if (userId === ''){
    return(
      <Authentication updateUserId={(newId)=>{updateUserId(newId)}} 
                      updateUserName={(userName)=>{updateUserName(userName)}}
      />
    )
  }
  else  {
    return (
      <Homepage></Homepage>      
    )
  }
}

export default App;
