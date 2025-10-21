"use client";
import React from 'react'
import QuestionList from '../../../../components/QuestionList.jsx';

function page({params}) {
  const { subjectCode, year } = params;

  return (
    <div>
      <QuestionList subjectCode={subjectCode} year={year} />
    </div>
  )
}

export default page
