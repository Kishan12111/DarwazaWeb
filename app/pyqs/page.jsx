"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { HoverEffect } from '@/components/ui/card-hover-effect';
import SubjectPage from '../../components/Subjectpage'


function page() {

    const [activeItem, setActiveItem] = useState(null);
    const [choosenSubject, setChosenSubject] = useState(null);

    useEffect(() => {
      setChosenSubject(activeItem);
      console.log("Chosen Subject:", activeItem);
    }, [activeItem]); 












  return (
    <div>
 <Header></Header>
{activeItem !== null ? 
<SubjectPage
    activeItem={activeItem}
  />  
  
  : <div className="">
      <HoverEffect activeItem={activeItem} setActiveItem={setActiveItem} />
    </div>

    
}

    </div>
  )
}

export default page
