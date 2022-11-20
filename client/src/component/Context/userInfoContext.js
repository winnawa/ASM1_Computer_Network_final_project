import { createContext, useContext, useState } from "react"
const tempFunctionForNum =()=>{}
const UserInfoContext = createContext({
                                        userId : '',
                                        updateUserId :  tempFunctionForNum,
                                        userName: '',
                                        updateUserName: tempFunctionForNum
                                    })

export const useUserInfoContext = ()=>useContext(UserInfoContext)

const UserInfoContextComponent = (props)=>{
    const [userId, updateUserId] = useState('')
    const [userName, updateUserName] = useState('')

   
    return(
        <UserInfoContext.Provider value={{userId, updateUserId, userName,updateUserName}}>
            {props.children}  
        </UserInfoContext.Provider>
    )


}
export default UserInfoContextComponent