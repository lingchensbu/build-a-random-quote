import React,{useEffect, useState} from "react"
import './App.scss';
import colorArray from './colorsArray'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'
import{faQuoteLeft} from '@fortawesome/free-solid-svg-icons'
import {faHashtag} from '@fortawesome/free-solid-svg-icons'

 

function App() {
  const [author, setAuthor]=useState("Unknown")
  const [quote,setQuote]=useState("A truly rich man is one whose children run into his arms when his hands are empty.");
  const [randomNumber,setRandomNumber]=useState(0);
  const [accentColor,setaccentColor]=useState('#282c34')

  const quoteDb="https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

  const [quotesArray, setQuotesArray]=useState(null)

    const fetchQuotes = async(url)=>{
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

  useEffect(()=>{
    fetchQuotes(quoteDb)
  },[quoteDb])



   const getRandomQuote=()=>{
    const randInt=Math.floor(quotesArray.length*Math.random())
    setRandomNumber(randInt);
    setQuote(quotesArray[randInt].quote); 
    setAuthor(quotesArray[randInt].author)
    setaccentColor(colorArray[randInt])
    
   }

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor:accentColor}}>
       
       <div id="quote-box" style={{color:accentColor}}>
        
       <p id="text" ><FontAwesomeIcon icon={faQuoteLeft} /> {quote}</p>
       <p id="author">- {author}</p>
       
       <div class="button">
       <a id="tweet-quote" style={{backgroundColor:accentColor}} href= {encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)} ><FontAwesomeIcon icon={faTwitter} /> </a>

       <a id="tweet-quote" style={{backgroundColor:accentColor}} href= {encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)} > <FontAwesomeIcon icon={faHashtag} /></a>
       </div>
       
       <button id="new-quote" style={{backgroundColor:accentColor}} onClick={()=>{getRandomQuote()}}> Random</button>
       </div>
       

       </header>
    </div>
  );
}

export default App;
