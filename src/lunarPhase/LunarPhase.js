/* eslint no-console: 0 */
/* global console, navigator */
import React, { Component } from 'react';
import Moon from "./moon/Moon";
import './LunarPhase.css'
class LunarPhase extends Component {
    constructor( props ){

        super( props );
        this.state = {

            percentIlluminated : "",
            phaseofMoon        : "",
            ageOfMoon          : "",
            moonrise           : {},
            moonset            : {},
            coords             : {},
            location           : "",
            error              : ""

        }

        this.location = this.location.bind(this);

    }

    componentDidMount(){
        // console.log( this.props.isGeolocationEnabled, this.props.isGeolocationAvailable, this.props.coords );

        fetch('https://api.wunderground.com/api/c77d8fb81faedd5d/astronomy/q/39.2904,76.6122.json')
            .then( result => {

                return result.json();

            })
            .then( data => {

                console.debug( data.moon_phase );
                let lunarphase = data.moon_phase;
                this.setState({...lunarphase });

            })
            .catch( error => {

                console.error('Fetch Error :', error);

            });

            this.location();

    }

    location(){

        if ("geolocation" in navigator) {

            console.log('available', navigator.geolocation);
            let options = {

                enableHighAccuracy : true,
                timeout            : 10000,
                maximumAge         : 0

            };
            navigator.geolocation.getCurrentPosition( position => {
                console.log( position );

                let coords = {

                    latitude  : position.coords.latitude,
                    longitude : position.coords.longitude

                };
                this.setState({

                    coords : coords

                });

            }, error => {

                console.error( error );
                let coords = {

                    latitude  : "39.0963965",
                    longitude : "-76.8590672"

                };
                this.setState({

                    coords   : coords,
                    location : "Using default: Fulton, MD",
                    error    : error.message

                });

            }, options );

        } else {

            console.warn('not available');

        }

    }

    render() {

        let styles = {
            position: {
                info: {
                    color: "#ffffff"
                },
                coords:  {
                    fontSize: "16px",
                    fontWeight: "600",
                },
                region: {
                    fontSize: "21px",
                }
            },
            moonWrap : {
                position: "relative",
                paddingBottom: "250px"
            },
            error: {
                color: "white",
                maxWidth: "300px",
                margin: "0 auto",
                opacity: "0.7"
            },
            errorMsg: {
                color: "white",
                fontSize: "18px"
            }
        };

        let error = this.state.error;
        let moon = <Moon percent={this.state.percentIlluminated/100} phase={this.state.phaseofMoon} location={this.state.coords} />;
        let locationSection = <section className="position-info" style={styles.position.info}>
            { !error && <div>
                <p>Your current position:</p>
                <p className="position coords" style={styles.position.coords}>
                    <span className="latitude"> {this.state.coords.latitude}, </span>
                    <span className="longitude">{this.state.coords.longitude}</span>
                </p>
            </div>
            }
            <p className="position region" style={styles.position.region}>
                {this.state.location}
            </p>
        </section>;


        return (

            <article className = "moon-phase">
                <header className = "moon-phase-header">
                    <h1 className = "moon-phase-title"><span className="has-text-gradient">Tonight&#39;s Lunar Phase</span></h1>
                </header>
                <section className = "moon-phase-content" style={ {position: "relative"} }>
                    <div className = "moon-wrap" style={styles.moonWrap}>
                        { this.state.coords.latitude ? moon : null }
                    </div>
                    { error && <div className="error-wrap">
                        <p className="error-msg" style={styles.errorMsg}> Sorry there was an error.  The location services are unaccesible.</p>
                        <p className="error"style={styles.error}>{ error }</p>
                    </div>
                    }
                    <div className = "location-wrap" style={styles.locationWrap}>
                        { this.state.coords.latitude ? locationSection : null }
                    </div>
                </section>
            </article>

        );

    }

}

export default LunarPhase;
