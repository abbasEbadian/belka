import { create } from 'zustand'
import { BASEURL } from '../components/settings'

export const useServiceStore = create((set) => ({
  services: [],
  setServices: (services) => {set({services})},
  getServices: () => {
    fetch(`${BASEURL}service/list/`)
    .then(r => r.json())
    .then(data => {
        set((state) => ({ services: data  }))
    })
    .catch(e => {
         console.log(e)
    })
  }
}))