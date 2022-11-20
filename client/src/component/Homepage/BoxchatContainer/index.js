//import { usePeerContext } from "../../Context/peerContext"
import FriendList from "./Friendlist"
import { DisplayFlex } from "./styled.ts"
import Boxchat from "./Boxchat"

const BoxchatContainer = ()=>{
    //const{userId} = useUserInfoContext()

    //const  {peerId} = usePeerContext()
  
    return(
        <DisplayFlex>
            <FriendList></FriendList>
            <Boxchat></Boxchat>
            {/* <div>{peerId}</div> */}
        </DisplayFlex>
    )
}
export default BoxchatContainer