import React from 'react'

const LocationsearchPanel = (props) => {
console.log(props);

const locations =[
  "Vishnapuri colony,Bamrauli,Prayagraj",
  "Prayagraj Airport ,Bamrauli,near Air force Station,Pryagraj",
  "Parade ground,Daraganj,Prayagraj",
  "ChandraShekhar Azad Park,Civil Lines,Praygraj"
]


  return (
    <div>
    
    {
      locations.map((location,idx)=>{
        return <div key={idx} onClick={()=>{
          props.setvehiclePanelOpen(true)
          props.setpanelOpen(false)
        }}className='font-semibold mb-2 border-2 border-gray-500 active:border-black'>{location}
        </div>
      })
    }




    </div>
  )
}

export default LocationsearchPanel
