import React from 'react';

const Circle = ({circleText, effortPoints, progressPercent}) => {
  const scale = effortPoints / 15;
  const differencePercent = 10; // TODO: load this from spreadsheet

  const hrStyle = {
    top: (scale*283)+'px',
    width: (scale*569)+'px',
    margin: '0 0 0 '+(scale*-35)+'px',
  };
  const outerCircleStyle = {
    height: (scale*500)+'px',
    width: (scale*500)+'px',
    padding: (scale*35)+'px',
  };
  const progressCircleStyle = {
    margin: (scale*-33)+'px' + 0 + 0 + (scale*-33)+'px',
    width: (scale*569)+'px',
    height: (scale*569)+'px',
    left: '33px',
    transformOrigin: 'center center',
    top: '33px',
    background: makeConicGrad(Math.round(progressPercent), Math.round(differencePercent)),
  };
  const circleStyle = {
    height: (scale*500)+'px',
    width: (scale*500)+'px',
    fontSize: (scale*70)+'px',
  };
  return (
    <div style={outerCircleStyle} className="outer-circle">
      <div style={progressCircleStyle} className="progress-circle" data-start="0" data-value="180"></div>
      {/*<div style={progressCircleStyle} className="progress-circle" data-start="180" data-value="90"></div>*/}
      {/*<div className="progress-circle difference" data-start="270" data-value="50"></div>*/}
      <hr style={hrStyle}/>
      <hr style={Object.assign({transform: 'rotate(-90deg)'}, hrStyle)}/>
      <hr style={Object.assign({transform: 'rotate(-45deg)'}, hrStyle)}/>
      <hr style={Object.assign({transform: 'rotate(-135deg)'}, hrStyle)}/>
      <div style={circleStyle} className="circle">
        {circleText}
      </div>
    </div>
  );
};

function makeConicGrad(progressPercent, differencePercent) {
  const progressColor = 'rgba(244, 123, 91, 0.8)';
  const progressColor2 = 'rgba(244, 123, 91, 0.8)';//'rgba(206, 76, 41, 0.9)';
  const differenceColor = 'rgba(244, 210, 91, 0.8)';
  return `conic-gradient(${progressColor} 0%, ${progressColor2} ${progressPercent}%, ${differenceColor} ${differencePercent}%, ${differenceColor} ${differencePercent+progressPercent}%, rgba(0,0,0,0) ${(100-progressPercent)}%, rgba(0,0,0,0) 100%)`;
}

export default Circle;