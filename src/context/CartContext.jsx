import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { getProduct } from '../data/products'

const CartContext = createContext(null)
const STORAGE_KEY = 'alalamia-cart-v1'

const SHIPPING_THRESHOLD = 150
const SHIPPING_FLAT = 12
const TAX_RATE = 0.08

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    // Drop any lines whose product no longer exists in the catalogue.
    return Array.isArray(parsed)
      ? parsed.filter((line) => getProduct(line.id))
      : []
  } catch {
    return []
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { id, color, qty = 1 } = action
      const existing = state.find((l) => l.id === id && l.color === color)
      if (existing) {
        return state.map((l) =>
          l.id === id && l.color === color
            ? { ...l, qty: Math.min(l.qty + qty, 10) }
            : l,
        )
      }
      return [...state, { id, color, qty }]
    }
    case 'remove':
      return state.filter(
        (l) => !(l.id === action.id && l.color === action.color),
      )
    case 'setQty': {
      if (action.qty < 1) {
        return state.filter(
          (l) => !(l.id === action.id && l.color === action.color),
        )
      }
      return state.map((l) =>
        l.id === action.id && l.color === action.color
          ? { ...l, qty: Math.min(action.qty, 10) }
          : l,
      )
    }
    case 'clear':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(reducer, undefined, readStored)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // Storage unavailable (private mode / quota) — cart stays in memory only.
    }
  }, [lines])

  const value = useMemo(() => {
    // Join cart lines against the catalogue so prices always come from source.
    const detailed = lines.map((line) => {
      const product = getProduct(line.id)
      return { ...line, product, lineTotal: product.price * line.qty }
    })

    const count = detailed.reduce((sum, l) => sum + l.qty, 0)
    const subtotal = detailed.reduce((sum, l) => sum + l.lineTotal, 0)
    const shipping =
      count === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100
    const total = subtotal + shipping + tax

    return {
      lines: detailed,
      count,
      subtotal,
      shipping,
      tax,
      total,
      freeShippingThreshold: SHIPPING_THRESHOLD,
      add: (id, color, qty) => dispatch({ type: 'add', id, color, qty }),
      remove: (id, color) => dispatch({ type: 'remove', id, color }),
      setQty: (id, color, qty) => dispatch({ type: 'setQty', id, color, qty }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [lines])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
