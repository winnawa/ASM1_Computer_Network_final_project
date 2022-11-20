import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ConversationContextComponent from './component/Context/conversationContext';
import FriendListContextComponent from './component/Context/friendListContext';
import InComingDataContextComponent from './component/Context/inComingDataContext';
import InComingMessageContextComponent from './component/Context/inComingMessageContext';
import PeerContextComponent from './component/Context/peerContext';
import UserInfoContextComponent from './component/Context/userInfoContext';
import UsersInConversationContextComponent from './component/Context/usersInConversationContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserInfoContextComponent>

            <ConversationContextComponent>                                 {/* in test */}


                <UsersInConversationContextComponent>   


                    <InComingDataContextComponent>                              
                        <InComingMessageContextComponent>

                            <PeerContextComponent>
                                <FriendListContextComponent>
                                    <App />
                                </FriendListContextComponent>
                            </PeerContextComponent>

                        </InComingMessageContextComponent>
                    </InComingDataContextComponent>
                
                
                </UsersInConversationContextComponent>


            </ConversationContextComponent>

        </UserInfoContextComponent>
    </React.StrictMode>
);
