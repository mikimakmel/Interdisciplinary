import React from 'react';
// import Popup from 'Popup';
// import Footer from 'Footer';

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
            // displayPopup: 'flex',
            isAnswered: false,
            classNames: ['', '', '', '']
        }
        
        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    componentWillMount() {
        let { questionIndex } = this.state;
        this.pushData(questionIndex);
    }

    pushData(questionIndex) {
        let { questions } = this.state;

        this.setState({
            currQuestion: questions[questionIndex].question,
            answers: [questions[questionIndex].answers[0], questions[questionIndex].answers[1], questions[questionIndex].answers[2], questions[questionIndex].answers[3] ],
            correct: questions[questionIndex].correct,
            questionIndex: this.state.questionIndex + 1
        });
    }

    nextQuestion() {
        let { questionIndex, numberOfQuestions, score } = this.state;

        if(questionIndex === numberOfQuestions) {
            // this.props.isQuizOver = true;
            // console.log(this.props.isQuizOver)
            this.props.handleFinishQuiz();
            // this.setState({
            //     displayPopup: 'flex'/////////////////////////
            // });
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

    handleStartQuiz() {
        this.setState({
            // displayPopup: 'none',
            questionIndex: 1
        });
    }

    handleIncreaseScore() {
        this.setState({
            score: this.state.score + 1
        });
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

    render() {
        let { questionIndex, numberOfQuestions, currQuestion, answers, correct, showButton, questionAnswered, displayPopup, score, classNames} = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1">
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
                            {showButton ? <button className="fancy-btn" onClick={this.nextQuestion} >{questionIndex===numberOfQuestions ? 'Finish quiz' : 'Next question'}</button> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Quiz
