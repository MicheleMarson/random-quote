import {colors} from "./colors"
import { useEffect, useState } from "react";
// import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
// import TwitterIcon from '@material-ui/icons/Twitter'
// import FacebookIcon from '@material-ui/icons/Facebook'

function App() {
  const url = "https://type.fit/api/quotes"
  const [randomIndex, setRandomIndex] = useState(0)
  const [randomColor, setRandomColor] = useState(0)
  const [data, setData] = useState(null)

  const fetchData = async () => {
    let res = await fetch(url)
    let data = await res.json()
    setData(data.filter(item => item.text.length < 100))
  }

  useEffect(() => {
    fetchData()
  },[])

  const randomNum = (data) => {
    return Math.floor(Math.random() * (data.length))
  }

  const randomQuote = () => {
    setRandomIndex(randomNum(data))
    setRandomColor(randomNum(colors))
  }


  const sectionStyle = {
    transition: "background 2s",
    background: colors[randomColor],
  }

  const boxStyle = {
    transition: "color 2s",
    boxShadow:"",
    color: colors[randomColor]
  }

  return (
    <>
    {data !== null ? (
      <section id="section" style={sectionStyle}>
      <div style={boxStyle} id="quote-box">
        <div>
          <h1 id="text">
            <i class="fas fa-quote-left"></i>
            {data[randomIndex].text}
          </h1>
        </div>
        <div>
          <h6 id="author">-{data[randomIndex].text !== null ? data[randomIndex].author : "Unknown" }</h6>
          <div id="footer">
            <div id="links">
              <a href="twitter.com/intent/tweet" id="tweet-quote">
                <i style={sectionStyle} class="fab fa-twitter"></i>
              </a>
              <a href="tumbler.com" id="facebook-quote">
                <i class="fab fa-tumblr" style={sectionStyle}></i>
              </a>
            </div>
            <button style={sectionStyle} id="new-quote" onClick={randomQuote}>click</button>
          </div>
        </div>
        </div>
      </section>
    ):(<div className="loading">Loading...</div>)}
    </>
  );
}


export default App;
