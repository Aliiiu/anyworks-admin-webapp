import { entity } from 'simpler-state'

// initial state

const initialState = {
  sidebarIsOpen: true,
}

// entity

export const dashboard = entity(initialState)

// entity updaters

export const setSidebarIsOpen = (payload = true) => {
  return dashboard.set((currentState) => ({
    ...currentState,
    sidebarIsOpen: payload,
  }))
}

export const toggleSidebar = () => {
  return dashboard.set((currentState) => ({
    ...currentState,
    sidebarIsOpen: !currentState.sidebarIsOpen,
  }))
}

export const openSidebar = () => setSidebarIsOpen()

export const closeSidebar = () => setSidebarIsOpen(false)
