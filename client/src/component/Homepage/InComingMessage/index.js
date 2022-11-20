//import { useEffect } from "react"
import { useInComingMessageContext } from "../../Context/inComingMessageContext"
import { usePeerContext } from "../../Context/peerContext"
import { useUserInfoContext } from "../../Context/userInfoContext"
import { useUsersInConversationContext } from "../../Context/usersInConversationContext"


const InComingMessageComponent = ()=>{

    const {inComingMessageArray} = useInComingMessageContext()
    const {updateUsersInConversation} = useUsersInConversationContext()
    const {userId} = useUserInfoContext()
    
    const goToTheChat = (element)=>{
        if (element.to){
            //console.log(element.to)
            const allUsersInMessage = [...element.to,{
                    "_id" : element.id_of_sender,
                    address : element.address_of_sender,
                    name : element.from,
                    last_name : "",
                    status : ""
                }]

            
            const allUsersInMessageExceptTheClient= allUsersInMessage.filter((element)=>{return element["_id"] !== userId});
            console.log(allUsersInMessageExceptTheClient)
            updateUsersInConversation(allUsersInMessageExceptTheClient)
        }
    }


    let tempArr
    tempArr = [...inComingMessageArray].reverse()
    //console.log(inComingMessageArray, 'this is in message array')
    
    //console.log(tempArr)

    if (!tempArr){tempArr=[]}
    const inComingMessageArrayComponent = tempArr.map((element,index)=>{
        if (element.to){
        return(
            <div key={index} onClick={()=>goToTheChat(element)}>
                <div>From: {element.from}</div>
                {element.to.map((element,index)=>{return(
                    <div key={index}>
                        To:
                        <div>{element.name}</div>
                    </div>
                )})}
                {/* <div>{element.source}</div>
                <div>{element.destination}</div> */}
                {/* people in conversation will also be save */}
                <div>{element.message}</div>
            </div>
        )
        }
    })

    //const inComingMessageArrayComponent = inComingMessageArray.map((element)=>{
    //         return(
    //             <div>
    //                 <div>{element.name}</div>
    //                 {/* <div>{element.source}</div>
    //                 <div>{element.destination}</div> */}
    //                 {/* people in conversation will also be save */}
    //                 <div>{element.message}</div>
    //             </div>
    //         )
    //     }
    // )


    return(
        <div style={{width:"200px", height:"500px"}}>
            {inComingMessageArrayComponent}

        </div>
    )
}

export default InComingMessageComponent