import { create } from 'zustand'
import { BASEURL } from '../components/settings'

export const useServiceStore = create((set) => ({
  services: [],
  getServices: () => {
    fetch(`${BASEURL}service/list/`)
    .then(r => r.json())
    .then(data => {
        console.log(data)
        set((state) => ({ services: data  }))
    })
    .catch(e => {
         console.log(e)
    })
  }
}))