import * as hash from 'hash-code';

export function onlyDateChars(event: KeyboardEvent): boolean {
  const charCode = event.which || event.keyCode;
  // Accepts character '/' or numbers 0-9.
  if (charCode >= 47 && charCode <= 57) {
    return true;
  }
  return false;
}

export function onlyPhoneChars(event: KeyboardEvent): boolean {
  const pattern = /[0-9\+\-\s]/;
  const charCode = event.which || event.keyCode;
  const charStr = String.fromCharCode(charCode);
  if (!pattern.test(charStr)) {
    return true;
  }
  return false;
}

export function getColor(text: string): string {
  const colors = ['#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8', '#6c757d', '#343a40'];
  let hashCode = hash.hashCode(text);
  if (hashCode < 0) {
    hashCode = hashCode * -1;
  }
  const index = hashCode % colors.length;
  return colors[index];
}
