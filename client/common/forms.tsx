export const grayText = (
  t: string,
  fontWeight: string = 'font-normal'
): JSX.Element => <span className={`${fontWeight} text-gray-600`}>{t}</span>
