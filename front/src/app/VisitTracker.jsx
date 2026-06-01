import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { apiUrl } from './api'

const SESSION_STORAGE_KEY = 'smood-session-id'
const LAST_TRACKED_KEY = 'smood-last-tracked-path'

function getSessionId() {
  const existingSessionId = window.localStorage.getItem(SESSION_STORAGE_KEY)

  if (existingSessionId) {
    return existingSessionId
  }

  const sessionId = window.crypto?.randomUUID?.() || `session-${Date.now()}-${Math.random().toString(16).slice(2)}`
  window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId)
  return sessionId
}

export default function VisitTracker() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/admin-smood-stat') {
      return
    }

    const trackKey = `${location.pathname}${location.search}`
    const lastTracked = window.sessionStorage.getItem(LAST_TRACKED_KEY)

    if (lastTracked === trackKey) {
      return
    }

    window.sessionStorage.setItem(LAST_TRACKED_KEY, trackKey)

    const payload = {
      sessionId: getSessionId(),
      pagePath: `${location.pathname}${location.search}`,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    }

    fetch(apiUrl('/api/track-visit'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Do not block navigation or UI rendering when analytics tracking fails.
    })
  }, [location.pathname, location.search])

  return null
}