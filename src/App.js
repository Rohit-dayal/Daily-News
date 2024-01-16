import './App.css';
import React, {useState} from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  // Switch,
  Route,
  // Link,
  Routes
} from "react-router-dom";

const App =()=> {
  let apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(10)
  // setProgress=(progress)=>{
  //   this.setState({
  //     progress:progress})
  // }
  // render() { // the work of render is to render the html on screen
    return (
      <div>
        <Router>
          <NavBar/>
          <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Routes> 
          <Route exact path="/general" element = {<News setProgress = {setProgress}  apiKey = {apiKey}  key= "general" pageSize = {6} category = "general"/>} ></Route>
          <Route exact path="/business" element = {<News setProgress = {setProgress} apiKey = {apiKey} key ="business" pageSize = {6} category = "business"/>}></Route>
          <Route exact path="/entertainment" element = {<News setProgress = {setProgress} apiKey = {apiKey} key ="entertainment" pageSize = {6} category = "entertainment"/>}></Route>
          <Route exact path="/health" element = {<News setProgress = {setProgress} apiKey = {apiKey} key ="health" pageSize = {6} category = "health"/>}></Route>
          <Route exact path="/science" element = {<News setProgress = {setProgress} apiKey = {apiKey} key ="science" pageSize = {6} category = "science"/>}></Route>
          <Route exact path="/sports" element = {<News setProgress = {setProgress} apiKey = {apiKey} key ="sports" pageSize = {6} category = "sports"/>}></Route>
          <Route exact path="/technology" element = {<News setProgress = {setProgress} apiKey = {apiKey} key ="technology" pageSize = {6} category = "technology"/>}></Route>
        </Routes>
        </Router>
      </div>
    )
  }
// }
export default App;
