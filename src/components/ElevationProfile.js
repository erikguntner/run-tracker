import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import styles from '../stylesheets/ElevationProfile.module.scss';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, defs, linearGradient, stop } from 'recharts';
import flatten from 'lodash/flatten';

class ElevationProfile extends Component {

  handleMouseEnter = (event) => {
    console.log(event);
  }

  render() {
    const { elevationData, elevation, maxElevation, minElevation } = this.props;

    const data = flatten(elevationData);

    return (
      <div className={styles.container} style={{ height: elevation ? '35%' : '0' }}>
        {elevationData.length === 0 ? (
          'No elevation data yet'
        ) : (
            <Fragment>
              <ResponsiveContainer width="80%" height="90%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
                  onMouseEnter={this.handleMouseEnter}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="distance" unit="miles" />
                  <YAxis unit="ft." type="number" domain={['dataMin', 'dataMax']} dataKey="elevation" />
                  <Tooltip />
                  <Area type='monotone' dataKey='elevation' stroke='#82ca9d' fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className={styles.climb}>
                Max Climb: {maxElevation - minElevation}
              </div>
            </Fragment>
          )}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  elevationLoading: store.map.elevationLoading,
  elevationData: store.map.elevationData,
  elevation: store.map.elevation,
  maxElevation: store.map.maxElevation,
  minElevation: store.map.minElevation
})

export default connect(mapStateToProps, null)(ElevationProfile);
