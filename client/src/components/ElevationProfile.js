import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, defs, linearGradient, stop,
} from 'recharts';
import flatten from 'lodash/flatten';
import styles from '../stylesheets/ElevationProfile.module.scss';

class ElevationProfile extends Component {
  handleMouseEnter = (event) => {
    console.log(event);
  }

  render() {
    const {
      elevationData, elevation,
    } = this.props;

    const data = flatten(elevationData);

    return (
      <div className={styles.container} style={{ height: elevation ? '35%' : '0' }}>
        {elevationData.length === 0 ? (
          'No elevation data yet'
        ) : (
            <ResponsiveContainer width="80%" height="90%">
              <AreaChart
                data={data}
                margin={{
                  top: 10, right: 20, left: 20, bottom: 0,
                }}
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
          )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  elevationLoading: store.map.elevationLoading,
  elevationData: store.map.elevationData,
  elevation: store.map.elevation,
});

ElevationProfile.propTypes = {
  elevationLoading: PropTypes.bool,
  elevationData: PropTypes.array,
  elevation: PropTypes.bool,
};

export default connect(mapStateToProps, null)(ElevationProfile);
