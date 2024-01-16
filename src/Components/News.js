import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'

const News =(props)=>{
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${this.capitalizeFirstLetter(props.category)} Kal-Tak`
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateNews= async() => {
    // this.setState({
    //   loading : true
    // })
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    props.setProgress(50)
    let parsedData = await data.json();
    props.setProgress(70)
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }
  useEffect(() => {
    updateNews()
  }, [])
  
  // async componentDidMount(){
  //   // this.setState({
  //   //   loading : true
  //   // })
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a94e0c1efe5b46d4b588a5ab1c32e5c4&page=${this.state.page}&pageSize=${props.pageSize}`
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   articles : parsedData.articles,
  //   //   totalResults: parsedData.totalResults,
  //   //   loading : false
  //   // })
  //   this.updateNews();
  // }
//   handleNextClick = async ()=>{
//   //   if(!(this.state.page +1 > Math.ceil(this.state.totalResults/props.pageSize))){
//   //   this.setState({
//   //     loading : true
//   //   })
//   //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a94e0c1efe5b46d4b588a5ab1c32e5c4&page=${this.state.page + 1}&pageSize=${props.pageSize}`
//   //   let data = await fetch(url);
//   //   let parsedData = await data.json();
//   //   this.setState({
//   //     page : this.state.page+1,
//   //     articles : parsedData.articles,
//   //     loading : false
//   //   })
//   // }
//   this.setState({page : this.state.page+1})
//   this.updateNews();
// }
//   handlePrevClick = async ()=>{
//     // this.setState({
//     //   loading : true
//     // })
//     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a94e0c1efe5b46d4b588a5ab1c32e5c4&page=${this.state.page - 1}&pageSize=${props.pageSize}`
//     // let data = await fetch(url);
//     // let parsedData = await data.json();
//     // this.setState({
//     //   page : this.state.page-1,
//     //   articles : parsedData.articles,
//     //   loading : false
//     //   })
//     this.setState({page : this.state.page-1})
//   this.updateNews();
//   }
  const fetchMoreData = async () => {
    // this.setState({
    //   page: this.state.page + 1
    // })
    setPage(page+1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a94e0c1efe5b46d4b588a5ab1c32e5c4&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    // this.setState({
    //   articles : this.state.articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    // })
  };
    return (
      <>
        <h2 className='text-center' style={{marginTop: "70px"}}>KalTak-Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        {loading && <Spinner/>}
        <InfiniteScroll
        dataLength = {articles.length}
        next = {fetchMoreData}
        hasMore = {articles.length !== totalResults}
        loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {/*!this.state.loading &&*/ articles.map((element) =>{
            return <div className="col-md-4 my-2" key={element.url}>
            <NewsItem title = {element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""} 
            imageUrl = {element.urlToImage?element.urlToImage:"https://etstatic.tnn.in/thumb/msid-105981893,width-1280,height-720,resizemode-75/105981893.jpg"} 
            newsUrl = {element.url} author = {element.author?element.author:"Unknown"} date = {element.publishedAt} source = {element.source.id} />
          </div>
          })}
        </div>  
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
                <button disabled ={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}
      </>
    )
}
News.defaultProps = {
  country : "in",
  pageSize : 8,
  category : "general",
}
News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number, 
  category : PropTypes.string,
}

export default News