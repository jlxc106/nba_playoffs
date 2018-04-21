import React, { Component } from "react";
import axios from "axios";
import _ from 'lodash';
import Series from './series';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bracket: []
		};
	}



	handleAxios() {
		axios
			.get(
				"https://cors-anywhere.herokuapp.com/https://data.nba.net/data/10s/prod/v1/2017/playoffsBracket.json"
			)
			.then(resp => {
				if (resp.request.status === 200) {
					this.setState({ bracket: resp.data.series });
				}
			});
	}

	componentWillMount() {
		this.handleAxios();
	}

	render() {
		let { bracket } = this.state;
		if (_.isEmpty(bracket)) {
			return <div>loading...</div>;
		}
		return(
      <div className="App">
        <div className="left-column">
          <p className="west">West</p>
          <p className="east">East</p>
        </div>
        <div className="contain-bracket">
          {bracket.map((series, id) => {
            return <Series key={id} id={id} series={series} />;
          })}
        </div>
      </div>
    )
	}
}

export default Home;
