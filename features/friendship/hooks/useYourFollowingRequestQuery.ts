import useAuthClient from '@/hooks/useAuthClient'
import { useQuery } from '@tanstack/react-query'
import { getFollowingRequestFromUser } from '../requests'

const YOUR_FOLLOWING_REQUESTS_QUERY_KEY = "your_following_requests"

export default function useYourFollowingRequestQuery() {
    const client = useAuthClient()
    return useQuery({
        queryKey: [YOUR_FOLLOWING_REQUESTS_QUERY_KEY],
        queryFn: async () => await getFollowingRequestFromUser(client)
    })
}