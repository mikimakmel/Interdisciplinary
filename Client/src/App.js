import React from 'react';
import './App.css';
import Quiz from './components/Quiz'
import Charts from './components/Charts'

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
    const url = `http://localhost:3000/getAllQuestions`
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    const request = new Request(url, options)

    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ questionsList: data }))
      .catch()
  }

  fetchLifeExpectancy() {
    const url = `http://localhost:3000/getAllLifes`
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    const request = new Request(url, options)

    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ lifeExpectancyList: data }))
      .catch()
  }

  fetchGasEmissions() {
    const url = `http://localhost:3000/getAllEmissions`
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
      // console.log(lifeExpectancyList)
      return(
        <div className="App">
          <header className="App-header">
            <Quiz data={questionsList} handleFinishQuiz={this.handleFinishQuiz} />
            {isQuizOver === true ? this.renderCharts() : this.renderCharts()}
          </header>
        </div>
      )
    }
  }
}

export default App;
