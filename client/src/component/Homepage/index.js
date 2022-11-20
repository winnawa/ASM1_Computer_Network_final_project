import BoxchatContainer from './BoxchatContainer'
import InComingMessageComponent from './InComingMessage'
import Navbar from './Navbar'
import { HomepageContainer } from './styled.ts'
const Homepage = ()=>{

    return(
        <HomepageContainer>
            <Navbar></Navbar>
            <BoxchatContainer></BoxchatContainer> 
            <InComingMessageComponent></InComingMessageComponent>
        </HomepageContainer>
    )
}
export default Homepage