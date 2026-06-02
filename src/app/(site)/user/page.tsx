async function getCourses() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  return res.json();
}

export default async function Page() {
  const courses = await getCourses();

 console.log(courses);

  return (
    <div>
      {/* {courses.map(course => (
        <p key={course.id}>
          {course.title}
        </p>
      ))} */}
    </div>
  );
}