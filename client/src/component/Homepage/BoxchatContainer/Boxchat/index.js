//import Peer from 'peerjs'
import { useState, useEffect } from 'react'
import { useConversationContext } from '../../../Context/conversationContext';
import { usePeerContext } from '../../../Context/peerContext';
import { useUsersInConversationContext } from '../../../Context/usersInConversationContext';
import { useUserInfoContext } from '../../../Context/userInfoContext';


const Boxchat = ()=>{
    const [message, updateMessage] = useState('') //for message writting
    const onMessageChangeHandler = (e)=>{
        e.preventDefault();
        updateMessage(e.currentTarget.value)
    }

    const [id, updateId] = useState('')
    const onIdChangeHandler = (e)=>{
        updateId(e.currentTarget.value)
    }


    

    //const [temporaryConnectionList, updateTemporaryConnectionList] = useState([])
    

    const {usersInConversation} = useUsersInConversationContext()
    const {peerInstance, peerId} = usePeerContext()
    const {userId, userName} = useUserInfoContext();
    const {messageObjArray,connectionObjArray, updateMessageObjArray, updateConnectionObjArray} = useConversationContext();

    

    const sendMessage = (connection, messageObj)=>{
            connection.on('open',function(){
                connection.send(messageObj)
            })
            console.log('send message through',connection)
        //    addNewMessageObj(messageObj)
    }
    

    const connectionEstablishment = (id)=>{
        // on open will be launch when you successfully connect to PeerServer
        
        return peerInstance.connect(id)
        //const newConnection = peerInstance.connect(id)
        //console.log("peerId is", id)
        //const tempArr = [...temporaryConnectionList, newConnection]
        //console.log("new temporary conection list",tempArr)
        //updateTemporaryConnectionList(tempArr)

        //addNewConnectionObj(newConnection)
    }






    // const connectToAllPeerInList = () => {
    //     //console.log('userInNewConversation',userInNewConversation)
    //     //console.log('peerInstance',peerInstance)
    //     const temporaryConnectionList = []

    //     for (let element of usersInConversation){
    //         const connection = connectionEstablishment(element.address)
    //         temporaryConnectionList.push(connection)
    //     }
    //     console.log('after connect to all peer',temporaryConnectionList)
    //     updateConnectionObjArray(temporaryConnectionList)
    // }


    // const sendMessageToUsersInConversation = (message)=>{
    //     //console.log("inhere", connectionObjArray[0])
    //     //console.log("in here too", userInNewConversation[0])

    //     const addressOfUsersInConversation = usersInConversation.map((element)=>{return element.address})
    //     const nameOfUsersInConversation = usersInConversation.map((element)=>{return element.name})

    //     for (let i=0; i< connectionObjArray.length; i++){
    //         sendMessage(connectionObjArray[i],{
    //             from : userName,
    //             to : [...nameOfUsersInConversation],
    //             address_of_sender : peerId,
    //             address_of_reciever : [...addressOfUsersInConversation],
    //             message: message, 
    //             name : userName,
    //         })
    //         //console.log('sendding to', peerId)
    //     }
    //     updateMessage('')
    // }

    
    // useEffect(()=>{
        
    //     if (userId !== '') {
    //         //console.log('in here')
    //         connectToAllPeerInList()
    //     }
    // },[userId,usersInConversation,peerInstance])



    // const messageDisplayed = messageObjArray.map((element,index)=>{
    //     return(
    //         <div key={index} style={{postion:"absolute",left:"0px"}}>
    //             <div>{element.name}</div>
    //             <div>{element.message}</div>
    //         </div>
    //     )
    // })






    const sendMessageToUsersInConversation = ()=>{
        //const addressOfUsersInConversation = usersInConversation.map((element)=>{return element.address})
        //const nameOfUsersInConversation = usersInConversation.map((element)=>{return element.name})
        //const idOfUsersInConversation = usersInConversation.map((element)=>{return element["_id"]})

        const messageObj = {    
                                from : userName,
                                to : [...usersInConversation],
                                id_of_sender : userId,
                                //id_of_reciever : [...idOfUsersInConversation],
                                address_of_sender : peerId,
                                //address_of_reciever : [...addressOfUsersInConversation],
                                message: message, 
                                
                            }

        for (let user of usersInConversation){
            console.log(user)
            const connection = connectionEstablishment(user.address);
            console.log(connection.peer) ;

            sendMessage(connection,messageObj)
        }

        const tempArr = [...messageObjArray]
        tempArr.push(messageObj)
        updateMessageObjArray(tempArr)
    }



    const usersInConversationComponent = usersInConversation.map((element, index)=>{
        return(
            <div style={{width : "80px", borderRadius:"30%", border:"solid"}} key={index}>
                <span>{element.name}</span> <span>{element.last_name}</span> 
                <div>{element.address}</div>        
            </div>
        )
    })
    const messageDisplayed = messageObjArray.map((element)=>{
        return(
            <div>
                <span>{element.from}</span> 
                {/* <span>{element.last_name}</span> */}
                <div>{element.message}</div>
            </div>
        )
    })

    return(
        <div style={{height:"500px", position:"relative"}}>
            <div> FROM {peerId}</div>
            <label> TO </label>
            {/* <input type='text' value={id} onChange={onIdChangeHandler}></input> */}
            {usersInConversationComponent}



            <div style={{height:"300px", position:"relative", overflow:"hidden"}}>
            {/* <div>{messageObjArray.length}</div> */}
            {messageDisplayed} 
            </div>



            <div style={{bottom:'0px', position:'absolute'}}>
                <input type='text' value={message} onChange={onMessageChangeHandler}></input>
                {/* <button type='submit' onClick={()=>{sendMessageToUsersInConversation(message)}}>
                    Send Message
                </button> */}
                <button type='submit' onClick={sendMessageToUsersInConversation}>
                    Send Message
                </button>
            </div>
        </div>
    )
}
export default Boxchat