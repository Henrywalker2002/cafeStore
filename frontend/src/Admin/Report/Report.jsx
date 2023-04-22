import './Report.css'
import { BarChart,  XAxis, YAxis, Bar, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import './Report.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { format } from 'date-fns'
import Header from "../../Components/Header/Header";
import Title from '../../Components/Title/Title';
import { MdAddchart , MdArrowForward} from 'react-icons/md'
 
function Report() {
    // add cookie handle 
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState('2023-01-01')
    const [EndDate, setEndDate] = useState('2024-01-01')

    async function getData() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
        const res = await fetch("http://103.77.173.109:9000/index.php/income", requestOptions)
        const json = await res.json()
        if (json.result === "success") {
            setData(json.message)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    var chartData = data.filter(e => 
        e.timeComplete <= EndDate && e.timeComplete >= startDate
    )

    var chart = (
        <ResponsiveContainer>
            <BarChart data = {chartData}>
                <XAxis dataKey="timeComplete" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    )

    var title = (
        <Title 
            title= "Report"
            icon={<MdAddchart className='title-icon' />}
        />
    )

    function handleDate(e) {
        var date = format(e.target.valueAsDate, 'yyyy-MM-dd')
        return date
    }
    
    return (
        <div>
            <Header />
            <Container>
                <Row className='row'>
                    <Col>
                        {title}
                    </Col>

                    <Col className='col2' style={{margin : "auto"}}>
                        <div id='select-day'>
                            <input type='date' onChange={(e) => setStartDate(handleDate(e))}/>
                            <MdArrowForward />
                            <input type='date' onChange={(e) => setEndDate(handleDate(e))}/>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className='container2'>
                <div className='reportContainer'>
                    {chart}
                </div>
            </div>
        </div>
    )
}

export default Report;