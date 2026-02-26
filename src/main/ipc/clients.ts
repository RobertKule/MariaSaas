import { ipcMain } from 'electron'
import { clientService } from '../services/clientService'
import { procedure } from '../lib/procedure'
import { createClientSchema, updateClientSchema } from '../../shared/schemas/clientSchema'

export function setupClientHandlers() {
  ipcMain.removeHandler('clients:list')
  ipcMain.removeHandler('clients:create')
  ipcMain.removeHandler('clients:update')
  ipcMain.removeHandler('clients:delete')

  ipcMain.handle('clients:list', async (_, query?: string) => {
    const data = await clientService.getClients(query)
    return { success: true, data }
  })

  ipcMain.handle(
    'clients:create',
    procedure.input(createClientSchema).mutation(async (input) => {
      return await clientService.createClient(input)
    })
  )

  ipcMain.handle(
    'clients:update',
    procedure.input(updateClientSchema).mutation(async (input) => {
      return await clientService.updateClient(input)
    })
  )

  ipcMain.handle('clients:delete', async (_, id: string) => {
    try {
      await clientService.deleteClient(id)
      return { success: true }
    } catch (err: unknown) {
      const error = err as Error
      return { success: false, error: { message: error.message } }
    }
  })
}
