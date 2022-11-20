import { createContext, useContext } from "react"
import Peer from 'peerjs'
import { useEffect, useRef, useState } from 'react'
import axios from "axios"
import { useUserInfoContext } from "./userInfoContext"
import { useInComingMessageContext } from "./inComingMessageContext"
//import { useConversationContext } from "./conversationContext"
import { useInComingDataContext } from "./inComingDataContext"
//const tempFunctionForNum =()=>{}
const PeerContext = createContext({
                                        peerId : '',
                                        peerInstance : {},
                                        // userInNewConversation : [],
                                        // updateUserInNewConversation : tempFunctionForNum,
                                        
                                    })
export const usePeerContext = ()=>useContext(PeerContext)


const PeerContextComponent = (props)=>{
    const [peerId, updatePeerId] = useState('')
    //const [userInNewConversation, updateUserInNewConversation] = useState([])
    const peerInstance = useRef(null)
    //const [peerInstanceState, updatePeerInstanceState] = useState({})



    const {userId} = useUserInfoContext()
    const {inComingMessageArray} = useInComingMessageContext()
    const {inComingData, updateInComingData} = useInComingDataContext()


    //const {messageObjArray,addNewMessageObj} = useConversationContext()


    const updatePeerIdAddressToServer = async(peerId)=>{
        const response = await axios.post("https://networkserverasm1.herokuapp.com/updateUserAddress",{
            id : userId,
            address : peerId
        })
        //console.log('userId',userId)
    }

    useEffect(()=>{
        if (userId !== ''){
            let peer
            if (!peerInstance.current){peer = new Peer()
                peerInstance.current = peer;
            } //this is new too
            
            
            //const peer = new Peer()
            if (peer){//this is new too
                peer.on('open', (id) =>{
                    //console.log(id)
                    updatePeerId(id)
                    if (id !== ''){
                        updatePeerIdAddressToServer(id); 
                
                        console.log('update peerId')
                    }
                })
            
                
        
        
                peer.on('connection', function(conn) {
                    conn.on('data', function(data){
                        
                        console.log("data before",inComingData)
                        updateInComingData(data)


                        // console.log('this is inComingMessageAray',inComingMessageArray)
                        // console.log('this is the data',data);
                        // const tempArray = [...inComingMessageArray]
                        // console.log('this is the inComingMessageArray before added', inComingMessageArray)
                        // console.log('this is the tempArray before added', tempArray)
                        // const anotherTempArray = [...tempArray,data]
                        // console.log('this is the tempArray after message added',anotherTempArray)
                        // updateInComingMessageArray(anotherTempArray)














                        //console.log(messageObjArray)
                        //addNewMessageObj({message: data.message, idInPeerJS : data.peerId, name : data.name})
                
                    });
                });
            } //this is new
        }
        //updatePeerInstanceState(peerInstance.current)
    },[userId,inComingMessageArray])

    return(
        <PeerContext.Provider value={{peerId, peerInstance: peerInstance.current}}>
            {props.children}
        </PeerContext.Provider>
    )
}
export default PeerContextComponent