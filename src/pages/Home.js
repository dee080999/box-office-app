/* eslint-disable  */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-body-style */
import React, {useState} from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';

const Home = () => {

    const [input,setInput]= useState('');
    const [results, setResults]= useState(null);
    const [searchOption,setSearchOption]=useState('shows');
    const isShowsSearch = searchOption === 'shows';

    const onSearch = () =>{

        apiGet(`/search/${searchOption}?q=${input}`).then(r => r.json()).then(result => {
            setResults(result);
        });
          };

 const onInputChange=(ev) =>{
    setInput(ev.target.value);
 };
const onKeyDown=(ev) => {
    if(ev.keyCode=== 13){
        onSearch()
    }
    
};

const onRadioChange= (ev) =>{
    setSearchOption(ev.target.value)

}



   const renderResults = () => {

    if(results && results.length === 0){
       return( <div>No results</div>
        ) }
    if(results && results.length > 0){
       return  results[0].show ? (<ShowGrid data={results}/>
       ): <ActorGrid data={results}/>;
    }
    return null;
   }

    return (
        <MainPageLayout>
        <input type="text"
        placeholder="Search for something"
         onChange={onInputChange} value={input}/> 
         <div>
             <label htmlFor="shows-search">
                 Shows
                <input id="shows-search" type="radio" value="shows"
                checked={isShowsSearch}
                 onChange={onRadioChange} /> 
                 </label>

                 <label htmlFor="actors-search">
                 Actors
                <input id="actors-search" type="radio" value="people"
                 checked={!isShowsSearch}
                 onChange={onRadioChange}/> 
                 </label>
         </div>
        <button type="button" onClick={onSearch}>Search</button>
        {renderResults()}
        </MainPageLayout>
    );
};

export default Home;
