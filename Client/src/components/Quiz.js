import React from 'react';
import { Card } from 'react-bootstrap';

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            questions: this.props.data,
            questionIndex: 0,
            numberOfQuestions: 3,
            showButton: false,
            questionAnswered: false,
            score: 0,
            isAnswered: false,
            classNames: ['', '', '', ''],
            displayPopup: false
        }
        
        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    componentWillMount() {
        const { questionIndex } = this.state;
        this.pushData(questionIndex);
    }

    pushData(questionIndex) {
        const { questions } = this.state;

        this.setState({
            currQuestion: questions[questionIndex].question,
            answers: [questions[questionIndex].answers[0], questions[questionIndex].answers[1], questions[questionIndex].answers[2], questions[questionIndex].answers[3] ],
            correct: questions[questionIndex].correct,
            questionIndex: this.state.questionIndex + 1
        });
    }

    nextQuestion() {
        const { questionIndex, numberOfQuestions } = this.state;

        if(questionIndex === numberOfQuestions) {
            this.setState({ 
                displayPopup: true,
                showButton: false,
            })
            
        } else {
            this.pushData(questionIndex);
            this.setState({
                showButton: false,
                questionAnswered: false,
                classNames: ['', '', '', ''],
                isAnswered: false
            });
        }
    }

    handleShowButton() {
        this.setState({
            showButton: true,
            questionAnswered: true
        })
    }

    handleIncreaseScore() {
        this.setState({ score: this.state.score + 1 });
    }

    checkAnswer(e) {
        let { isAnswered, correct } = this.state;
        if(!isAnswered) {
            let elem = e.currentTarget;
            let answer = Number(elem.dataset.id);
            let updatedClassNames = this.state.classNames;

            if(answer === correct){
                this.state.classNames[answer-1] = 'right';
                this.handleIncreaseScore();
            }
            else {
                this.state.classNames[answer-1] = 'wrong';
            }
            
            this.setState({
                classNames: updatedClassNames,
                isAnswered: true
            })

            this.handleShowButton();
        }
    }

    renderPopUp() {
        return (
            <div className="popup">
                <h3>Score {this.state.score}/{this.state.numberOfQuestions}</h3>
                <button className="fancy-btn" onClick={this.props.handleFinishQuiz}>Finish Quiz and See Stats</button>
            </div>
        )
    }

    render() {
        const { questionIndex, numberOfQuestions, currQuestion, answers, showButton, displayPopup, classNames} = this.state;

        return (
            <div className="quizContainer">
                <Card className="Container">
                    <Card.Header>Quiz</Card.Header>
                    <Card.Body>
                        <div id="question">
                            <h4>Question {questionIndex}/{numberOfQuestions}</h4>
                            <p>{currQuestion}</p>
                        </div>
                    
                        <div id="answers">
                            <ul>
                                <li onClick={this.checkAnswer} className={classNames[0]} data-id="1"><span>A</span> <p>{answers[0]}</p></li>
                                <li onClick={this.checkAnswer} className={classNames[1]} data-id="2"><span>B</span> <p>{answers[1]}</p></li>
                                <li onClick={this.checkAnswer} className={classNames[2]} data-id="3"><span>C</span> <p>{answers[2]}</p></li>
                                <li onClick={this.checkAnswer} className={classNames[3]} data-id="4"><span>D</span> <p>{answers[3]}</p></li>
                            </ul>
                        </div>

                        <div id="submit">
                            {showButton ? <button className="fancy-btn" onClick={this.nextQuestion} >Next question</button> : null}
                            {displayPopup ? this.renderPopUp() : null}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
};

export default Quiz
