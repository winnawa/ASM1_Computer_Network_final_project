import { createContext, useContext, useState } from "react"
const tempFunctionForNum =()=>{}
const UsersInConversationContext = createContext({
                                        usersInConversation: [],
                                        updateUsersInConversation : tempFunctionForNum
                                    })

export const useUsersInConversationContext = ()=>useContext(UsersInConversationContext)

const UsersInConversationContextComponent = (props)=>{
    const [usersInConversation, updateUsersInConversation] = useState([])

   
    return(
        <UsersInConversationContext.Provider value={{usersInConversation, updateUsersInConversation}}>
            {props.children}  
        </UsersInConversationContext.Provider>
    )


}
export default UsersInConversationContextComponent