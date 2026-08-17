import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface SpotifySongDetails {
  isPlaying: boolean
  songName: string
  artistName: string
  songUrl: string
  albumArt: string
}

interface SpotifyArtist {
  name: string
}

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

export default function NowPlaying() {
  const { lang } = useLanguage()
  const [currentSpotifySong, setCurrentSpotifySong] = useState<SpotifySongDetails>({
    isPlaying: false,
    songName: '',
    artistName: '',
    songUrl: '',
    albumArt: ''
  })

  const interfaceTexts = {
    pt: {
      notPlaying: 'Não estou ouvindo nada agora'
    },
    en: {
      notPlaying: 'Not listening to anything right now'
    }
  }

  const activeText = interfaceTexts[lang]

  useEffect(() => {
    async function fetchCurrentlyPlayingSpotifySong() {
      try {
        const spotifyClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
        const spotifyClientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
        const spotifyRefreshToken = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN

        if (!spotifyClientId || !spotifyClientSecret || !spotifyRefreshToken) {
          return
        }

        const spotifyAuthorizationToken = btoa(`${spotifyClientId}:${spotifyClientSecret}`)

        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            Authorization: `Basic ${spotifyAuthorizationToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: spotifyRefreshToken
          })
        })

        const tokenData = await tokenResponse.json()
        const spotifyAccessToken = tokenData.access_token

        const songResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`
          }
        })

        if (songResponse.status === 204 || songResponse.status > 400) {
          setCurrentSpotifySong({ isPlaying: false, songName: '', artistName: '', songUrl: '', albumArt: '' })
          return
        }

        const songData = await songResponse.json()

        if (songData.is_playing) {
          setCurrentSpotifySong({
            isPlaying: true,
            songName: songData.item.name,
            artistName: songData.item.artists.map((artistDetails: SpotifyArtist) => artistDetails.name).join(', '),
            songUrl: songData.item.external_urls.spotify,
            albumArt: songData.item.album.images[0]?.url || ''
          })
        } else {
          setCurrentSpotifySong({ isPlaying: false, songName: '', artistName: '', songUrl: '', albumArt: '' })
        }
      } catch {
        setCurrentSpotifySong({ isPlaying: false, songName: '', artistName: '', songUrl: '', albumArt: '' })
      }
    }

    fetchCurrentlyPlayingSpotifySong()
    const songRefreshInterval = setInterval(fetchCurrentlyPlayingSpotifySong, 30000)

    return () => clearInterval(songRefreshInterval)
  }, [])

  return (
    <div className="w-full max-w-[310px] rounded-2xl border border-black dark:border-white bg-transparent font-mono text-[var(--portfolio-text)] mt-6 flex items-center justify-center overflow-hidden transition-colors">
      {currentSpotifySong.isPlaying ? (
        <a
          href={currentSpotifySong.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-full h-full p-2.5 gap-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
        >
          <img
            src={currentSpotifySong.albumArt}
            alt={currentSpotifySong.songName}
            className="w-11 h-11 rounded-md object-cover shrink-0 shadow-sm"
          />
          
          <div className="flex flex-col flex-1 truncate text-left justify-center">
            <span className="text-xs truncate">{currentSpotifySong.songName}</span>
            <span className="text-[0.65rem] opacity-60 truncate mt-0.5">{currentSpotifySong.artistName}</span>
          </div>

          <div className="flex items-center gap-3 mr-2 shrink-0">
            <SpotifyIcon className="w-4 h-4 text-[#1DB954]" />
            <div className="flex items-end gap-[3px] h-[16px] opacity-80">
              <span className="w-[3px] bg-black dark:bg-white animate-[pulse_1s_ease-in-out_infinite] h-full rounded-sm" />
              <span className="w-[3px] bg-black dark:bg-white animate-[pulse_1.5s_ease-in-out_infinite] h-2/3 rounded-sm" />
              <span className="w-[3px] bg-black dark:bg-white animate-[pulse_0.8s_ease-in-out_infinite] h-4/5 rounded-sm" />
            </div>
          </div>
        </a>
      ) : (
        <div className="flex items-center gap-3 px-4 py-3.5">
          <SpotifyIcon className="w-5 h-5 text-[var(--portfolio-text)] opacity-80" />
          <span className="text-xs opacity-70">{activeText.notPlaying}</span>
        </div>
      )}
    </div>
  )
}
