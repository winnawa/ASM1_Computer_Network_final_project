import { useState } from "react"
import { useConversationContext } from "../../../Context/conversationContext"
//import { usePeerContext } from "../../../Context/peerContext"
//import { useUserInfoContext } from "../../../Context/userInfoContext"
import SingleUserComponent from "./SingleUser"
import {useFriendListContext} from "../../../Context/friendListContext"
import { useUsersInConversationContext } from "../../../Context/usersInConversationContext"

const FriendList = ()=>{
    const {friendList} = useFriendListContext()
    const [chosenUserListToCreateConversation, updateChosenUserListToCreateConversation] = useState([])

    //const {updateUserInNewConversation} = usePeerContext()
    const {updateMessageObjArray} = useConversationContext()
    const {updateUsersInConversation} = useUsersInConversationContext()


    
    const chooseThisUser = (element,index,isChosen)=>{
        //console.log(isChosen)
        if (isChosen === false){
            const pos = chosenUserListToCreateConversation.map(e => e["_id"]).indexOf(element["_id"]);
            const tempArr = [...chosenUserListToCreateConversation]
            tempArr.splice(pos,1);
            updateChosenUserListToCreateConversation(tempArr)
        }
        else{
            const tempArr = [...chosenUserListToCreateConversation]
            tempArr.push(element)
            updateChosenUserListToCreateConversation(tempArr)
        }
    }

    const createConversationWithUser = ()=>{
        console.log(chosenUserListToCreateConversation)
        updateUsersInConversation(chosenUserListToCreateConversation)
        //updateUserInNewConversation(userListToCreateConversation)
        updateMessageObjArray([])
        //updateConnectionObjArray([])
    }



    const friendListComponent = friendList.map((element, index) =>{ 
        return(
           <SingleUserComponent key={index} element={element} index={index} chooseThisUser={chooseThisUser}/>
        )
    })
    return(
        <div style={{marginLeft : "30px", marginRight : "30px"}}>
            <div onClick={createConversationWithUser}>Start conversation</div>
            <div>Friend list</div>
            <div>
                {friendListComponent}
            </div>
        </div>
    )

}
export default FriendList