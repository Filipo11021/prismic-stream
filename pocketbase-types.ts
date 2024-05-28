/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Albums = "albums",
	Artists = "artists",
	Playlists = "playlists",
	Songs = "songs",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AlbumsRecord = {
	image?: string
	name?: string
	released?: IsoDateString
}

export type ArtistsRecord = {
	image: string
	name: string
}

export type PlaylistsRecord = {
	createdBy?: RecordIdString
	image?: string
	name?: string
	songs?: RecordIdString[]
}

export enum SongsTypeOptions {
	"orginal" = "orginal",
	"cover" = "cover",
	"remaster" = "remaster",
}
export type SongsRecord = {
	album?: RecordIdString[]
	artists: RecordIdString[]
	file?: string
	image?: string
	name: string
	orginal_song?: RecordIdString
	released?: IsoDateString
	type?: SongsTypeOptions
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AlbumsResponse<Texpand = unknown> = Required<AlbumsRecord> & BaseSystemFields<Texpand>
export type ArtistsResponse<Texpand = unknown> = Required<ArtistsRecord> & BaseSystemFields<Texpand>
export type PlaylistsResponse<Texpand = unknown> = Required<PlaylistsRecord> & BaseSystemFields<Texpand>
export type SongsResponse<Texpand = unknown> = Required<SongsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	albums: AlbumsRecord
	artists: ArtistsRecord
	playlists: PlaylistsRecord
	songs: SongsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	albums: AlbumsResponse
	artists: ArtistsResponse
	playlists: PlaylistsResponse
	songs: SongsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'albums'): RecordService<AlbumsResponse>
	collection(idOrName: 'artists'): RecordService<ArtistsResponse>
	collection(idOrName: 'playlists'): RecordService<PlaylistsResponse>
	collection(idOrName: 'songs'): RecordService<SongsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
