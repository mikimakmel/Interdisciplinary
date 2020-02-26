import React from 'react';
import Quiz from './components/Quiz'
import Charts from './components/Charts'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './style/main.css'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionsList: [],
      lifeExpectancyList: [],
      gasEmissionsList: [],
      isQuizOver: false
    }

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.fetchGasEmissions = this.fetchGasEmissions.bind(this);
    this.fetchLifeExpectancy = this.fetchLifeExpectancy.bind(this);
    this.renderCharts = this.renderCharts.bind(this);
    this.handleFinishQuiz = this.handleFinishQuiz.bind(this);
  }

  componentWillMount() {
    this.fetchQuestions();
    this.fetchGasEmissions();
    this.fetchLifeExpectancy();
  }

  fetchQuestions() {
    const url = `https://interdisciplinary.herokuapp.com/getAllQuestions`
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    const request = new Request(url, options)

    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ questionsList: data }))
      .catch()
  }

  fetchLifeExpectancy() {
    const url = `https://interdisciplinary.herokuapp.com/getAllLifes`
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    const request = new Request(url, options)

    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ lifeExpectancyList: data }))
      .catch()
  }

  fetchGasEmissions() {
    const url = `https://interdisciplinary.herokuapp.com/getAllEmissions`
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    const request = new Request(url, options)

    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ gasEmissionsList: data }))
      .catch()
  }

  handleFinishQuiz() {
    this.setState({ isQuizOver: true })
  }

  renderCharts() {
    const { gasEmissionsList, lifeExpectancyList } = this.state;
    return (
      <Charts lifeExpectancyList={lifeExpectancyList} gasEmissionsList={gasEmissionsList} />
    )
  }

  render () {
    const { questionsList, gasEmissionsList, lifeExpectancyList, isQuizOver } = this.state;
    if (questionsList === undefined || questionsList.length === 0 || gasEmissionsList.length === 0 || lifeExpectancyList.length === 0) {
      return(
        <div className="App">
          <header className="App-header">
            <p>Loading...</p>
          </header>
        </div>
      )
    }
    else {
      return(
        <div>
          <Header />
          <div className="Container">
              <Quiz data={questionsList} handleFinishQuiz={this.handleFinishQuiz} />
              {isQuizOver === true ? this.renderCharts() : null}
          </div>
        </div>
      )
    }
  }
}

export default App;
