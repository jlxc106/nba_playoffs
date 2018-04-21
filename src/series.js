import React, { Component } from "react";
import {Link} from 'react-router-dom';


export default class Series extends Component {
	constructor(props) {
        super(props);
        
        this.state = {

        }
	}

	teamIdToName(ID) {
		switch (parseInt(ID)) {
			case 1610612737:
				return "Atlanta Hawks";
			case 1610612738:
				return "Boston Celtics";
			case 1610612751:
				return "Brooklyn Nets";
			case 1610612766:
				return "Charlotte Hornets";
			case 1610612741:
				return "Chicago Bulls";
			case 1610612739:
				return "Cleveland Cavaliers";
			case 1610612742:
				return "Dallas Mavericks";
			case 1610612743:
				return "Denver Nuggets";
			case 1610612765:
				return "Detroit Pistons";
			case 1610612744:
				return "Golden State Warriors";
			case 1610612745:
				return "Houston Rockets";
			case 1610612754:
				return "Indiana Pacers";
			case 1610612746:
				return "Los Angeles Clippers";
			case 1610612747:
				return "Los Angeles Lakers";
			case 1610612763:
				return "Memphis Grizzlies";
			case 1610612748:
				return "Miami Heat";
			case 1610612749:
				return "Milwaukee Bucks";
			case 1610612750:
				return "Minnesota Timberwolves";
			case 1610612740:
				return "New Orleans Pelicans";
			case 1610612752:
				return "New York Knicks";
			case 1610612760:
				return "Oklahoma City Thunder";
			case 1610612753:
				return "Orlando Magic";
			case 1610612755:
				return "Philadelphia 76ers";
			case 1610612756:
				return "Phoenix Suns";
			case 1610612757:
				return "Portland Trail Blazers";
			case 1610612758:
				return "Sacramento Kings";
			case 1610612759:
				return "San Antonio Spurs";
			case 1610612761:
				return "Toronto Raptors";
			case 1610612762:
				return "Utah Jazz";
			case 1610612764:
				return "Washington Wizards";
			default:
				return "?";
		}
	}

	get_column(id) {
		if (id < 8) {
			return 0;
		} else if (id < 12) {
			return 1;
		} else if (id < 14) {
			return 2;
		}
		return 3;
	}

	render() {
        const { series, id } = this.props;
        if(series.isScheduleAvailable){
            const topTeam = this.teamIdToName(series.topRow.teamId);
            const bottomTeam = this.teamIdToName(series.bottomRow.teamId);
            const top_classname = (series.topRow.isSeriesWinner ? "top-team team-won":"top-team");
            const bottom_classname = (series.bottomRow.isSeriesWinner ? "bottom-team team-won":"bottom-team");

            return (
                <Link to={{pathname: '/series_page', state:{series, 'topTeam':topTeam, 'bottomTeam':bottomTeam} }} >
                    <div className={`contain_series col${this.get_column(id)} row${id} highlightDiv`}>
                        <div className={top_classname}>
                            {series.topRow.seedNum ? series.topRow.seedNum+". " + this.teamIdToName(series.topRow.teamId) + " " + series.topRow.wins: "?"}
                        </div>
                        vs
                        <div className={bottom_classname}>
                            {series.bottomRow.seedNum ? series.bottomRow.seedNum+". " + this.teamIdToName(series.bottomRow.teamId) + " " + series.bottomRow.wins: "?"}
                        </div>
                    </div>
                </Link>
            ); 
        }
		return (
			<div className={`contain_series col${this.get_column(id)} row${id}`}>
				<div>
                    {series.topRow.seedNum ? series.topRow.seedNum+". " + this.teamIdToName(series.topRow.teamId) + " " + series.topRow.wins: "?"}
				</div>
				vs
				<div>
                    {series.bottomRow.seedNum ? series.bottomRow.seedNum+". " + this.teamIdToName(series.bottomRow.teamId) + " " + series.bottomRow.wins: "?"}
				</div>
			</div>
		);
	}
}
