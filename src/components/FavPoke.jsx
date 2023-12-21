import React from 'react'

function FavPoke({fav}) {
  return (
    <div>
        <h2>Your favorite Pokemon</h2>
        {fav?.map((data, idx) => (
            <div key={idx}>
            <h3>{data.name}</h3>
            <img src={data?.sprites?.other?.home?.front_default} alt="" />
            </div>
        ))}
    </div>
  )
}

export default FavPoke