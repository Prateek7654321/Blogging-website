import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();
  console.log(profile);

  return (
    <div className="container mx-auto my-12 px-6 sm:px-10 md:px-16 lg:px-20">
      <div className="bg-white shadow-xl rounded-2xl p-8 space-y-10 border border-gray-200">
        <h1 className="text-4xl font-bold text-blue-900 border-b pb-4">About</h1>

        <p className="text-lg leading-relaxed text-gray-800">
          This is{" "}
          <strong className="text-blue-700 font-semibold underline decoration-dotted underline-offset-4">
            {profile?.user?.name}
          </strong>
          , a proficient full stack developer with a robust skill set spanning both front-end and back-end technologies. With a passion for building dynamic, responsive, and user-friendly web applications, he excels in crafting seamless digital experiences.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">🔧 Technical Expertise</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>
              <strong>Front-End:</strong> React.js, Angular, Vue.js, HTML5, CSS3, Tailwind, Responsive Design
            </li>
            <li>
              <strong>Back-End:</strong> Node.js, Express.js, Django, MongoDB, MySQL, PostgreSQL
            </li>
            <li>
              <strong>DevOps:</strong> Docker, Kubernetes, CI/CD pipelines
            </li>
            <li>
              <strong>Cloud:</strong> AWS, Azure, Google Cloud
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">🌟 Professional Highlights</h2>
          <p className="text-gray-700 leading-relaxed">
            Successfully developed and deployed full-stack applications with a keen eye for detail. Collaborated with cross-functional teams to deliver high-quality software. Continuously evolving by learning emerging technologies and adapting to modern trends in the software landscape.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">🚀 Vision & Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Dedicated to leveraging expertise to contribute to innovative projects and drive tech advancements. Passionate about delivering exceptional solutions across the stack—from beautiful interfaces to reliable backend logic.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">🏏 Personal Interests & Inspiration</h2>
          <p className="text-gray-700 leading-relaxed">
            Outside of coding, Prateek is a huge cricket fan and deeply admires <strong className="text-blue-800">King Kohli</strong>. His biggest inspiration is his brother, <strong className="text-blue-800">Naman</strong>, whose friendly rivalry and unwavering support constantly motivate him to reach greater heights.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
