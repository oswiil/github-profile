import React, { useEffect, useState } from "react";

function Detail(repoFocused) {
  const [detail, setdetail] = useState(null);

  useEffect(() => {
    const det = repoFocused.repos.find(
      (repo) => repo.name === repoFocused.focus
    );
    setdetail(det);
  }, [repoFocused]);
  return (
    <>
      {!detail && <div>Loading</div>}
      {detail && (
        <div className="box-fix">
          {" "}
          <div className="title ">About</div>
          {detail?.description}
          <div>
            Link{" "}
            <div
              src="../public/assets/link.svg"
              alt="Image"
              height="100"
              width="100"
            ></div>
          </div>
          <div className="title">topics</div>
          {detail?.topics.map((topic) => (
            <span class="tag is-light ml-2">{topic}</span>
          ))}
          <div className="title">activity</div>
          <a href={detail?.git_commits_url}>git_commits_url</a>
          <div>stars {detail?.stargazers_count}</div>
          <div>whatcing {detail?.watchers_count}</div>
          <div>forks_count {detail?.forks_count}</div>
        </div>
      )}
    </>
  );
}

export default Detail;
