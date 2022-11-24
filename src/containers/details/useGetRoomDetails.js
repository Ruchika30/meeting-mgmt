
import { useQuery, gql } from "@apollo/client";

export const DETAIL_QUERY = gql`
{
    Buildings { name meetingRooms{
    name meetings{
    title
    date startTime endTime
    } }
    }
}

`;


const useGetRoomDetials = () => {
    const { data = {}, loading, error } = useQuery(DETAIL_QUERY, {
        context: {
            headers: {
                "token": "a123gjhgjsdf6576"
            }
        }
    });

    return {
        data, loading, error
    }
}


export default useGetRoomDetials