import React from 'react';

const desktopRadius = window.innerHeight / 7.5;
const mobileRadius = window.innerWidth / 7.5;
const radius = window.innerHeight < window.innerWidth ? desktopRadius : mobileRadius;

const borderWidth = 7;
const DEEPSKYBLUE = '#00BFFF';
const GOLD = "#FFD700";

export default function Reticle(contentFound) {
  const borderColor = contentFound ? GOLD : DEEPSKYBLUE;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      marginLeft: -radius,
      marginTop: -radius,
      width: radius * 2 - borderWidth * 2,
      height: radius * 2 - borderWidth * 2,
      borderRadius: '50%',
      borderStyle: 'double',
      borderWidth,
      borderColor,
      zIndex: '99999'
    }}
    />
  );
}
