import { useState } from "react"
import { SingleFriendContainer } from "./styled.ts"



const SingleUserComponent = (props)=>{
    
    const[isChosen, updateIsChosen] = useState(false)
    return(
        <SingleFriendContainer  
            onClick={()=>{
                updateIsChosen(!isChosen)
                
                props.chooseThisUser(props.element,props.index,!isChosen);}} 
            
            
            isChosen={isChosen}
        >
            {isChosen? "chosen" : "not chosen"}
            <div>{props.element.name}</div>
            <div>{props.element.address}</div>
        </SingleFriendContainer>
    )

}

export default SingleUserComponent