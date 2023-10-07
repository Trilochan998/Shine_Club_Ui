import React, { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import '../css/loadingSpinner.css'

const About = () => {
  const[selectedlanguage, setSelectedlanguage] = useState("eng")

      const display = () => {
        setSelectedlanguage("eng")
        var array=document.getElementsByClassName('loading-spinner');
        for (let index = 0; index < array.length; index++) {
                const element = array[index];
                element.classList.remove("hideIt");
            //   console.log(element);
            }
      }

      const hide = () => {
        setSelectedlanguage("odia")
        var array=document.getElementsByClassName('loading-spinner');
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          element.classList.add("hideIt");
          }
      }
    

  return (
    <div>
      <h1>This is about page</h1>
      <div className='loading-spinner hideIt'><LoadingSpinner></LoadingSpinner></div>
      <button onClick={display}>Display eng</button>
      <button onClick={hide}>Hide odia</button>
    {
      selectedlanguage === "eng" ?
      <>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe inventore numquam quia nulla, expedita cum ratione laborum impedit eligendi placeat suscipit accusamus nihil ipsam beatae mollitia, nemo fugiat quos voluptates.</p>
      </>
      : <>
        <p>ମୋର ନାମ ସୋନୁନିଗମ୍ ବାର୍ |</p>
      </>
    }

    </div>
  )
}

export default About
