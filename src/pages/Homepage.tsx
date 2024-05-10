import { useEffect, useState } from 'react'
import './Homepage.css'
import { api_url } from '../scripts/api';
import { Link } from 'react-router-dom';
import { LogoBig } from '../components/Logo';
import { ImageGrid } from '../components/ImageGrid';

const Homepage:React.FunctionComponent = () => {

  const [data, setData] = useState<any>({});
  const [slogan, setSlogan] = useState("error");

  const [bgImg, setBgImg] = useState<string | null>(null);

  useEffect(() => {
    async function callAPI() {
      try {
        const res = await fetch(`${api_url}/api/homepage?populate[0]=first_background_image`);
        const json = await res.json();

        const slogan2 = json.data.attributes.slogan;
        setSlogan(slogan2);

        setData(json.data);

        const imageUrl = json.data.attributes.first_background_image.data.attributes.url;

        setBgImg(`${api_url}${imageUrl}`);
      } catch(error) {
        console.log(error)
      }
    }

    callAPI();
  }, [location])
  
  return (
    <div className="homepage">
      <div 
        className="homepage-section1-bg" 
        style={{backgroundImage:`linear-gradient(to bottom, rgba(0, 0, 0, .4), rgba(0, 0, 0, .3)), url(${bgImg})`}}>
      </div>

      <div className="section-content homepage-section1">
        <LogoBig className="homepage-logo"/>

        <h1 className="slogan">
          {slogan}
        </h1>
        <Link to="/apply" className="button-28 homepage-apply">
          Apply Now
        </Link>
      </div>

      <div className="section-content homepage-section2"> 
      { /* small description of the school */ }
        <h2>Start your journey today</h2>
        <p>
          The London Language School specializes in international Language education. With more than 35 years of experience teaching Languages, LLS has gained a reputation for providing high quality education in a friendly and supportive environment at an affordable price. Students may begin their language program on any Monday. Join our international family today!  
        </p>
        { /* some image */ }
      </div>

      <div className="homepage-section3">
      { /* image grid to the same pages */ }
        <ImageGrid data2={data} />
      </div>

    </div>
  )
}

export default Homepage