import React from 'react';

const Card = ({ key , name, email }) => {
  const gender = Math.random() > 0.5 ? 'men' : 'women';
  const imageNumber = Math.floor(Math.random() * 35) + 1;
  const imageURL = `https://randomuser.me/api/portraits/${gender}/${imageNumber}.jpg`;

  const handleClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className='tc bg-light-green dib br pa3 ma2 grow bw2 shadow-5' onClick={handleClick}>
      <img src={imageURL} width='200' height='200' alt={name} />
      <div>{name}</div>
      <p>{email}</p>
    </div>
  );
};

export default Card;
