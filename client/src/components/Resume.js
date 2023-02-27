import React, { useRef } from "react";
import ErrorPage from "./ErrorPage";
import { useReactToPrint } from "react-to-print";

const Resume = ({ resumeData }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${resumeData.firstName + " " + resumeData.lastName} Resume`,
    onAfterPrint: () => alert("Print Successful!"),
  });

  const replaceWithBr = (string) => {
    return string.replace(/\n/g, "<br />");
  };

  if (JSON.stringify(resumeData) === "{}") {
    return <ErrorPage />;
  }

  return (
    <>
      <button onClick={handlePrint}>Print Page</button>
      <main className="container" ref={componentRef}>
        <header className="header">
          <div>
            <h1>{resumeData.fullName}</h1>
            <p className="resumeTitle headerTitle">
              {resumeData.currentPosition} ({resumeData.currentTechnologies})
            </p>
            <p className="resumeTitle">
              {resumeData.currentLength}year(s) work experience
            </p>
          </div>
          <div>
            <img
              src={resumeData.image_url}
              alt={resumeData.fullName}
              className="resumeImage"
            />
          </div>
        </header>
        <div className="resumeBody">
          <div>
            <h2 className="resumeBodyTitle">PROFILE SUMMARY</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(resumeData.objective),
              }}
              className="resumeBodyContent"
            />
          </div>
          <div>
            <h2 className="resumeBodyTitle">WORK HISTORY</h2>
            {resumeData.workHistory.map((work) => (
              <p className="resumeBodyContent" key={work.name}>
                <span style={{ fontWeight: "bold" }}>{work.name}</span> -{" "}
                {work.position}
              </p>
            ))}
          </div>
          <div>
            <h2 className="resumeBodyTitle">JOB PROFILE</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(resumeData.jobResponsibilities),
              }}
              className="resumeBodyContent"
            />
          </div>
          <div>
            <h2 className="resumeBodyTitle">JOB RESPONSIBILITIES</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(resumeData.keypoints),
              }}
              className="resumeBodyContent"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Resume;
