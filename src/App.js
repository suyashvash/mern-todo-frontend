import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Home, NavBar,AllTask, Login, Register, Create, Detail, Find} from '../src/components'
import Update from './components/update';

function App() {

  const [pathName, setPathName] = React.useState(window.location.pathname)

  const RenderPage = () => {
    
    console.log(pathName.split('?')[0])
    switch (pathName) {
      case '/':
        return <Home/>
      case '/home':
        return <Home/>

      case '/login':
        return <Login/>
    
      case '/register':
        return <Register/>
      // case '/about':
      //   return <About/>

      case '/create':
        return <Create/>

        case '/detail':
          return <Detail/>

      case '/update':
        return <Update/>

      case '/all':
        return <AllTask/>

      case '/find':
        return <Find/>
      default:
        <Home />
        break;
    }
  }

  return (
    <div className="App">
     <NavBar/>
     <RenderPage/>
    </div>
  );
}

export default App;
