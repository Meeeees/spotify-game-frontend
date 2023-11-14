import React from 'react'


type Props = {}


const Home = (props: Props) => {
    const [profileData, setProfileData] = React.useState<any>({})
    const [Songs, setSongs] = React.useState<any>([])

    React.useEffect(() => {
        // search url params
        let access_token = new URLSearchParams(window.location.search).get('access_token')
        let refresh_token = new URLSearchParams(window.location.search).get('refresh_token')
        const profilePromise = fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(res => res.json()).then(data => setProfileData(data))

        const topTracksPromise = fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(res => res.json()).then(data => setSongs(data.items))

        localStorage.setItem('access_token', access_token || '')
        localStorage.setItem('refresh_token', refresh_token || '')

        Promise.all([profilePromise, topTracksPromise])
    }, [])

    return (
        <>
            {profileData ? (
                <div>
                    <hgroup>
                        <h2>Spotify quiz</h2>
                        <h3>Welcome, {profileData.display_name}</h3>
                        {localStorage.getItem('access_token') && (
                            <h4><a href='/game'>Go to Game</a></h4>
                        )}
                    </hgroup>

                    <ul className="songs">
                        {Songs.map((song: any) => (
                            <li key={song.id} className='song'>
                                <img src={song.album.images[0].url} />
                                <div>
                                    {song.name}
                                    <audio src={song.preview_url} controls>
                                        <source src={song.preview_url} />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    )
}

export default Home