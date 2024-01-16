import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div>
            <div className="card">
                <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: "90%", zIndex: 1 }}>
                    {source}
                </span>
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p class="card-text"><small>Last updated by {author} at {new Date(date).toTimeString()}</small></p>
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary btn-dark">Read More</a>
                </div>
            </div>

        </div>
    )
}

export default NewsItem