import "../styles/variables.scss";

const CardComponent = ({ title, subtitle, text, imageUrl }) => {
  return (
    <div className={`box has-text-centered `}>
      <article className="media">
        <div className="media-left">
          <img src={imageUrl} alt="Image" height="100" width="100" />
        </div>
        <div className="media-content p-4">
          <p className="content is-large">
            <strong>{title}</strong> <br />
            <small>{subtitle}</small>
            {text}
          </p>
          <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item" aria-label="reply">
                <span className="icon is-small">
                  <i className="fas fa-reply" aria-hidden="true"></i>
                </span>
              </a>
              <a className="level-item" aria-label="retweet">
                <span className="icon is-small">
                  <i className="fas fa-retweet" aria-hidden="true"></i>
                </span>
              </a>
              <a className="level-item" aria-label="like">
                <span className="icon is-small">
                  <i className="fas fa-heart" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
  );
};
export default CardComponent;
