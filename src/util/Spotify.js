let accessToken
let userID

const baseURL          = 'https://api.spotify.com/v1',
      authorizationURL = 'https://accounts.spotify.com/authorize',
      client_id        = '9e447d22469d4796892e271a0f94b2f3',
      response_type    = 'code',
      redirect_uri     = window.location.href.match(/localhost/) ?  'http://localhost:3000' : 'https://alon-jamming-app.surge.sh';

console.log(redirect_uri)




const Spotify = {

    getAccessToken() {

        if (accessToken) {
            return accessToken
        }
        // check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch   = window.location.href.match(/expires_in=([^&]*)/)
        console.log(accessTokenMatch)
        console.log(expiresInMatch)

        if (accessTokenMatch && expiresInMatch) {
            accessToken     = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            console.log('expires in ' + expiresIn)
            //This clears the parameters, allowing us to grab a new access token when it expires.
            window.setTimeout(() => accessToken = '', expiresIn * 1000)
            window.history.pushState('Access Token', null, '/');
            return accessToken
        } else {
            const params    = `?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
            window.location = authorizationURL + params;
        }
    },

    async getUserID() {
        if (userID) {
            console.log(userID)
            return userID
        }
        const accessToken = Spotify.getAccessToken()

        const response = await fetch(baseURL + '/me',
                  {
                      method : 'GET',
                      headers: {Authorization: `Bearer ${accessToken}`}
                  }),
              userData = await response.json()

        userID = userData.id
        console.log(userID)
        return userID
    },

    async savePlaylist(playlistName, trackURIs) {
        if ( !playlistName || !trackURIs) {
            return
        }

        const accessToken = Spotify.getAccessToken()
        const userID      = await Spotify.getUserID()
        const headers     = {Authorization: `Bearer ${accessToken}`}

        // Create a new Playlist and return PlaylistID:

        const responsePlaylist = await fetch(baseURL + `/users/${userID}/playlists`,
                  {
                      method : 'POST',
                      body   : JSON.stringify({name: playlistName}),
                      headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'}

                  }),
              playlistData     = await responsePlaylist.json(),
              playlistID       = playlistData.id


        //Add track URI's to the newly created playlist, using trackURIs, newPlaylistID and userID:
        const responseCreatePlaylist = await fetch(baseURL + `/users/${userID}/playlists/${playlistID}/tracks`,
                  {
                      method : 'POST',
                      headers: {Authorization: `Bearer ${accessToken}`},
                      body   : JSON.stringify({uris: trackURIs})
                  }),
              newPlaylistID          = await responseCreatePlaylist.json()
        if (newPlaylistID['snapshot_id']) {
            alert('Your Playlist Has Been Successfully Created!')
        }

    },

    async getUserPlaylists() {
        const userID      = await this.getUserID()
        const accessToken = Spotify.getAccessToken()

        const endpoint = `/users/${userID}/playlists/`;
        try {
            console.log(userID)
            const response              = await fetch(baseURL + endpoint, {
                headers: {Authorization: `Bearer ${accessToken}`}
            });
            const responseJson          = await response.json();
            const userPlaylists         = responseJson.items
            const userPlaylistsFiltered = userPlaylists.map((playlist) => {
                return {name: playlist.name, id: playlist.id}
            });
            console.log(userPlaylistsFiltered)
            return userPlaylistsFiltered
        } catch (e) {
            console.log(e)
        }
    },

    async getPlaylistTracks(playlistID) {
        const userID      = await this.getUserID()
        const accessToken = Spotify.getAccessToken()

        const response     = await fetch(baseURL + `/users/${userID}/playlists/${playlistID}/tracks`, {
            method : 'GET',
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        const responseJson = await response.json();
        console.log(responseJson)
        const playlistTracks = responseJson.items.map((item) => {
            return {
                id    : item.track.id,
                name  : item.track.name,
                artist: item.track['artists'][0].name,
                album : item.track.album.name,
                uri   : item.track.uri
            }
        })
        console.log(playlistTracks)
        return playlistTracks
    },

    async search(term) {
        const accessToken = Spotify.getAccessToken()

        const endpoint  = '/search',
              params    = `?type=track&q=${term}`,
              searchURL = baseURL + endpoint + params,
              headers   = {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
              init      = {method: 'GET', headers}

        try {

            const response     = await fetch(searchURL, init),
                  jsonResponse = await response.json()

            console.log(jsonResponse)

            if ( !jsonResponse.tracks) {
                return []
            }
            const tracks        = jsonResponse.tracks.items,

                  searchResults = tracks.map((item) => {
                      return {
                          id    : item.id,
                          name  : item.name,
                          artist: item['artists'][0].name,
                          album : item.album.name,
                          uri   : item.uri
                      }
                  });
            return searchResults
        } catch (e) {
            console.log(e.message)
        }
    }
}


export default Spotify