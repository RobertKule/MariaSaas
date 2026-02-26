import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CreateClientInput } from '@shared/schemas/clientSchema'
import { ClientDTO } from '@shared/types'

export interface ClientState {
  list: ClientDTO[]
  isLoading: boolean
  error: string | null
}

const initialState: ClientState = {
  list: [],
  isLoading: false,
  error: null
}

export const fetchClients = createAsyncThunk('clients/fetchAll', async (query?: string) => {
  const res = await window.api.clients.list(query)
  return res.data as ClientDTO[]
})

export const createNewClient = createAsyncThunk(
  'clients/create',
  async (data: CreateClientInput) => {
    const res = await window.api.clients.create(data)
    return res.data as ClientDTO
  }
)

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload
      })
      .addCase(createNewClient.fulfilled, (state, action) => {
        state.list.unshift(action.payload)
      })
  }
})

export default clientSlice.reducer
