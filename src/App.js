import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react'

const App = () => {
  const [apiResponse, setApiResponse] = useState('')

  useEffect(() => {
    callAPI()
  })

  useEffect(() =>{
    console.log(apiResponse)
  }, [apiResponse])

  const callAPI = () => {
    console.log(process.env.FIXIE_URL)
    let url = 'https://fof-festival-api.herokuapp.com/api/mongo/checkCode?'
    if (window.location.href.indexOf('localhost') != -1) {
      url = 'http://localhost:9000/api/mongo/checkCode?'
    }
    fetch(url + new URLSearchParams({
          code: 'mushie',
      }))
        .then(res => res.text())
        .then(res => setApiResponse(res))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <p>{apiResponse}</p> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
