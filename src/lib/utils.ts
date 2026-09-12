// ============================================================
// Z Craft — Utility Functions
// ============================================================

/**
 * Generates a WhatsApp deep link with pre-filled message
 */
export function generateWhatsAppLink(message: string): string {
  const phone = '94764248989'; // Z Craft WhatsApp number
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Formats a cart/order summary for WhatsApp message
 */
export function formatOrderForWhatsApp(
  items: Array<{
    productName: string;
    quantity: number;
    customizations: Record<string, string>;
    price: number;
  }>,
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address?: string;
    notes?: string;
  }
): string {
  let message = `🛍️ *New Order from Z Craft Website*\n\n`;
  message += `👤 *Customer:* ${customerInfo.name}\n`;
  message += `📞 *Phone:* ${customerInfo.phone}\n`;
  message += `📧 *Email:* ${customerInfo.email}\n`;
  if (customerInfo.address) {
    message += `📍 *Address:* ${customerInfo.address}\n`;
  }
  message += `\n━━━━━━━━━━━━━━━━━━\n\n`;

  items.forEach((item, index) => {
    message += `*${index + 1}. ${item.productName}* × ${item.quantity}\n`;
    message += `   💰 LKR ${item.price.toLocaleString()}\n`;
    
    const entries = Object.entries(item.customizations);
    if (entries.length > 0) {
      message += `   📝 Customizations:\n`;
      entries.forEach(([key, value]) => {
        if (value) {
          message += `      • ${key}: ${value}\n`;
        }
      });
    }
    message += `\n`;
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *Estimated Total:* LKR ${total.toLocaleString()}\n`;
  
  if (customerInfo.notes) {
    message += `\n📌 *Notes:* ${customerInfo.notes}\n`;
  }

  message += `\n_Sent via zcraft.lk_`;
  return message;
}

/**
 * Generates a unique ID for cart items
 */
export function generateCartItemId(): string {
  return `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Truncates text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

/**
 * Formats a number as LKR currency
 */
export function formatLKR(amount: number): string {
  return `LKR ${amount.toLocaleString('en-LK')}`;
}

/**
 * Smoothly scrolls to an element by ID
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Checks if we're on a mobile device
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Debounce utility
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
