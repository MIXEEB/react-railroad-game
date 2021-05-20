import styled from "styled-components";

interface Props {
    groundTileImage: string
}

export const GroundTileDiv = styled.div`
    cursor: none;
    width: 128px;
    height: 128px;
    background-image: url(${(props: Props) => props.groundTileImage })
`