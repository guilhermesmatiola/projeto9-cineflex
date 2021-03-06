import React from "react";
import styled from 'styled-components';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function MovieSelect(){
    

    const [movies, setMovies] = React.useState([]);

	useEffect(() => {
		const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

		promise.then(resposta => {
			setMovies(resposta.data);
		});
	}, []);

	if(movies.length ===  null) {
		return (<h1>Loading...</h1>);
	}

   
    return(
        <>
            <Text>Selecione o filme</Text>
            <ContainerPosters>
            {movies.map((movie,index) => (
                <Link key={index} to={`/sessoes/${movie.id}`}>
                    <PosterBox >
                        <Poster  id={movie.id} src={movie.posterURL} alt={movie.title}/>
                    </PosterBox>
                </Link>
            ))}
            </ContainerPosters>
        </>
    );

}
const ContainerPosters = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 10px;
`

const PosterBox = styled.div`
    width:145px;
    height:209px;;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:10px;
` ;

const Poster = styled.img`
    width:129px;
    height: 193px;;
` ;

const Text = styled.h1`
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
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;
` ;