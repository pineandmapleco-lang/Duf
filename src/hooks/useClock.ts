import { useEffect, useState } from 'react'

/** Ticks once a second so header clock/date stay live without re-rendering the whole tree. */
export function useClock(): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return now
}
