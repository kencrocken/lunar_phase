/* eslint no-console: 0, react/proptypes: 0 */
import React, { Component } from 'react';

class Moon extends Component {

    constructor(props) {

        super(props);
        console.debug(props);
        this.state = {

            moon: {

                diameter    : 200,
                shadowColor : "#333333",
                lightColor  : "#e6e6e6",
                earthshine  : 0.1,
                blur        : 1

            }

        };
        this.waxing   = this.waxing.bind(this);
        this.setPhase = this.setPhase.bind(this);

    }

    setPhase( percent, waxing, moon ){

        // console.log( percent, waxing, moon );
        function calcInner( diameter, illumination ) {

            let innerRadius,
                absIllumin = Math.abs(illumination),
                n = ((1-absIllumin) * diameter/2) || 0.01;

            innerRadius = n/2 + diameter * diameter/ (8 * n);
            console.debug( diameter, absIllumin, n, innerRadius );

            return {

                d : innerRadius * 2,
                o : illumination > 0 ? (diameter/2 - n) : (-2 * innerRadius + diameter/2 + n)

            };
        }
        // TODO: props not populated before calcMoonProps called
        function calcMoonProps( illumination, light, shadow, isWaxing ){
            console.debug( illumination );

            if( illumination < 0.5 ) {

                outerColor = light;
                innerColor = shadow;
                if ( !isWaxing ){

                    illumination *= -1;

                }

            } else {

                outerColor = shadow;
                innerColor = light;
                illumination = 1 - illumination;
                if ( isWaxing ){

                    illumination *= -1;

                }
            }
            console.debug({

                illumination: illumination,
                outer: outerColor,
                inner:  innerColor

            });
            return {

                illumination: illumination,
                outer: outerColor,
                inner:  innerColor

            };
        }

        let phase = calcMoonProps( this.props.percent, this.state.moon.lightColor, this.state.moon.shadowColor, this.waxing() );
        let blurSize = this.state.moon.blur;
        let innerDiameter = calcInner(this.state.moon.diameter, phase.illumination * 2);
        let blurredDiameter = innerDiameter.d - blurSize;
        let blurredOffset = innerDiameter.o - blurSize/2;
        let innerColor = phase.inner;
        let outerColor = phase.outer;
        // console.log( phase, blurredDiameter );

        let outerBoxStyles = {

            'position'        : `absolute`,
            'left'            : `50%`,
            'transform'       : `translateX(-50%)`,
            'height'          : `${this.state.moon.diameter}px`,
            'width'           : `${this.state.moon.diameter}px`,
            'border'          : `1px solid black`,
            'backgroundColor' : outerColor,
            'borderRadius'    : `${this.state.moon.diameter/2}px`,
            'zIndex'         : `1000`,
            'overflow'        : `hidden`

        };

        let innerBoxStyles = {

            'position'        : 'absolute',
            'backgroundColor' : innerColor,
            'borderRadius'    : `${ (blurredDiameter/2) }px`,
            'height'          : `${ blurredDiameter * 1 }px`,
            'width'           : `${blurredDiameter * 1 }px`,
            'left'            : `${ blurredOffset }px`,
            'top'             : `${ ((this.state.moon.diameter-blurredDiameter)/2) }px`,
            'boxShadow'       : `0px 0px ${ blurSize }px ${ blurSize }px ${ innerColor }`,
            'opacity'         : 1 - this.state.moon.earthshine

        }
        console.debug( "outer:", outerBoxStyles, "inner:", innerBoxStyles );
        return {
            inner : innerBoxStyles,
            outer : outerBoxStyles
        }
    }

    waxing(){
        // console.log( this.props.phase );
        let phase  = this.props.phase;
        let waxing = phase.toLowerCase().indexOf('wax') !== -1 ? true : false;
        // console.log( phase, waxing );
        // A string should be returned
        return waxing ? "true" : "false";

    }

    render() {

        let styles = this.setPhase( this.props.percent, this.waxing(), this.state.moon );
        let percentage = {
            color: "white",
            letterSpacing: "0.5px",
            marginTop: "0.67rem",
            marginBottom: "2rem"
        };
        let phase = {
            fontSize: "24px",
            marginBottom: "0"
        };
        let theMoon = <div className="outer" style={styles.outer}>
            <div className="inner" style={styles.inner}></div>
            </div>;
        return (
            <div>
                <p className="phase" style={phase}><span className="has-text-gradient">{this.props.phase}</span></p>
                <p className="percentage" style={percentage}>Percent Illuminated: {this.props.percent * 100}%</p>
                { styles.outer ? theMoon : null }
            </div>
        );

    }

}

export default Moon;
