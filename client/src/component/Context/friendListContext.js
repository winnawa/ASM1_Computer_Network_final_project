import { createContext, useContext, useState } from "react"
import { useEffect } from 'react'
import axios from 'axios'
import { useUserInfoContext } from "./userInfoContext"

const tempFunctionForNum =()=>{}
const FriendListContext = createContext({
                                        friendList : [],
                                        updateOnlineFriendList: tempFunctionForNum
                                    })

export const useFriendListContext = ()=>useContext(FriendListContext)

const FriendListContextComponent = (props)=>{

    const {userId} = useUserInfoContext()
    const [friendList,updateFriendList] = useState([])
    
    const retrieveUserFriendListANDAddress = async()=>{
        if (userId !== ''){ 
            const retrievedFriendList = await axios.post("https://networkserverasm1.herokuapp.com/getFriendList",{
                id : userId
            })
            //const onlineFriendList = friendList.data.filter((element)=>{return (element.status === "online")})
            //updateOnlineFriendList(onlineFriendList)




            updateFriendList(retrievedFriendList.data)
            // if (friendList.length === 0) {
            //     updateFriendList(retrievedFriendList.data)
            // }
            // else {
            //     for (let i = 0; i < retrievedFriendList.data.length; i++){
            //         if (retrievedFriendList.data[i]["_id"] === friendList[i]["_id"]){
            //             friendList[i]["address"] = retrievedFriendList.data[i]["address"]
            //         }
            //     }
            // }

        }
            
    }
    

    useEffect(() => {
        
        retrieveUserFriendListANDAddress()

        let timeFunc = setInterval(retrieveUserFriendListANDAddress, 5000);
        return ()=>{
            clearInterval(
                timeFunc
            )
        }

    },[userId]);
    
    return(
        <FriendListContext.Provider value={{friendList}}>
            {props.children}  
        </FriendListContext.Provider>
    )


}
export default FriendListContextComponent 
