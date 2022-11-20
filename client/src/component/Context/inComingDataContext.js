import { createContext, useContext } from "react"
import { useState } from 'react'
//import { useUserInfoContext } from "./userInfoContext"

const tempFunctionForNum =()=>{}
const InComingDataContext = createContext({
                                        inComingData : {},
                                        updateInComingData : tempFunctionForNum,
                                        // userInNewConversation : [],
                                        // updateUserInNewConversation : tempFunctionForNum,
                                    })
export const useInComingDataContext = ()=>useContext(InComingDataContext)


const InComingDataContextComponent = (props)=>{
    const [inComingData, updateInComingData] = useState({})
    

    return(
        <InComingDataContext.Provider value={{inComingData, updateInComingData}}>
            {props.children}
        </InComingDataContext.Provider>
    )
}
export default InComingDataContextComponent