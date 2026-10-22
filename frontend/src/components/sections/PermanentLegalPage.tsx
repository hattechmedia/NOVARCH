import { DatenschutzPage } from './DatenschutzPage';
import { ImpressumPage } from './ImpressumPage';

export function PermanentLegalPage({ privacy = false }: { privacy?: boolean }) {
  return privacy ? <DatenschutzPage /> : <ImpressumPage />;
}
