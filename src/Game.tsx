import React from 'react'

type Props = {}

const Game = (props: Props) => {
    const [UsePersonal, setUsePersonal] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const [SearchResult, setSearchResult] = React.useState<any>({})
    const Search = (query: string) => {
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=5`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(res => res.json()).then(data => setSearchResult(data.playlists.items))
    }


    return (
        <div>
            <button>Start</button>

            <div className="grid">
                <article className="setting">
                    <header>Type of game</header>

                    <div className="options">
                        <label htmlFor="playlist" data-tooltip="Songs out of the playlist will be used in the game">Playlist</label>
                        <input type="radio" name='type' id='playlist' checked={!UsePersonal} onChange={() => setUsePersonal(!UsePersonal)} />
                        <label htmlFor="personal"><em data-tooltip="Your top songs will be used in the game">Personal</em></label>
                        <input type="radio" name='type' id='personal' checked={UsePersonal} onChange={() => setUsePersonal(!UsePersonal)} />

                    </div>
                    {!UsePersonal && (
                        <div>
                            Search for a playlist:
                            <input type="text" name="playlist" onChange={(e) => setSearch(e.target.value)} value={search} />
                            <button onClick={() => Search(search)}>Search</button>

                            {SearchResult && SearchResult.length && (
                                <ul className="searchResult">
                                    Did you mean any of these?
                                    {SearchResult.map((playlist: any) => (
                                        <li key={playlist.id} className='song'>
                                            <img src={playlist.images[0].url} />
                                            <hgroup>
                                                <h4>{playlist.name}</h4>
                                                <h5>by {playlist.owner.display_name}</h5>
                                                <h6><a href={playlist.external_urls.spotify} target='_blank' rel="noreferrer">Go to playlist</a></h6>
                                            </hgroup>

                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </article>
                <article className="setting">
                    <header></header>
                </article>
            </div>

        </div>
    )
}

export default Game