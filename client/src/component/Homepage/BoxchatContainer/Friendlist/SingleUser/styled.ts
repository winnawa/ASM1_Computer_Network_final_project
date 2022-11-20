import styled from 'styled-components'


interface SingleFriendProps {
    isChosen : boolean

}

export const SingleFriendContainer = styled.div<SingleFriendProps>`
    ${ (props) =>{ if (props.isChosen){ return "background-color:orange;"} else return 'background-color:none;'} }
    
`