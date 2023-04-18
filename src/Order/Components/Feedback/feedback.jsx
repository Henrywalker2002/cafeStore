import './feedback.css'
import Star from './Star1.png'

function MyFeedback(props) {
    return (
        <form action="" id="myfeedback" className="my-feedback">
            <label className='h4'>MY FEEDBACK:</label>
            <img src={Star} alt="star rate"/>
            <select name="rate" id="rate" defaultValue={props.star}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <input type="submit"/>
        </form>
    );
}

export default MyFeedback;