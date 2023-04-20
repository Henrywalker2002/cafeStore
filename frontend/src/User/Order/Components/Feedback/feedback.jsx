import './feedback.css'
import Star from './Star1.png'
import { useState } from "react"

function MyFeedback(props) {
    const id = props.id
    const [star, setStar] = useState(0);
    const [comment, setComment] = useState("");

    const handleChangeStar = event => {
        setStar(event.target.value);
    }

    const handleChangeComment = event => {
        setComment(event.target.value);
    }

    async function handleSubmitFeedback(event) {
        //Prevent page reload
        event.preventDefault();
        var raw = JSON.stringify({
            "id": id,
            "star" : star,
            "feedback" : comment,
        });

        var requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: raw,
            redirect: 'follow'
        };

        const res = await fetch("http://103.77.173.109:9000/index.php/feedback", requestOptions);
        const json = await res.json()
        console.log(json)
        
    };

    return (
        <form onSubmit={handleSubmitFeedback} id="myfeedback" className="my-feedback">
            <label className='h4'>MY FEEDBACK:</label>
            <img src={Star} alt="star rate"/>
            <select name="rate" id="rate" defaultValue={props.star} onChange={handleChangeStar}>
                <option value="0">Not rate</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <textarea id='feedback_text' placeholder='Fill your feedback in here' onChange={handleChangeComment}></textarea>
            <input type="submit" value='Send'/>
        </form>
    );
}

export default MyFeedback;