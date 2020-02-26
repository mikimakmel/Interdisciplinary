import React from 'react';
import Chart from "react-google-charts";
import { Card, Tabs, Tab } from 'react-bootstrap';

class Charts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        lifeExpectancyList: this.props.lifeExpectancyList,
        gasEmissionsList: this.props.gasEmissionsList,
        geoChartData: [],
        barChartData: [],
        currChart: 'Geo'
      }
      
      this.prepareData = this.prepareData.bind(this);
      this.toggleCharts = this.toggleCharts.bind(this);
      this.renderGeoChart = this.renderGeoChart.bind(this);
      this.renderBarChart = this.renderBarChart.bind(this);
    }

    componentDidMount() {
        this.prepareData();
    }

    prepareData() {
        const { gasEmissionsList, lifeExpectancyList } = this.state;
        let newGeoChartsData = [['Country', 'Gas Emissions']];
        let newBarChartData = [['Country', 'Life Expectancy']];

        lifeExpectancyList.find(element =>  {
            if (element.country === "People's Republic of China") 
                element.country = 'China';
        });

        lifeExpectancyList.map((item) => {
            const found = gasEmissionsList.find(element => element.country === item.country);
            if (found !== undefined && item !== undefined) {
                let tempGeoData = [found.country, found.emissions];
                newGeoChartsData = [...newGeoChartsData, tempGeoData];

                let tempBarData = [found.country, item.age];
                newBarChartData = [...newBarChartData, tempBarData];
            }
        })

        this.setState({ 
            geoChartData: newGeoChartsData,
            barChartData: newBarChartData
        })
    }

    toggleCharts() {
        const { currChart } = this.state
        console.log(currChart)
        if (currChart === 'Geo') {
            this.setState({ currChart: 'Bar' })
        }
        else if (currChart === 'Bar') {
            this.setState({ currChart: 'Geo' })
        }
    }

    renderGeoChart() {
        return(
            <div>
                <h6 style={{fontSize: '12px'}}>Worldwide greenhouse gas emissions in MtCO2e</h6>
                <Chart
                width={'900px'}
                height={'700px'}
                chartType="GeoChart"
                loader={<div>Loading Chart</div>}
                data={this.state.geoChartData}
                options={{
                    colorAxis: { colors: ['#caffc4', '#ffe045', '#ffa545', '#ffb845', '#ff4d4d'] },
                    backgroundColor: '#ebf6ff',
                    datalessRegionColor: '#ffffff',
                }}
                />
            </div>
        )
    }

    renderBarChart() {
        return(
            <Chart
            style={{marginTop: '-20px'}}
            width={'800px'}
            height={'1000px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={this.state.barChartData}
            options={{
                chartArea: { width: '62%', height: '80%' },
                colors: ['#b0120a', '#ffab91'],
                hAxis: {
                    title: 'Life Expectancy',
                    minValue: 50,
                },
                vAxis: {
                    title: 'Country',
                    textStyle : {
                        fontSize: 10 
                    }
                },
            }}
            />
        )
    }

    render() {
        return(
            <div>
                <Card>
                    <Card.Header>
                        <Tabs defaultActiveKey="first" id="uncontrolled-tab-example" onSelect={() => this.toggleCharts()}>
                            <Tab eventKey="first" title="Gas Emissions" />
                            <Tab eventKey="second" title="Life Expectancy" />
                        </Tabs>
                    </Card.Header>
                    <Card.Body className="chartsContainer">
                        {this.state.currChart === 'Geo' ? this.renderGeoChart() : this.renderBarChart()}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Charts;