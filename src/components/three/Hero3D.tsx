import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const HeroScene = lazy(() => import('@/components/three/HeroScene'))

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Contêiner de altura fixa (sem salto de layout). A cena 3D só é baixada depois que o
 * navegador está ocioso e o elemento está visível, mantendo o pacote inicial leve.
 */
export function Hero3D() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const el = ref.current
    let cancel: (() => void) | undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = () => setEnabled(true)
      if (typeof window.requestIdleCallback === 'function') {
        const id = window.requestIdleCallback(start, { timeout: 2000 })
        cancel = () => window.cancelIdleCallback(id)
      } else {
        const id = window.setTimeout(start, 600)
        cancel = () => window.clearTimeout(id)
      }
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancel?.()
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="h-64 w-full rounded-2xl border border-border bg-surface sm:h-80"
    >
      {enabled && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}
    </div>
  )
}
