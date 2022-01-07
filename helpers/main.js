// Formats a card number
// Source: https://stackoverflow.com/a/59339120/7974948
export function formatCardNumber(value) {
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
  const onlyNumbers = value.replace(/[^\d]/g, '');

  return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
    [$1, $2, $3, $4].filter((group) => !!group).join(' ')
  );
}

// Formats a card expiration date
// Source: https://stackoverflow.com/a/61703838/7974948
export function formatCardExpirationDate(value) {
  return value
    .replace(
      /[^0-9]/g,
      '' // To allow only numbers
    )
    .replace(
      /^([2-9])$/g,
      '0$1' // To handle 3 > 03
    )
    .replace( 
      /^(1{1})([3-9]{1})$/g,
      '0$1/$2' // 13 > 01/3
    )
    .replace(
      /^0{1,}/g,
      '0' // To handle 00 > 0
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
      '$1/$2' // To handle 113 > 11/3
    );
}