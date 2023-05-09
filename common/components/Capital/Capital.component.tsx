import { FC } from 'react';

interface CapitalTypes {
  capital: string[]
}

const Capital: FC<CapitalTypes> = (props) => {
  const { capital } = props;
  return (
    <p data-testid="capital-text"><b>{capital.length > 1 ? 'Capitals' : 'Capital'}:</b> {capital.map((cap, index) => index < capital.length -1 ? `${cap}, ` : cap)}</p>
  )
}

export default Capital