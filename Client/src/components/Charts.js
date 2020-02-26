import React from 'react';
import Chart from "react-google-charts";

class Charts extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        lifeExpectancyList: this.props.lifeExpectancyList,
        gasEmissionsList: this.props.gasEmissionsList,
        geoChartData: [],
        barChartData: []
      }
      this.prepareData = this.prepareData.bind(this);
    }

    componentDidMount() {
        this.prepareData();
    }

    prepareData() {
        const { gasEmissionsList, lifeExpectancyList } = this.state;
        let newGeoChartsData = [['Country', 'Gas Emissions']];
        let newBarChartData = [['Country', 'Life Expectancy']];
        // let newChartsData = [['ID', 'Life Expectancy', 'Gas Emissions']];

        lifeExpectancyList.find(element =>  {
            if (element.country === "People's Republic of China") 
                element.country = 'China';
        });

        lifeExpectancyList.map((item) => {
            const found = gasEmissionsList.find(element => element.country === item.country);
            if (found !== undefined && item !== undefined) {
                // console.log(found);
                // let tempData = [found.country, item.age, found.emissions];
                let tempGeoData = [found.country, found.emissions];
                newGeoChartsData = [...newGeoChartsData, tempGeoData];

                let tempBarData = [found.country, item.age];
                newBarChartData = [...newBarChartData, tempBarData];
            }
        })
        // console.log(newChartsData);

        this.setState({ 
            geoChartData: newGeoChartsData,
            barChartData: newBarChartData
        })
    }

    render() {
        return(
            <div>
                <Chart
                width={'900px'}
                height={'700px'}
                chartType="GeoChart"
                data={this.state.geoChartData}
                options={{
                    colorAxis: { colors: ['#caffc4', '#ffe045', '#ffa545', '#ffb845', '#ff4d4d'] },
                    backgroundColor: '#ebf6ff',
                    datalessRegionColor: '#ffffff',
                }}
                />

                <Chart
                width={'900px'}
                height={'1000px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={this.state.barChartData}
                options={{
                    title: 'Life Expectancy',
                    chartArea: { width: '60%' },
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
                // For tests
                rootProps={{ 'data-testid': '4' }}
                />
            </div>
        )
    }
}

export default Charts;