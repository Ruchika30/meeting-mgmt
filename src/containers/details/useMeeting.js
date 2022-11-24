

const useMeeting = () => {

    const hrIsSame = ({ startTime }) => {
        const currentHr = new Date().getHours()
        if (startTime.getHours() == currentHr.getHours()) {
            return true
        }
    }

    const datesAreSame = ({ meetingDate, currentDate }) => {
        return meetingDate.toString() == currentDate.toString() &&
            meetingDate.valueOf() == currentDate.valueOf() // converts to timestamp
    }

    const isOnGoingMeeting = (meeting = []) => {
        const { date: meetingDate, endTime, startTime } = meeting[0]
        const currentDate = new Date().toLocaleDateString()
        return (!(datesAreSame({ meetingDate, currentDate }) && hrIsSame({ endTime, startTime })))
    }


    // const getOngoingMeetings = (buildings) => {
    //     const meetingList = buildings.map((building, index) => {
    //         return building.meetingRooms.filter((item) => isOnGoingMeeting(item.meetings))

    //     })

    //     const result = meetingList.filter((item) => item.length).flat()
    //     return result.length

    // }

    return {
        // getOngoingMeetings,
        isOnGoingMeeting
    }
}

export default useMeeting