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
  const colors = ['#e53935', '#d81b60', '#8e24aa', '#5e35b1', '#3949ab', '#1e88e5', '#039be5', '#00acc1', '#00897b', '#43a047', '#7cb342', '#c0ca33', '#fdd835', '#ffb300', '#fb8c00', '#f4511e', '#6d4c41', '#757575', '#546e7a'];
  let hashCode = hash.hashCode(text);
  if (hashCode < 0) {
    hashCode = hashCode * -1;
  }
  const index = hashCode % colors.length;
  return colors[index];
}
