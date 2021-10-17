import React from 'react'
import styled from 'styled-components'
import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import Recomendados from './Recomendados';
import NewDisney from './NewDisney';
import Originales from './Originales'
import Tendencias from './Tendencias';
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import db from '../firebase'
import {setMovies} from '../features/movie/movieSlice'
import {selectUserName } from '../features/user/userSlice'


function Home(props) {

    const dispatch=useDispatch()
    const userName=useSelector(selectUserName)
    let recommends=[];
    let newDisneys=[]
    let originales=[]
    let tendencias=[]


    useEffect( ()=>{

      db.collection("movies").onSnapshot( snapshot=>{
        snapshot.docs.map(doc=>{
          switch(doc.data().type){
            case "recommend":
              recommends=[...recommends,{id:doc.id,...doc.data()}]
              break;
            
            case "new":
              newDisneys=[...newDisneys,{id:doc.id,...doc.data()}];
              break;
            
            case "original":
              originales=[...originales,{id:doc.id,...doc.data()}];
              break;
            
            case "trending":
              tendencias=[...tendencias,{id:doc.id,...doc.data()}];
              break;
            
          }
        });

        dispatch(
          setMovies({
            recommend:recommends,
            newDisney:newDisneys,
            original:originales,
            trending:tendencias
          })
        );


      });

    },[userName])
  
    

    return (
       
            <Container>
                <ImgSlider/>
                <Viewers/>
                <Recomendados/>
                <NewDisney/>
                <Originales/>
                <Tendencias/>
            </Container>
       
    )
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;




export default Home
