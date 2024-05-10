import { useEffect, useState } from "react";
import { api_url } from "../scripts/api";
import { Link } from "react-router-dom";

import "./ImageGrid.css";

interface ImageGridProps {
    data2:any;
}
export const ImageGrid = ({data2}:ImageGridProps) => {

    const [data, setData] = useState<any | null>(null)
    
    useEffect(() => {
        async function callAPI() {
            try {
                const res = await fetch(`${api_url}/api/image-boxes?populate=*`);
                const json = await res.json();
        
                setData(json.data);
                console.log(json.data);
                console.log("length: " + json.data.length)
                setBox_num(json.data.length);

            } catch(error) {
                console.log(error)
            }
        }

        callAPI();
        
    }, [])
    
    const [box_num, setBox_num] = useState(0);

    return (
        <div className="image-grid">
            {[...Array(box_num)].map((_:number, index) => (
                <ImageBox box_num={index} imagebox_data={data[index]} key={index} />
            ))}
        </div>
    )
}

interface ImageBoxProps {
    box_num:number;
    imagebox_data:any;
}

const ImageBox = ({box_num, imagebox_data}:ImageBoxProps) => {

    console.log("box #" + box_num);
    console.log(imagebox_data);
    const image_url = imagebox_data.attributes.BackgroundImage.data.attributes.formats.medium.url;
    console.log(image_url);

    return (
        <div className="image-box" style={{backgroundImage:`linear-gradient(to bottom, rgba(0, 0, 0, .4), rgba(0, 0, 0, .3)),url(${api_url}${image_url})`}}>
            <h3 className="ib-topic"> {imagebox_data.attributes.Topic}</h3>
            <p className="ib-description">{imagebox_data.attributes.Description}</p>
            <Link to={imagebox_data.attributes.Route} className="button-28">Learn More</Link>
        </div>
    )
}