import React from 'react';


const Circle = ({circleText, effortPoints, progressPercent}) => {
  const scale = effortPoints / 25;
  const differencePercent = 0; // TODO: load this from spreadsheet

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
    boxShadow: `inset ${scale*4}px ${scale*4}px ${scale*6}px 0 rgba(0, 0, 0, 0.3), ${scale*3}px ${scale*3}px ${scale*4}px rgba(255, 255, 255, 1)`,
  };
  const circleStyle = {
    height: (scale*500)+'px',
    width: (scale*500)+'px',
    fontSize: (scale*70)+'px',
    boxShadow: `inset ${scale*3}px ${scale*3}px ${scale*4}px rgba(255, 255, 255, 1), ${scale*6}px ${scale*6}px ${scale*10}px 0 rgba(0, 0, 0, 0.3)`,
    textShadow: `${scale*2}px ${scale*2}px ${scale*2}px rgba(0, 0, 0, 0.6)`,
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
        <span>{circleText}</span>
      </div>
    </div>
  );
};

function makeConicGrad(progressPercent, differencePercent) {
  const progressColor = 'rgba(244, 123, 91, 0.8)';
  const differenceColor = 'rgba(244, 210, 91, 0.8)';
  const differenceSegment = (100-progressPercent > differencePercent) ? `${differenceColor} ${progressPercent}%, ${differenceColor} ${progressPercent+differencePercent}%,` : '';
  return `conic-gradient(${progressColor} ${progressPercent}%, ${differenceSegment} rgba(0,0,0,0) 0)`;
}

export default Circle;