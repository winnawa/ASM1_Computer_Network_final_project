import { createContext, useContext, useState } from "react"

const tempFunctionForNum =()=>{}
const ConversationContext = createContext({
                                        messageObjArray : [],
                                        updateMessageObjArray : tempFunctionForNum,
                                        addNewMessageObj: tempFunctionForNum,
                                        connectionObjArray : [],
                                        updateConnectionObjArray : tempFunctionForNum,
                                        addNewConnectionObj :  tempFunctionForNum
                                    })

export const useConversationContext = ()=>useContext(ConversationContext)

const ConversationContextComponent = (props)=>{
    const [messageObjArray, updateMessageObjArray] = useState([])
    const [connectionObjArray, updateConnectionObjArray] = useState([])

    const addNewMessageObj = (messageObj)=>{
        //console.log(messageObjArray)
        const tempArr = [...messageObjArray]
        tempArr.push(messageObj)
        //console.log("inside updateing", tempArr)
        updateMessageObjArray(tempArr)
    }

    const addNewConnectionObj = (connectionObj)=>{
        const tempArr = [...connectionObjArray]
        tempArr.push(connectionObj)
        updateConnectionObjArray(tempArr)
    }


    return(
        <ConversationContext.Provider value={{messageObjArray, updateMessageObjArray, addNewMessageObj, connectionObjArray, updateConnectionObjArray, addNewConnectionObj}}>
            {props.children}  
        </ConversationContext.Provider>
    )

}
export default ConversationContextComponent