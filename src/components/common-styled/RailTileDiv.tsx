import styled from "styled-components"

interface Props {
    railTileImage: string,
}

const RailTileDiv = styled.div`
    width: 128px;
    height: 128px;
    background-image: url(${(props: Props) => props.railTileImage })
`

export default RailTileDiv