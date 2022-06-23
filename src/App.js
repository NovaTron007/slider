import React, { useState, useEffect } from "react"
import {FiChevronRight, FiChevronLeft } from "react-icons/fi"
import { FaQuoteRight } from 'react-icons/fa'
import data from "./data"

function App() {
  const [people, setPeople] = useState(data)
  const [currentIndex, setCurrentIndex] = useState(0)

  // currentIndex: less than data length set to lastIndex. Greater than: set to 0
  useEffect(() => {
    const lastIndex = people.length - 1 // last index in array 
    // if currentIndex < 0, set currentIndex to array length-1
    if(currentIndex < 0){
      setCurrentIndex(lastIndex)
    }
    if(currentIndex > lastIndex) {
      setCurrentIndex(0)
    }
  }, [currentIndex, people])

  // auto run slider using setInterval
  useEffect(() => {
    let sliderInterval = setInterval(() => {
      // increment currentIndex
      setCurrentIndex(currentIndex + 1)
    }, 3000)

    // cleanup: remove previous setinterval on next, prev btns
    return () => {
      clearInterval(sliderInterval)
    }

  }, [currentIndex]) // run when currentIndex changes
  
  

  return (
    <section className="section">

      <div className="title">
        <h2><span>/</span>Reviews</h2>
      </div>


      <div className="section-center">
        {/* map data into article tag */}
        {people.map((item, index) => {
          // destructure person item obj
          const {id, image, name, title, quote} = item
          // right side class
          let position = "nextSlide"
          // if item index same as state currentIndex then add active class
          if(index === currentIndex) {
            position="activeSlide"
          } 
          // left side class
          if(index === currentIndex - 1 || currentIndex === 0 && index === people.length - 1 ) {
            position = "lastSlide"
          }

          return(
            <article key={id} className={position}>
              <img src={`${image}`} alt={title} className="person-img" />
                <h2>{name}</h2>
                <p className="title">{title}</p>
                <p className="text">{quote}</p>
                <FaQuoteRight className="icon"/>
            </article>
          )
        })}
        <button className="prev" onClick={() => setCurrentIndex(currentIndex - 1)}><FiChevronLeft /></button>
        <button className="next" onClick={() => setCurrentIndex(currentIndex + 1)}><FiChevronRight /></button>
      </div>
    </section>
  );
}

export default App;
