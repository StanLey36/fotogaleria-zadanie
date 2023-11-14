import React from "react"
import { BrowserRouter as Router, Route} from "react-router-dom"
import 'typeface-barlow';
import Home from "./components/Home"
import About from "./components/About"

function App() {
    return (
        <Router>
            <div>
                <Route path='/' exact component={Home} />
                <Route path='/gallery/:path' component={About} />
            </div>
        </Router>
    )
}

export default App