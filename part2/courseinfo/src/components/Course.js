import React from "react";

const Header = ({ course }) => {
    return <h1>{course}</h1>;
  };
  
  const Part = ({ part, exercises }) => {
    return (
      <p>
        {part} {exercises}
      </p>
    );
  };
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map((item, id) => (
          <Part
            part={item.name}
            exercises={item.exercises}
            key={item.name.slice(0, 3) + id}
          />
        ))}
      </>
    );
  };
  
  const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0);
    return <p>Number of exercises {total}</p>;
  };
  
  const Course = ({ course }) => {
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }

  export default Course