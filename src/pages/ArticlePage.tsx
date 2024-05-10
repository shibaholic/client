import { useEffect, useRef, useState } from "react";
import { api_url } from "../scripts/api";

import "./ArticlePage.css"
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

type ArticlePageProps = {
    articleID?:string;
    collection?:string;
    newsPanel:boolean;
}

export const ArticlePage = (articlePageProps:ArticlePageProps) => {
    const location = useLocation();
    const {id:id_param} = useParams();

    const [data, setData] = useState<any | null>(null);

    useEffect(() => {
        async function callAPI() {
            let api_string = "";
            if(articlePageProps.articleID != null) {
                api_string = `${api_url}/api/articles?populate=banner&filters[articleID][$eqi]=${articlePageProps.articleID}`;
            } else {
                if(articlePageProps.collection != null && id_param != null) {
                    api_string = `${api_url}/api/${articlePageProps.collection}?populate=*&filters[id][$eqi]=${id_param}`
                } else {
                    throw new Error("articlePageProps were not properly filled out");
                }
            }
            console.log(api_string);

          try {
            const res = await fetch(`${api_string}`);
            const json = await res.json();
            //console.log(json.data);
            setData(json.data[0]);
            
          } catch(error) {
            console.log(error)
          }
        }
    
        callAPI();

    }, [location])

    useEffect(() => {
        // measure the height of the article using the ref, and pass that height value to news panel
        // only do this on updated on useState(data) because that means the articleRenderer has made the page.
        if(articleRef.current) {
            setArticleHeight(articleRef.current.offsetHeight);
        }
    }, [data])

      const [articleHeight, setArticleHeight] = useState<number | null>(null);
      const articleRef = useRef<HTMLDivElement>(null);

    return(
        <div className="article-page">
            {data === null ? <p>data is null</p> :
            <div>
                <div className="article-bg-banner"
                style={{backgroundImage:`url(${api_url}${data.attributes.banner.data.attributes.formats.large.url})`}}></div>

                <h1 className="article-title section-content">{data.attributes.title}</h1>

                <div className="article-content section-content">
                    <ArticleRenderer refPass={articleRef} article={data.attributes.article} />
                    {articlePageProps.newsPanel ? 
                        <NewsPanel maxHeight={articleHeight}/>
                    : 
                        <></>
                    }
                </div>
            </div>
            }
        </div>
    )
}

interface ArticleRendererProps {
    article:any[];
    refPass:React.RefObject<HTMLDivElement>;
}

const ArticleRenderer = ({refPass, article}:ArticleRendererProps) => {

    return(
        <div ref={refPass} className="article-renderer">
            <h2 className="hiddenH2"></h2>
            {article.map((element, index) => (
                <ElementRenderer key={index} index={index} element={element} />
            ))}
        </div>
    )
}

interface ElementRendererProps {
    element:any;
    index:number;
}

const ElementRenderer = ({index, element}:ElementRendererProps) => {

    if(element.type === "heading") {
        // console.log(index + "= heading" ) 
        return (
            <div key={index} className="article-heading">
                {React.createElement("h" + Math.max(element.level, 3), {key:index}, element.children[0].text)}
            </div>
        )
    }

    if(element.type === "paragraph") {
        console.log(index + "= paragraph" ) 
        return (
            <p key={index} className="article-paragraph">
                {element.children[0].text}
            </p>
        )
    }
}

interface NewsPanelProps {
    maxHeight:number|null;
}

const NewsPanel = ({maxHeight}:NewsPanelProps) => {

    console.log("news maxHeight " + maxHeight); 
    const [multiples, setMultiples] = useState(1);

    const [news, setNews] = useState<any[]>([])

    useEffect(() => {
        async function callAPI() {
          try {
            const res = await fetch(`${api_url}/api/news-articles?populate=banner`);
            const json = await res.json();
            console.log(json.data);
            setNews(json.data);
            
          } catch(error) {
            console.log(error)
          }
        }

        callAPI();
    }, [])

    useEffect(() => {
        console.log("effect maxHeight: " + maxHeight);
        const multiplesTemp = Math.floor(maxHeight!/275) + 1;
        setMultiples(multiplesTemp);
    }, [maxHeight])

    return (
        <div >
            {news === null || news.length === 0 ? <p>news is null</p> :
            <div className="news-panel">
                <h2>Recent News</h2>
                <div className="news-blocks">
                    {[...Array(multiples)].map((_, index:number) => {
                        const one_news = news[index]
                        function read200words(heading_paragraph:any) {
                            let s = "";
                            for(let i = 0; i < heading_paragraph.length; i++ ) {
                                const element = heading_paragraph[i];
                                s = s.concat(element.children[0].text + " ");
                                if(s.length > 200) break;
                            }
                            return s;
                        }
                     return (
                        <div key={index} className="news-block">
                            <h3 className="news-title"><Link to={`/news/${one_news.id}`}>{one_news.attributes.title}</Link></h3>
                            <img src={`${api_url}${one_news.attributes.banner.data.attributes.formats.medium.url}`} />
                            <p>{read200words(one_news.attributes.article)}</p>
                        </div>
                    )
                    })}
                </div>
            </div>
            }
        </div>
    )
}