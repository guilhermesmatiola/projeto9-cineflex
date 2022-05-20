import styled from 'styled-components';
import axios from 'axios';
import { useParams , Link } from "react-router-dom";
import React, { useEffect } from 'react';
import Times from './Times';
import Chair from './Chair';

export default function ChairSelect({idSessao}){
    let params = useParams();
    console.log("params.idSessão: "+params.idSessao);

    const [chairs, setChairs] = React.useState([]);

	useEffect(() => {
		const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${params.idSessao}/seats`);

		promise.then(resposta => {
			setChairs(resposta.data);
            let arr=[];
            for(let i=0;i<resposta.data.seats.length+1;i++){
                arr.push(false);
            }
            setIsSelected(arr);
        });

	}, []);

    const [isSelected, setIsSelected] = React.useState([false]);

    function selectChair(id){
        
        let newStates=[...isSelected];
        newStates[id]=true;
        setIsSelected(newStates);
    }

	if(chairs.length ===  0) {
		return (<h1>Loading...</h1>);
	}

    return(
        <>
        <Text>Selecione o(s) assento(s)</Text>
        <ContainerChairs>
            {chairs.seats.map((seat) => (
                <Chair object={seat} selected={isSelected[seat.id+1]} selectChair={selectChair} key={seat.id}/>
            ))}
        </ContainerChairs>
        <ChairInfos>
            <Column>
                <GreenBall></GreenBall>
                <h3>Selecionado</h3> 
            </Column>
            <Column>
                 <GreyBall></GreyBall>
                 <h3>Disponível</h3> 
            </Column>
            <Column>
                 <YellowBall></YellowBall>
                 <h3>Indisponível</h3> 
            </Column>
        </ChairInfos>
        {/* <Footer>
            <PosterBox >
                <Poster id={idSessao} src={idSessao.posterURL} alt={idSessao.title}/>
            </PosterBox>
                <TextDate> {idSessao.title} </TextDate>
        </Footer> */}
        </>
    )
}

const ContainerChairs = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-left: 39px;
    margin-right: 39px;
`

const Text = styled.h1`
    margin: 10px;
    color:#293845;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.04em;
` ;

const OrangeBoxes = styled.div`
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: center;
`

const ChairInfos = styled.div`
    
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
    
`
const GreenBall= styled.div`
    width: 26px;
    height: 26px;
    box-sizing: border-box;
    border: 1px solid #1AAE9E;
    border-radius: 12px;
    background: #8DD7CF;
    
`
const GreyBall= styled.div`
    
    width: 26px;
    height: 26px;
    box-sizing: border-box;
    background: #C3CFD9;
    border-radius: 12px;
    border: 1px solid #7B8B99
    
`
const YellowBall= styled.div`
    
    width: 26px;
    height: 26px;
    box-sizing: border-box;
    border: 1px solid #F7C52B;
    border-radius: 12px;
    background: #FBE192;

    
`
const Column = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    display: flex;
    align-items: center;
    letter-spacing: -0.013em;
    margin-top: 5px;
    color: #4E5A65;
    }
`