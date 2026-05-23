import { FaWhatsapp } from 'react-icons/fa'
import '../styles/FloatingWhatsApp.css'

export default function FloatingWhatsApp() {
  const phoneNumber = '6281210720482'
  const message = encodeURIComponent('Halo! Saya tertarik dengan portfolio Anda.')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <div className="whatsapp-float">
      <span className="whatsapp-tooltip">Chat with me!</span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  )
}
