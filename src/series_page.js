import React, {Component} from 'react';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import axios from 'axios';

class Series_page extends Component{
    constructor(props){
        super(props);

        this.state = {
            series:{},
            topTeam: null,
            bottomTeam: null,
            videos: [],
            nextGame: null
        }
        this.handleClick = this.handleClick.bind(this);
    }


    getNextGame = () => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://data.nba.net/data/10s/prod/v1/2017/teams/${this.props.location.state.series.topRow.teamId}/schedule.json`).then((resp)=>{
            console.log(resp);
            if(resp.status === 200){
                const gameNum = resp.data.league.lastStandardGamePlayedIndex + 1;
                const gameDay = resp.data.league.standard[gameNum].startDateEastern;
                const year = gameDay.substring(0,4);
                const month = gameDay.substring(4,6);
                const day = gameDay.substring(6,8);
                const date = new Date(year, month-1, day);
                this.setState({nextGame: date.toLocaleDateString()});
            }
        })
    }

    componentWillMount(){
        const series_info = this.props.location.state;
        this.setState({series: series_info.series, topTeam: series_info.topTeam, bottomTeam: series_info.bottomTeam});
        const game_num = parseInt(series_info.series.topRow.wins) + parseInt(series_info.series.bottomRow.wins);
        YTSearch({key: "AIzaSyDNGakh-vKUDZBEKzVbpmYPu3yWYt1fnTw", term:`${series_info.topTeam} ${series_info.bottomTeam} game ${game_num}`}, (videos)=>{
            this.setState({videos: videos});
        });
        this.getNextGame();
    }

    handleClick(event){
        this.props.history.push('/');
    }

    render(){
        if(_.isEmpty(this.state.series)){
            return<div>Loading...</div>
        }
        let {series, topTeam, bottomTeam, nextGame} = this.state;
        let {topRow, bottomRow} = this.state.series;
        console.log(this.state);
        return(
            <div className="series_page_cover">
                <div className="series-info">
                <button className="back-button btn btn-danger" onClick={this.handleClick}>Back</button>

                    Next Game:{series.isSeriesCompleted ? `series complete` : nextGame}
                 </div>
                <div className="team-info">({topRow.seedNum}){topTeam}
                    <div>wins: {topRow.wins}</div>
                </div>
                <div className="team-info">({bottomRow.seedNum}){bottomTeam}
                    <div>wins: {bottomRow.wins}</div>
                </div>

                <div className="contain-youtube">
                    <div className='video-title'>Videos</div>
                    {
                        this.state.videos.map((video)=>{
                            const videoID = video.id.videoId;
                            const url = `https://www.youtube.com/embed/${videoID}`;
                            return(
                                <div key={video.etag} className="contain-vid embed-responsive embed-responsive-16by9">
                                    <iframe className="embed-responsive-item" key={video.etag} src={url}></iframe>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}

export default Series_page;