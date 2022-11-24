import { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Form, Card, notification, DatePicker, Input, Typography, TimePicker, Dropdown, Button, Space } from 'antd'
import style from '../style'
import { DETAIL_QUERY } from '../details/useGetRoomDetails'

const genRandom = () => {
    return Math.floor(Math.random() * 90000) + 10000;

}


// mutation
const CREATE_MEETING = gql`
mutation CreateMeeting(
    $id: Int!
    $title: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $meetingRoomId: Int!
    ) {
        Meeting(id: $id, title: $title, date: $date, startTime: $startTime,endTime: $endTime, meetingRoomId: $meetingRoomId ) {
      id
      title
    }
  }
`;

const Addmeeting = () => {
    const navigate = useNavigate()

    const [createMeeting, { data }] = useMutation(CREATE_MEETING, {
        context: {
            headers: {
                "token": "a123gjhgjsdf6576"
            }
        },
        refetchQueries: [
            { query: DETAIL_QUERY }
        ]
    });

    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'Success',
            description: 'New Meeting Added',
        });
    };

    useEffect(() => {
        if (data?.Meeting?.id) {
            // show success toast mssg & navigate to main page
            openNotificationWithIcon('success')
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
    }, [data])


    const { Title } = Typography;
    const { card, root, wrapper } = style
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [startTime, setstartTime] = useState('')
    const [endTime, setendTime] = useState('')
    const id = genRandom()
    const meetingRoomId = 1 //this value shud be coming from selecting building 


    const handleTimeRange = (_, timeRange) => {
        setstartTime(timeRange[0])
        setendTime(timeRange[1])
    }

    const handleDateChange = (_, dateString) => {
        setDate(dateString)
    }


    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const submitForm = (event) => {
        event.preventDefault();
        // mutation call
        createMeeting({ variables: { id, title, date, startTime, endTime, meetingRoomId } });

    }

    const ifDisabled = () => {
        if (title && date && startTime && endTime) {
            return false
        }
        return true
    }


    return (
        <div style={root}>
            <div style={wrapper}>
                <Title level={3}>Add Meeting</Title>

                <Card style={card}>

                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                    >
                        <Form.Item>
                            <DatePicker onChange={handleDateChange} name="date" />
                        </Form.Item>

                        <Form.Item>
                            <TimePicker.RangePicker onChange={handleTimeRange} />
                        </Form.Item>

                        <Form.Item>
                            <Input placeholder="Title" onChange={handleTitle} />
                        </Form.Item>

                        <Button block type="primary" onClick={submitForm} disabled={ifDisabled()}>Create meeting</Button>



                    </Form>
                </Card>
            </div>
        </div >
    )

}


export default Addmeeting