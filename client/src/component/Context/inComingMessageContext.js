import { createContext, useContext, useEffect } from "react"
import { useState } from 'react'
import { useConversationContext } from "./conversationContext"
import { useInComingDataContext } from "./inComingDataContext"
import { useUserInfoContext } from "./userInfoContext"
import { useUsersInConversationContext } from "./usersInConversationContext"
//import { useUserInfoContext } from "./userInfoContext"

const tempFunctionForNum =()=>{}
const InComingMessageContext = createContext({
                                        inComingMessageArray : [],
                                        updateInComingMessageArray : tempFunctionForNum,
                                        // userInNewConversation : [],
                                        // updateUserInNewConversation : tempFunctionForNum,
                                    })
export const useInComingMessageContext = ()=>useContext(InComingMessageContext)


const InComingMessageContextComponent = (props)=>{
    const [inComingMessageArray, updateInComingMessageArray] = useState([])
    
    const {messageObjArray,updateMessageObjArray} = useConversationContext()
    const {usersInConversation} = useUsersInConversationContext()
    const {inComingData} = useInComingDataContext()
    const {userId} = useUserInfoContext()



    const  isTheSame = ()=>{
        if (inComingData.to) {
            
            const idOfUserInDestination = [...inComingData.to].map((element)=>{return element["_id"]}); //array
            const idOfUserInSource = inComingData.id_of_sender; //object
            const idOfTotalPeopleInMessage = [...idOfUserInDestination, idOfUserInSource]
            const sortedIdOfTotalPeopleInMessage = idOfTotalPeopleInMessage.sort()


            const idOfUsersInConversation = [...usersInConversation].map((element)=>{return element["_id"]});
            const idOfTotalUsersInConversation = [...idOfUsersInConversation, userId]
            const sortedIdOfTotalUsersInConversation = idOfTotalUsersInConversation.sort()

            console.log("IN DESTINATION",sortedIdOfTotalPeopleInMessage)
            console.log("IN CONVERSASTION",sortedIdOfTotalUsersInConversation)

            if (sortedIdOfTotalPeopleInMessage.length !== sortedIdOfTotalUsersInConversation.length){return false}
            else{
                for (let i=0;i<sortedIdOfTotalPeopleInMessage.length; i++){
                    if (sortedIdOfTotalPeopleInMessage[i] !== sortedIdOfTotalUsersInConversation[i]){
                        return false
                    }
                }
                return true
            }
        }
        return false
    }


    useEffect(()=>{
                    
                    if (isTheSame() === true){
                        
                        const tempArr = [...messageObjArray]
                        const anotherTempArray = [...tempArr, inComingData]
                        updateMessageObjArray(anotherTempArray)
                    }
                    else {


                        //console.log('this is inComingMessageAray',inComingMessageArray)
                        //console.log('this is the data',inComingData);
                        const tempArray = [...inComingMessageArray]
                        //console.log('this is the inComingMessageArray before added', inComingMessageArray)
                        //console.log('this is the tempArray before added', tempArray)
                        const anotherTempArray = [...tempArray,inComingData]
                        //console.log('this is the tempArray after message added',anotherTempArray)
                        updateInComingMessageArray(anotherTempArray)
                    
                    
                    }
    },[inComingData])

    return(
        <InComingMessageContext.Provider value={{inComingMessageArray, updateInComingMessageArray}}>
            {props.children}
        </InComingMessageContext.Provider>
    )
}
export default InComingMessageContextComponent