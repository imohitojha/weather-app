import React from 'react';
import moment from "moment";
import './DailyCard.css';

const Daily_card = (props) => {

  // Varaible for storing the weather data from props
  const { data1 } = props;
  // Variable for creating the url for the weather icon of the daily card 
  const iconurl = `http://openweathermap.org/img/w/${data1?.cod !== "404" ? data1?.weather[0].icon : null}.png`;

  return (


    <div className="forecast-days w-100 text-capitalize fw-bold shadow-lg mt-3" data-testid="forecast">
      <div className="d-flex flex-wrap">

        <div className="forecast-days__row" data-testid="forecast_row">
          {/* Date Display for the Forecast Weather */}
          <div className="forecast-days__date">
            {moment(data1?.dt * 1000).format('dddd')}
            <div className="forecast-days__label">{moment(data1?.dt * 1000).format('DD/MM/yyyy')}</div>
          </div>
          {/* Low Temp Display for the Forecast Weather */}
          <div className="forecast-days__low" data-testid="low">
            {data1?.temp.min}&deg;c
          <div className="forecast-days__label">Low</div>
          </div>
          {/* Hign Temp Display for the Forecast Weather */}
          <div className="forecast-days__high">
            {data1?.temp.max}&deg;c
          <div className="forecast-days__label">High</div>
          </div>
          {/* Weather Icon */}
          <div className="forecast-days__icon" data-testid="icon">
            <img src={iconurl} alt="Sunny" />
          </div>
          {/* Rain Display */}
          <div className="forecast-days__rain">
            {((data1?.rain) === undefined) ? "no rain" : `${data1?.rain} mm`}
            <div className="forecast-days__label">Rain</div>
          </div>
          {/* Wind Display */}
          <div className="forecast-days__wind">
            {data1?.speed} m&#47;s
          <div className="forecast-days__label">Wind</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Daily_card;